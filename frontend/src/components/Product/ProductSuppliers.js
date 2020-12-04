import React, {useEffect, useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import { formatMoney } from "../../helper/CurrencyFormater";
import { useParams } from "react-router-dom";
import axios from "axios";

const fetchSuppliers = async(id) => {
  return axios.get(`/api/products/${id}/suppliers`);
}

const columns = [
  { id: "id", label: "ID", minWidth: 70, align: "center" },
  { id: "name", label: "Name", minWidth: 150, align: "center" },
  {
    id: "value",
    label: "value",
    minWidth: 150,
    align: "center",
  },
  {
    id: "units",
    label: "Units",
    minWidth: 150,
    align: "center",
    format: (value) => formatMoney(value),
  },
];

const rows = [

];

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    padding: theme.spacing(2),
  },
  container: {
    maxHeight: 440,
  },
}));

export default function ProductSuppliers() {

  const {id} = useParams();
  const classes = useStyles();
  const [page, setPage] =useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [suppliers, setSuppliers] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchData = async() => {
      const {data} = await fetchSuppliers(id);
      setSuppliers(data);
      setLoading(false);
    }

    fetchData();

  },[id]);


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  if (loading) {
    return <div>Loading...</div>
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
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>}
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
}
