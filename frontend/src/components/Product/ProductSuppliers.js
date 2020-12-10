import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import useFullPageLoader from "../../hooks/FullPageLoader";
import Search from "../Search";
import PaginationComponent from "../Pagination";
import TableHeader from "../TableHeader";
import Supplier from "../Supplier/Supplier";
import { formatMoney } from "../../helper/CurrencyFormater";

const fetchSuppliers = async (id) => {
  return axios.get(`/api/products/${id}/suppliers`);
};

export default function ProductSuppliers({
  id,
  numberItemsPerPage,
  containerStyle,
  themeColor,
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

  const [suppliers, setSuppliers] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await fetchSuppliers(id);
      setSuppliers(data);
      console.log(data);
      setLoading(false);
    };
    fetchData();
  }, [id]);

  /*to able to sort the data we are going to retrieve */
  const supplierData = useMemo(() => {
    if (suppliers === null) return;
    let computedSuppliers = suppliers;

    if (search) {
      computedSuppliers = computedSuppliers.filter(
        (supplier) => supplier.name.toLowerCase().includes(search.toLowerCase())
        // || suppier.email.toLowerCase().includes(search.toLowerCase())
      );
    }

    setTotalItems(computedSuppliers.length);

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

  if (loading) {
    return <div>Loading...</div>;
  }

  console.log(supplierData);

  return (
    <>
      <section className="table" style={containerStyle}>
        <header className="header_info">
          <h3 className="table-title">Supplier</h3>
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
            {supplierData.map((supplier) => (
              <tr key={supplier.id}>
                <th>{supplier.id}</th>
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
      </section>
    </>
  );
}

/*
const columns = [
  { id: 'id', label: 'ID', minWidth: 70, align: 'center' },
  { id: 'name', label: 'Name', minWidth: 150, align: 'center' },
  {
    id: 'value',
    label: 'value',
    minWidth: 150,
    align: 'center',
  },
  {
    id: 'units',
    label: 'Units',
    minWidth: 150,
    align: 'center',
    format: (value) => formatMoney(value),
  },
];

const rows = [];

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    padding: theme.spacing(2),
  },
  container: {
    maxHeight: 440,
  },
}));

export default function ProductSuppliers({ id }) {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [suppliers, setSuppliers] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await fetchSuppliers(id);
      setSuppliers(data);
      setLoading(false);
    };

    fetchData();
  }, [id]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Paper className={classes.root}>
      <h3>Suppliers</h3>
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
          {
            <TableBody>
              {suppliers
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === 'number'
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          }
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
    </Paper>
  );
}*/
