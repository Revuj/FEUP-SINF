import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import Search from "../Search";
import PaginationComponent from "../Pagination";
import TableHeader from "../TableHeader";
import { formatMoney } from "../../helper/CurrencyFormater";
import { css } from "@emotion/core";
import PuffLoader from "react-spinners/PuffLoader";
import { useHistory } from "react-router-dom";

const fetchCustomers = async (id, year) => {
  return axios.get(`/api/products/${id}/customers/${year}`);
};

export default function ProductCustomers({
  id,
  numberItemsPerPage,
  containerStyle,
  themeColor,
  year,
}) {
  //const [loader, showLoader, hideLoader] = useFullPageLoader();
  const [loading, setLoading] = useState(true);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sorting, setSorting] = useState({ field: "", order: "" });

  const ITEMS_PER_PAGE = numberItemsPerPage;
  const headers = [
    { name: "ID", field: "id", sortable: false },
    { name: "Name", field: "name", sortable: false },
    { name: "Units Purchased", field: "units", sortable: true },
    { name: "Value Purchased", field: "value", sortable: true },
  ];

  const history = useHistory();
  const [customers, setCustomers] = useState(null);

  useEffect(() => {
    setCustomers(null);
    setLoading(true);
    const fetchData = async () => {
      const { data } = await fetchCustomers(id, year);
      setCustomers(data);
      setLoading(false);
    };
    fetchData();
  }, [id, year]);

  /*to able to sort the data we are going to retrieve */
  const customerData = useMemo(() => {
    if (customers === null) return;
    let computedCustomers = customers;

    if (search) {
      computedCustomers = computedCustomers.filter(
        (customer) => customer.name.toLowerCase().includes(search.toLowerCase())
        // || suppier.email.toLowerCase().includes(search.toLowerCase())
      );
    }

    setTotalItems(computedCustomers.length);

    if (sorting.field) {
      const reversed = sorting.order === "asc" ? 1 : -1;
      computedCustomers = computedCustomers.sort(
        (a, b) => reversed * (a[sorting.field] - b[sorting.field])
      );
    }

    //Current Page slice
    return computedCustomers.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
    );
  }, [customers, currentPage, search, sorting]);

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
            {customerData &&
              customerData.map((customer) => (
                <tr key={customer.id}>
                  <th
                    scope="row"
                    className="table-link"
                    onClick={() => {
                      history.push("/customer/" + customer.id);
                    }}
                  >
                    {customer.id}
                  </th>
                  <td>{customer.name}</td>
                  <td>{customer.units}</td>
                  <td>{formatMoney(customer.value)}</td>
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
            color={"#ffbf54"}
            loading={loading}
            className="loader"
          />
        </div>
      </section>
    </>
  );
}
