import React, { useEffect, useState, useMemo } from 'react';
import useFullPageLoader from '../../hooks/FullPageLoader';
import PaginationComponent from '../Pagination';
import Search from '../Search';
import TableHeader from '../TableHeader';
import { fetchProducts } from '../../api/product';
import '../../styles/Table.css';

const StockByProductTable = ({
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
    { name: 'No#', field: 'rank', sortable: false },
    { name: 'Name', field: 'name', sortable: true },
    { name: 'Stock', field: 'stock', sortable: false },
    { name: 'Total value of stock', field: 'total_value', sortable: true },
  ];

  /* this is going to be used in the feature when doing the api call */
  const [products, setProducts] = useState([]);
  /* insert the information fetched in the api (now using a dummy api) */
  useEffect(() => {
    const getData = () => {
      showLoader();

      setProducts(fetchProducts());

      hideLoader();
    };

    getData();
  }, []);

  /*to able to sort the data we are going to retrieve */
  const clientsData = useMemo(() => {
    let computedProducts = products;

    if (search) {
      computedProducts = computedProducts.filter(
        (product) =>
          product.name.toLowerCase().includes(search.toLowerCase()) ||
          product.email.toLowerCase().includes(search.toLowerCase())
      );
    }

    setTotalItems(computedProducts.length);

    //Sorting products
    if (sorting.field) {
      const reversed = sorting.order === 'asc' ? 1 : -1;
      computedProducts = computedProducts.sort(
        (a, b) => reversed * a[sorting.field].localeCompare(b[sorting.field])
      );
    }

    //Current Page slice
    return computedProducts.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
    );
  }, [products, currentPage, search, sorting]);

  return (
    <>
      <section className="table" style={containerStyle}>
        <header className="header_info">
          <h3 className="table-title">Stock by Product</h3>
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
            {clientsData.map((product) => (
              <tr key={product.id}>
                <th scope="row">{product.rank}</th>
                <td>{product.name}</td>
                <td>{product.stock}</td>
                <td>{product.stock * product.value_unit}</td>
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

export default StockByProductTable;
