import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import useFullPageLoader from '../../hooks/FullPageLoader';
import PaginationComponent from '../Pagination';
import Search from '../Search';
import TableHeader from '../TableHeader';
import { fetchOngoingSales } from '../../actions/sales';
import { css } from '@emotion/core';
import PuffLoader from 'react-spinners/PuffLoader';
import '../../styles/Table.css';

const SalesBacklogTable = ({
  numberItemsPerPage,
  containerStyle,
  themeColor,
}) => {
  const [loading, setLoading] = useState(true);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');
  const [sorting, setSorting] = useState({ field: '', order: '' });

  const ITEMS_PER_PAGE = numberItemsPerPage;

  const headers = [
    { name: 'Date of order', field: 'date', sortable: false },
    { name: 'Customer', field: 'customer', sortable: true },
    { name: 'Items', field: 'items', sortable: true },
    { name: 'Total order cost', field: 'value', sortable: false },
  ];

  /* this is going to be used in the feature when doing the api call */
  const [sales, setSales] = useState([]);
  /* insert the information fetched in the api (now using a dummy api) */
  useEffect(() => {
    const getData = () => {
      axios
        .get(`/api/sales/backlogProducts`)
        .then((response) => {
          setSales(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
        });
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

    computedSales = computedSales.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
    );

    return computedSales;
    //Current Page slice
  }, [sales, currentPage, search, sorting]);

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
          <h3 className="table-title">Sales Backlog</h3>
          <Search
            onSearch={(value) => {
              setSearch(value);
              setCurrentPage(1);
            }}
          />
        </header>
        {sales && (
          <>
            <table className="content">
              <TableHeader
                color={themeColor}
                headers={headers}
                onSorting={(field, order) => setSorting({ field, order })}
              />
              <tbody>
                {clientsData.map((sale) => (
                  <tr key={sale.id}>
                    <th scope="row">{sale.date}</th>
                    <td>{sale.customer}</td>
                    <td>{sale.items}</td>
                    <td>{sale.value}</td>
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
          </>
        )}
        <div
          className="table-loading"
          style={loading ? { height: '250px' } : {}}
        >
          <PuffLoader
            css={tableStyle}
            size={60}
            color={'#37d5d6'}
            loading={loading}
            className="loader"
          />
        </div>
      </section>
    </>
  );
};

export default SalesBacklogTable;
