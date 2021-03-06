import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import PaginationComponent from '../Pagination';
import Search from '../Search';
import TableHeader from '../TableHeader';
import Customer from '../Customer/Customer';
import { fetchBestClients } from '../../actions/clients';
import { css } from '@emotion/core';
import PuffLoader from 'react-spinners/PuffLoader';
import '../../styles/Table.css';
import { useHistory } from 'react-router-dom';
import { formatMoney } from '../../helper/CurrencyFormater';

const BestClientsTable = ({
  numberItemsPerPage,
  containerStyle,
  themeColor,
  year,
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
    { name: 'Units Purchased', field: 'units', sortable: true },
    { name: 'Value Purchased', field: 'value', sortable: true },
  ];

  /* this is going to be used in the feature when doing the api call */
  const [clients, setClients] = useState([]);

  const history = useHistory();
  /* insert the information fetched in the api */
  useEffect(() => {
    setLoading(true);
    axios
      .get(`/api/customers/${year}`)
      .then((response) => {
        setClients(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [year]);

  /*to able to sort the data we are going to retrieve */
  const clientsData = useMemo(() => {
    let computedClients = clients;

    if (search) {
      computedClients = computedClients.filter((client) =>
        client.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    setTotalItems(computedClients.length);

    //Sorting clients
    if (sorting.field) {
      const reversed = sorting.order === 'asc' ? 1 : -1;
      computedClients = computedClients.sort(
        (a, b) => reversed * (a[sorting.field] - b[sorting.field])
      );
    }

    //Current Page slice
    return computedClients.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
    );
  }, [clients, currentPage, search, sorting]);

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
          <h3 className="table-title">Customers</h3>
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
            {!loading &&
              clientsData.map((client) => (
                <tr key={client.id}>
                  <th
                    className="table-link"
                    scope="row"
                    onClick={() => {
                      history.push('/customer/' + client.id);
                    }}
                  >
                    {client.id}
                  </th>
                  <td>{client.name}</td>
                  <td>{client.units}</td>
                  <td>{formatMoney(client.value)}</td>
                </tr>
              ))}
          </tbody>
        </table>

        {!loading && (
          <PaginationComponent
            color={themeColor}
            total={totalItems}
            itemsPerPage={ITEMS_PER_PAGE}
            currentPage={currentPage}
            onPageChange={(page) => setCurrentPage(page)}
          />
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

export default BestClientsTable;
