import React, { useEffect, useState, useMemo } from 'react';
import useFullPageLoader from '../../hooks/FullPageLoader';
import PaginationComponent from '../Pagination';
import Search from '../Search';
import TableHeader from '../TableHeader';
import { fetchSuppliers } from '../../api/suppliers';
import '../../styles/Table.css';

const SuppliersTable = ({
  numberItemsPerPage,
  containerStyle,
  themeColor 
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
    { name: 'Purchases Value', field: 'value_purchases', sortable: false },
  ];

  /* this is going to be used in the feature when doing the api call */
  const [suppliers, setSuppliers] = useState([]);
  /* insert the information fetched in the api (now using a dummy api) */
  useEffect(() => {
    const getData = () => {
      showLoader();

      setSuppliers(fetchSuppliers())

      hideLoader();
    };

    getData();
  }, []);

  /*to able to sort the data we are going to retrieve */
  const suppliersData = useMemo(() => {
    let computedSuppliers = suppliers;

    if (search) {
      computedSuppliers = computedSuppliers.filter(
        (supplier) =>
          supplier.name.toLowerCase().includes(search.toLowerCase()) ||
          supplier.email.toLowerCase().includes(search.toLowerCase())
      );
    }

    setTotalItems(computedSuppliers.length);

    //Sorting suppliers
    if (sorting.field) {
      const reversed = sorting.order === 'asc' ? 1 : -1;
      computedSuppliers = computedSuppliers.sort(
        (a, b) => reversed * a[sorting.field].localeCompare(b[sorting.field])
      );
    }

    //Current Page slice
    return computedSuppliers.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
    );
  }, [suppliers, currentPage, search, sorting]);

  return (
    <>
      <section style={containerStyle}>
        <header className = "header_info">
            <h3>Best Suppliers</h3>
            <Search
            onSearch={(value) => {
                setSearch(value);
                setCurrentPage(1);
            }}
            />
        </header>
        
        <table className = "content">
          <TableHeader
            color = {themeColor}
            headers={headers}
            onSorting={(field, order) => setSorting({ field, order })}
          />
          <tbody>
            {suppliersData.map((supplier) => (
              <tr key={supplier.id}>
                <th scope="row">{supplier.rank}</th>
                <td>{supplier.name}</td>
                <td>{supplier.email}</td>
                <td>{supplier.value_purchases}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <PaginationComponent
          color = {themeColor}
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

export default SuppliersTable;
