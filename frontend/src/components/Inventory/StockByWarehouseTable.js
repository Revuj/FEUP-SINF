import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import useFullPageLoader from '../../hooks/FullPageLoader';
import PaginationComponent from '../Pagination';
import Search from '../Search';
import TableHeader from '../TableHeader';
import Supplier from '../Supplier/Supplier';
import { fetchWarehousesInfo } from '../../actions/stock';
import { css } from '@emotion/core';
import PuffLoader from 'react-spinners/PuffLoader';
import '../../styles/Table.css';
import { formatMoney } from '../../helper/CurrencyFormater';

const StockByWarehouseTable = ({
  numberItemsPerPage,
  containerStyle,
  themeColor,
  setPage,
}) => {
  const [loading, setLoading] = useState(true);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');
  const [sorting, setSorting] = useState({ field: '', order: '' });

  const ITEMS_PER_PAGE = numberItemsPerPage;

  const headers = [
    { name: 'ID', field: 'id', sortable: false },
    { name: 'Name', field: 'name', sortable: false },
    { name: 'Stock', field: 'quantity', sortable: true },
    { name: 'Total value of stock', field: 'value', sortable: true },
  ];

  const [warehouses, setWarehouses] = useState([]);

  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get('/api/inventory/warehouses')
      .then((response) => {
        setWarehouses(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  /*to able to sort the data we are going to retrieve */
  const clientsData = useMemo(() => {
    let computedWarehouses = warehouses;

    if (search) {
      computedWarehouses = computedWarehouses.filter((warehouse) =>
        warehouse.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    setTotalItems(computedWarehouses.length);

    //Sorting warehouses
    if (sorting.field) {
      const reversed = sorting.order === 'asc' ? 1 : -1;
      computedWarehouses = computedWarehouses.sort(
        (a, b) => reversed * (a[sorting.field] - b[sorting.field])
      );
    }

    //Current Page slice
    return computedWarehouses.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
    );
  }, [warehouses, currentPage, search, sorting]);

  const tableStyle = css`
    margin: 0;
    top: 50%;
    left: 50%;
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
  `;

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
                <th className="table-link" scope="row">
                  {warehouse.id}
                </th>
                <td>{warehouse.name}</td>
                <td>{warehouse.quantity}</td>
                <td>{formatMoney(warehouse.value)}</td>
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
        <div
          className="table-loading"
          style={loading ? { height: '250px' } : {}}
        >
          <PuffLoader
            css={tableStyle}
            size={60}
            color={'#ffbf54'}
            loading={loading}
            className="loader"
          />
        </div>
      </section>
    </>
  );
};

export default StockByWarehouseTable;
