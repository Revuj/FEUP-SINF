import React, { useEffect, useState, useMemo } from 'react';
import useFullPageLoader from '../../hooks/FullPageLoader';
import PaginationComponent from '../Pagination';
import Search from '../Search';
import TableHeader from '../TableHeader';
import { fetchBestClients } from '../../api/clients';
import '../../styles/Table.css';

const BestClientsTable = ({
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
    { name: 'Email', field: 'email', sortable: true },
    { name: 'Total money spent', field: 'total_spent', sortable: false },
  ];

  /* this is going to be used in the feature when doing the api call */
  const [clients, setClients] = useState([]);
  /* insert the information fetched in the api (now using a dummy api) */
  useEffect(() => {
    const getData = () => {
      showLoader();

      setClients(fetchBestClients());

      hideLoader();
    };

    getData();
  }, []);

  /*to able to sort the data we are going to retrieve */
  const clientsData = useMemo(() => {
    let computedClients = clients;

    if (search) {
      computedClients = computedClients.filter(
        (client) =>
          client.name.toLowerCase().includes(search.toLowerCase()) ||
          client.email.toLowerCase().includes(search.toLowerCase())
      );
    }

    setTotalItems(computedClients.length);

    //Sorting clients
    if (sorting.field) {
      const reversed = sorting.order === 'asc' ? 1 : -1;
      computedClients = computedClients.sort(
        (a, b) => reversed * a[sorting.field].localeCompare(b[sorting.field])
      );
    }

    //Current Page slice
    return computedClients.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
    );
  }, [clients, currentPage, search, sorting]);

  return (
    <>
      <section className="table" style={containerStyle}>
        <header className="header_info">
          <h3 className="table-title">Costumers</h3>
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
            {clientsData.map((client) => (
              <tr key={client.id}>
                <th scope="row">{client.rank}</th>
                <td>{client.name}</td>
                <td>{client.email}</td>
                <td>{client.total_spent}</td>
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

export default BestClientsTable;
