import React, { useEffect, useState, useMemo } from 'react';
import useFullPageLoader from '../../hooks/FullPageLoader';
import PaginationComponent from '../Pagination';
import Search from '../Search';
import TableHeader from '../TableHeader';
import { fetchOngoingSales } from '../../api/sales';
import '../../styles/Table.css';

const SalesBacklogTable = ({
  numberItemsPerPage,
  containerStyle,
  themeColor,
}) => {
  const [loader, showLoader, hideLoader] = useFullPageLoader();
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');
  const [sorting, setSorting] = useState({ field: '', order: '' });

  const ITEMS_PER_PAGE = numberItemsPerPage;

  const headers = [
    { name: 'Date of order', field: 'date_order', sortable: false },
    { name: 'Customer', field: 'customer_name', sortable: true },
    { name: 'Items', field: 'items', sortable: true },
    { name: 'Total order cost', field: 'total_cost', sortable: false },
  ];

  /* this is going to be used in the feature when doing the api call */
  const [sales, setSales] = useState([]);
  /* insert the information fetched in the api (now using a dummy api) */
  useEffect(() => {
    const getData = () => {
      showLoader();

      setSales(fetchOngoingSales());

      hideLoader();
    };

    getData();
  }, []);

  /*to able to sort the data we are going to retrieve */
  const clientsData = useMemo(() => {
    let computedSales = sales;

    if (search) {
      computedSales = computedSales.filter(
        (sale) =>
          sale.name.toLowerCase().includes(search.toLowerCase()) ||
          sale.email.toLowerCase().includes(search.toLowerCase())
      );
    }

    setTotalItems(computedSales.length);

    //Sorting sales
    if (sorting.field) {
      const reversed = sorting.order === 'asc' ? 1 : -1;
      computedSales = computedSales.sort(
        (a, b) => reversed * a[sorting.field].localeCompare(b[sorting.field])
      );
    }

    //Current Page slice
    return computedSales.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
    );
  }, [sales, currentPage, search, sorting]);

  const getListOfitemsInOrder = (items) => {
      var output = [];

      //Loop over your li's and grab the html content
      items.forEach(item => {
          output.push(item.number_units + "x " + item.name);
      });
      
      //Set the paragraph value by joining the outputs together 
      return output.join("\n");
  }

  return (
    <>
      <section className="table" style={containerStyle}>
        <header className="header_info">
          <h3 className="table-title">Sales Backlog</h3>
          <Search
            onSearch={(value) => {
              setSearch(value);
              setCurrentPage(1);
            }}
          />
        </header>

        <table className="content">
          <TableHeader
            color={themeColor}
            headers={headers}
            onSorting={(field, order) => setSorting({ field, order })}
          />
          <tbody>
            {clientsData.map((sale) => (
              <tr key={sale.id}>
                <th scope="row">{sale.date_order}</th>
                <td>{sale.customer_name}</td>
                <td>{getListOfitemsInOrder(sale.items)}</td>
                <td>{sale.total_cost}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <PaginationComponent
          color={themeColor}
          total={totalItems}
          itemsPerPage={ITEMS_PER_PAGE}
          currentPage={currentPage}
          onPageChange={(page) => setCurrentPage(page)}
        />

        {loader}
      </section>
    </>
  );
};

export default SalesBacklogTable;
