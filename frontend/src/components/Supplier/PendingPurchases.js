import React, { useState, useEffect, useMemo } from "react";
import Search from "../Search";
import PaginationComponent from "../Pagination";
import TableHeader from "../TableHeader";
import { fetchPendingPurchases } from "../../actions/suppliers";

export default function PendingPurchases({
  id,
  numberItemsPerPage,
  containerStyle,
  themeColor,
}) {
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sorting, setSorting] = useState({ field: "", order: "" });

  const ITEMS_PER_PAGE = numberItemsPerPage;
  const headers = [
    { name: "Reference", field: "reference", sortable: false },
    { name: "Date", field: "date", sortable: true },
    { name: "Units Purchased", field: "units", sortable: true },
    { name: "Value Purchased", field: "value", sortable: true },
  ];

  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await fetchPendingPurchases(id);
      setRows(data);
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
      const reversed = sorting.order === "asc" ? 1 : -1;

      if (sorting.field === "date") {
        console.log("oioi");
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
                <td>{row.value}</td>
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
      </section>
    </>
    /*<Paper className={classes.root}>
      <h3>Pending Purchases</h3>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>*/
  );
}
