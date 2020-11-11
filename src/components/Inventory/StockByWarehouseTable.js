import React, { useEffect, useState, useMemo } from 'react';
import useFullPageLoader from '../../hooks/FullPageLoader';
import PaginationComponent from '../Pagination';
import Search from '../Search';
import TableHeader from '../TableHeader';
import { fetchWarehousesInfo } from '../../api/stock';
import '../../styles/Table.css';

const StockByWarehouseTable = ({
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
    { name: 'Id', field: 'id', sortable: false },
    { name: 'Name', field: 'name', sortable: true },
    { name: 'Location', field: 'location', sortable: true },
    { name: 'Stock', field: 'stock', sortable: false },
  ];

  /* this is going to be used in the feature when doing the api call */
  const [warehouses, setWarehouses] = useState([]);
  /* insert the information fetched in the api (now using a dummy api) */
  useEffect(() => {
    const getData = () => {
      showLoader();

      setWarehouses(fetchWarehousesInfo());

      hideLoader();
    };

    getData();
  }, []);

  /*to able to sort the data we are going to retrieve */
  const clientsData = useMemo(() => {
    let computedWarehouses = warehouses;

    if (search) {
      computedWarehouses = computedWarehouses.filter(
        (warehouse) =>
          warehouse.name.toLowerCase().includes(search.toLowerCase()) ||
          warehouse.email.toLowerCase().includes(search.toLowerCase())
      );
    }

    setTotalItems(computedWarehouses.length);

    //Sorting warehouses
    if (sorting.field) {
      const reversed = sorting.order === 'asc' ? 1 : -1;
      computedWarehouses = computedWarehouses.sort(
        (a, b) => reversed * a[sorting.field].localeCompare(b[sorting.field])
      );
    }

    //Current Page slice
    return computedWarehouses.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
    );
  }, [warehouses, currentPage, search, sorting]);

  return (
    <>
      <section className="table" style={containerStyle}>
        <header className="header_info">
          <h3 className="table-title">warehouses</h3>
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
            {clientsData.map((warehouse) => (
              <tr key={warehouse.id}>
                <th scope="row">{warehouse.id}</th>
                <td>{warehouse.name}</td>
                <td>{warehouse.location}</td>
                <td>{warehouse.stock}</td>
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

export default StockByWarehouseTable;
