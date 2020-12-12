import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import PaginationComponent from '../Pagination';
import Search from '../Search';
import TableHeader from '../TableHeader';
import { css } from '@emotion/core';
import PuffLoader from 'react-spinners/PuffLoader';
import '../../styles/Table.css';
import { formatMoney } from '../../helper/CurrencyFormater';

const PurchasesBacklogTable = ({
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
    { name: 'Supplier', field: 'supplier', sortable: false },
    { name: 'Items', field: 'items', sortable: true },
    { name: 'Total order cost', field: 'value', sortable: true },
  ];

  /* this is going to be used in the feature when doing the api call */
  const [purchases, setPurchases] = useState([]);
  /* insert the information fetched in the api (now using a dummy api) */
  useEffect(() => {
    const getData = () => {
      axios
        .get(`/api/purchases/backlogProducts`)
        .then((response) => {
          setPurchases(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
        });
    };

    getData();
  }, []);

  /*to able to sort the data we are going to retrieve */
  const suppliersData = useMemo(() => {
    let computedPurchases = purchases;

    if (search) {
      computedPurchases = computedPurchases.filter((purchase) =>
        purchase.supplier.toLowerCase().includes(search.toLowerCase())
      );
    }

    setTotalItems(computedPurchases.length);

    //Sorting purchases
    if (sorting.field) {
      const reversed = sorting.order === 'asc' ? 1 : -1;

      if (sorting.field == 'items') {
        computedPurchases = computedPurchases.sort(
          (a, b) =>
            reversed *
            (parseInt(a[sorting.field].split('x')[0], 10) -
              parseInt(b[sorting.field].split('x')[0], 10))
        );
      } else {
        computedPurchases = computedPurchases.sort(
          (a, b) => reversed * (a[sorting.field] - b[sorting.field])
        );
      }
    }

    computedPurchases = computedPurchases.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
    );

    return computedPurchases;
    //Current Page slice
  }, [purchases, currentPage, search, sorting]);

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
          <h3 className="table-title">Purchases Backlog</h3>
          <Search
            onSearch={(value) => {
              setSearch(value);
              setCurrentPage(1);
            }}
          />
        </header>
        {purchases && (
          <>
            <table className="content">
              <TableHeader
                color={themeColor}
                headers={headers}
                onSorting={(field, order) => setSorting({ field, order })}
              />
              <tbody>
                {suppliersData.map((purchase) => (
                  <tr key={purchase.id}>
                    <th scope="row">{purchase.date}</th>
                    <td>{purchase.supplier}</td>
                    <td>{purchase.items}</td>
                    <td>{formatMoney(purchase.value)}</td>
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
            color={'#ffbf54'}
            loading={loading}
            className="loader"
          />
        </div>
      </section>
    </>
  );
};

export default PurchasesBacklogTable;
