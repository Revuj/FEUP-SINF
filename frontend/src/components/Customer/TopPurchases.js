import React, {useState, useEffect} from "react";
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
import axios from 'axios';

const fetchTopPurchases = async(id) => {
  return axios.get(`/api/customer/${id}/topPurchases`);
}

const columns = [
  { id: "date", label: "date", minWidth: 70, align: "center" },
  { id: "currency", label: "currency", minWidth: 150, align: "center" },
  {
    id: "amount",
    label: "amount of money",
    minWidth: 150,
    align: "center",
    format: (value) => formatMoney(value),
  },
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

export default function TopPurchases() {

  const {id} = useParams();
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const [loading, setLoading] = useState(true);
  const [tableInfo, setTableInfo] = useState(null);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    const fetchTableData = async () => {
      const {data} = await fetchTopPurchases(id);
      setTableInfo(data);
      setLoading(false);
    };
    fetchTableData();
  }, [id]);

  if (loading === true) {
    return <div>Loading...</div>
  }

  console.log(tableInfo);
  const rows = tableInfo;


  return (
    <Paper className={classes.root}>
      <h3>Top Purchases</h3>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column, id) => (
                <TableCell
                  key={id}
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
              .map((row, id) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code + id}>
                    {columns.map((column, id2) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={id2} align={column.align}>
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
    </Paper>
  );
}
