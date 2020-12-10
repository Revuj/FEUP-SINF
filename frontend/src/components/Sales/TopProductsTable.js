import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import PaginationComponent from "../Pagination";
import Search from "../Search";
import TableHeader from "../TableHeader";
import "../../styles/Table.css";
import { css } from "@emotion/core";
import PuffLoader from "react-spinners/PuffLoader";
import Product from "../Product/Product";
import { formatMoney } from "../../helper/CurrencyFormater";

const TopProductsTable = ({
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
  const [products, setProducts] = useState([]);

  const ITEMS_PER_PAGE = numberItemsPerPage;

  const headers = [
    { name: "ID", field: "id", sortable: false },
    { name: "Name", field: "name", sortable: false },
    { name: "Sales", field: "quantity", sortable: true },
    { name: "Value", field: "value", sortable: true },
  ];

  useEffect(() => {
    axios
      .get(`/api/sales/products/${year}`)
      .then((response) => {
        console.log(response.data);
        setProducts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  /*to able to sort the data we are going to retrieve */
  const clientsData = useMemo(() => {
    let computedProducts = products;

    if (search) {
      computedProducts = computedProducts.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    setTotalItems(computedProducts.length);

    //Sorting products
    if (sorting.field) {
      const reversed = sorting.order === "asc" ? 1 : -1;
      computedProducts = computedProducts.sort(
        (a, b) => reversed * (a[sorting.field] - b[sorting.field])
      );
    }

    //Current Page slice
    return computedProducts.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
    );
  }, [products, currentPage, search, sorting]);

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
          <h3 className="table-title">Products sales</h3>
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
            {clientsData.map((product) => (
              <tr key={product.id}>
                <th
                  className="table-link"
                  scope="row"
                  onClick={() => {
                    setPage(<Product id={product.id} />);
                  }}
                >
                  {product.id}
                </th>
                <td>{product.name}</td>
                <td>{product.quantity}</td>
                <td>{formatMoney(product.value)}</td>
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

export default TopProductsTable;
