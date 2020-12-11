import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import useFullPageLoader from '../../hooks/FullPageLoader';
import PaginationComponent from '../Pagination';
import Search from '../Search';
import TableHeader from '../TableHeader';
import Supplier from '../Supplier/Supplier';
import { css } from '@emotion/core';
import PuffLoader from 'react-spinners/PuffLoader';
import '../../styles/Table.css';
import { useHistory } from 'react-router-dom';
import { formatMoney } from "../../helper/CurrencyFormater";

const SuppliersTable = ({
  numberItemsPerPage,
  containerStyle,
  themeColor,
  year,
  setPage,
}) => {
  const [loading, setLoading] = useState(true);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sorting, setSorting] = useState({ field: "", order: "" });
  const [suppliers, setSuppliers] = useState([]);

  const ITEMS_PER_PAGE = numberItemsPerPage;

  const headers = [
    { name: "ID", field: "id", sortable: false },
    { name: "Name", field: "name", sortable: false },
    { name: "Units Purchased", field: "units", sortable: true },
    { name: "Value Purchased", field: "value", sortable: true },
  ];

  const history = useHistory();

  useEffect(() => {
    axios
      .get(`/api/suppliers/${year}`)
      .then((response) => {
        setSuppliers(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [year]);

  /*to able to sort the data we are going to retrieve */
  const suppliersData = useMemo(() => {
    let computedSuppliers = suppliers;

    if (search) {
      computedSuppliers = computedSuppliers.filter((supplier) =>
        supplier.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    setTotalItems(computedSuppliers.length);

    //Sorting suppliers
    if (sorting.field) {
      const reversed = sorting.order === "asc" ? 1 : -1;

      computedSuppliers = computedSuppliers.sort(
        (a, b) => reversed * (a[sorting.field] - b[sorting.field])
      );
    }

    //Current Page slice
    return computedSuppliers.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
    );
  }, [suppliers, currentPage, search, sorting]);

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
                <th
                  scope="row"
                  className="table-link"
                  onClick={() => {
                    history.push('/supplier/'+supplier.id);
                  }}
                >
                  {supplier.id}
                </th>
                <td>{supplier.name}</td>
                <td>{supplier.units}</td>
                <td>{formatMoney(supplier.value)}</td>
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
          style={loading ? { height: "250px" } : {}}
        >
          <PuffLoader
            css={tableStyle}
            size={60}
            color={"#37d5d6"}
            loading={loading}
            className="loader"
          />
        </div>
      </section>
    </>
  );
};

export default SuppliersTable;
