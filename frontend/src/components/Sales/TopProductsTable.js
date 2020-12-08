import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import useFullPageLoader from '../../hooks/FullPageLoader';
import PaginationComponent from '../Pagination';
import Search from '../Search';
import TableHeader from '../TableHeader';
import '../../styles/Table.css';
import Product from '../Product/Product';

const TopProductsTable = ({
  numberItemsPerPage,
  containerStyle,
  themeColor,
  year,
  setPage,
}) => {
  const [loader, showLoader, hideLoader] = useFullPageLoader();
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');
  const [sorting, setSorting] = useState({ field: '', order: '' });
  const [products, setProducts] = useState([]);

  const ITEMS_PER_PAGE = numberItemsPerPage;

  const headers = [
    { name: 'ID', field: 'id', sortable: false },
    { name: 'Name', field: 'name', sortable: true },
    { name: 'Sales', field: 'quantity', sortable: true },
    { name: 'Value', field: 'value', sortable: false },
  ];

  useEffect(() => {
    showLoader();

    axios
      .get(`/api/sales/products/${year}`)
      .then((response) => {
        console.log(response.data);
        setProducts(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
    hideLoader();
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
          <h3 className="table-title">Products sales</h3>
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
                <th
                  className="table-link"
                  scope="row"
                  onClick={() => {
                    setPage(<Product id={product.id} />);
                  }}
                >
                  {product.id}
                </th>
                <td>{product.name}</td>
                <td>{product.quantity}</td>
                <td>{product.value}</td>
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

export default TopProductsTable;
