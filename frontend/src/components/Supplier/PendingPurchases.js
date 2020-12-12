import React, { useState, useEffect, useMemo } from 'react';
import Search from '../Search';
import PaginationComponent from '../Pagination';
import TableHeader from '../TableHeader';
import { fetchPendingPurchases } from '../../actions/suppliers';
import { css } from '@emotion/core';
import PuffLoader from 'react-spinners/PuffLoader';
import { formatMoney } from '../../helper/CurrencyFormater';

export default function PendingPurchases({
  id,
  numberItemsPerPage,
  containerStyle,
  themeColor,
}) {
  const [loading, setLoading] = useState(true);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');
  const [sorting, setSorting] = useState({ field: '', order: '' });

  const ITEMS_PER_PAGE = numberItemsPerPage;
  const headers = [
    { name: 'Reference', field: 'reference', sortable: false },
    { name: 'Date', field: 'date', sortable: true },
    { name: 'Units Purchased', field: 'units', sortable: true },
    { name: 'Value Purchased', field: 'value', sortable: true },
  ];

  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await fetchPendingPurchases(id);
      setRows(data);
      setLoading(false);
    };
    fetchData();
  }, [id]);

  const purchasesData = useMemo(() => {
    if (rows === null) return;
    let computedRows = rows;

    if (search) {
      computedRows = computedRows.filter(
        (row) => row.reference.toLowerCase().includes(search.toLowerCase())
        // || suppier.email.toLowerCase().includes(search.toLowerCase())
      );
    }

    setTotalItems(computedRows.length);

    if (sorting.field) {
      const reversed = sorting.order === 'asc' ? 1 : -1;

      if (sorting.field === 'date') {
        console.log('oioi');
        computedRows = computedRows.sort(
          (a, b) => reversed * (Date.parse(a.date) - Date.parse(b.date))
        );
        console.log(computedRows);
      } else {
        computedRows = computedRows.sort(
          (a, b) => reversed * (a[sorting.field] - b[sorting.field])
        );
      }
    }

    //Current Page slice
    return computedRows.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
    );
  }, [rows, currentPage, search, sorting]);

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
          <h3 className="table-title">Pending Purchases</h3>
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
            {purchasesData.map((row) => (
              <tr key={row.reference}>
                <th>{row.reference}</th>
                <td>{row.date}</td>
                <td>{row.units}</td>
                <td>{formatMoney(row.value)}</td>
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
}
