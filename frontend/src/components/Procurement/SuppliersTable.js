import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import useFullPageLoader from '../../hooks/FullPageLoader';
import PaginationComponent from '../Pagination';
import Search from '../Search';
import TableHeader from '../TableHeader';
import '../../styles/Table.css';

const SuppliersTable = ({
  numberItemsPerPage,
  containerStyle,
  themeColor,
  year,
}) => {
  const [loader, showLoader, hideLoader] = useFullPageLoader();
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');
  const [sorting, setSorting] = useState({ field: '', order: '' });
  const [suppliers, setSuppliers] = useState([]);

  const ITEMS_PER_PAGE = numberItemsPerPage;

  const headers = [
    { name: 'No#', field: 'rank', sortable: false },
    { name: 'Name', field: 'name', sortable: true },
    { name: 'Units Purchased', field: 'units', sortable: true },
    { name: 'Value Purchased', field: 'value', sortable: false },
  ];

  useEffect(() => {
    showLoader();

    axios
      .get(`/api/suppliers/${year}`)
      .then((response) => {
        setSuppliers(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
    hideLoader();
  }, [year]);

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
      <section className="table" style={containerStyle}>
        <header className="header_info">
          <h3 className="table-title">Suppliers</h3>
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
            {suppliersData.map((supplier) => (
              <tr key={supplier.id}>
                <th scope="row">{supplier.rank}</th>
                <td>{supplier.name}</td>
                <td>{supplier.units}</td>
                <td>{supplier.value}</td>
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

export default SuppliersTable;
