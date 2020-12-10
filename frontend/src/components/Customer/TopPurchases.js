import React, {useState, useEffect, useMemo} from "react";
import { formatMoney } from "../../helper/CurrencyFormater";
import { useParams } from "react-router-dom";
import axios from 'axios';
import Search from "../Search";
import TableHeader from "../TableHeader";

const fetchTopPurchases = async(id) => {
  return axios.get(`/api/customer/${id}/topPurchases`);
}

export default function TopPurchases({
  numberItemsPerPage,
  containerStyle,
  themeColor
}) {
  const {id} = useParams();

  const [loading, setLoading] = useState(true);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');
  const [sorting, setSorting] = useState({ field: '', order: '' });

  const ITEMS_PER_PAGE = numberItemsPerPage;
  const headers = [
    { name: 'Date', field: 'date', sortable: false },
    { name: 'Currency', field: 'currency', sortable: false },
    { name: 'Amount money', field: 'amount', sortable: true },
  ];

  const [tableInfo, setTableInfo] = useState(null);

  useEffect(() => {
    const fetchTableData = async () => {
      const {data} = await fetchTopPurchases(id);
      setTableInfo(data);
      setLoading(false);
    };
    fetchTableData();
  }, [id]);

  const TableData = useMemo(() => {
    if (tableInfo === null) return;
    let computedInfo = tableInfo;

    if (search) {
      computedInfo = computedInfo.filter(
        (row) =>
          row.date.toLowerCase().includes(search.toLowerCase()) 
         // || suppier.email.toLowerCase().includes(search.toLowerCase())
      );
    }

    setTotalItems(computedInfo .length);

    //Sorting clients
    console.log(sorting.field);
    console.log(sorting.order);
    if (sorting.field && !sorting.field) {
      const reversed = sorting.order === 'asc' ? 1 : -1;

      if (sorting.field === 'amount')
       {
        computedInfo  = computedInfo.sort(
          (a, b) => reversed * a[sorting.field] - (b[sorting.field])
        );
      }
    }

    //Current Page slice
    return computedInfo.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
    );
  }, [tableInfo, currentPage, search, sorting]);

  
  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <>
      <section className="table" style={containerStyle}>
        <header className="header_info">
          <h3 className="table-title">Top Purchases</h3>
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
            {TableData.map((row, id) => (
              <tr key={id}>
                <th>
                  {row.date}
                </th>
                <td>{row.currency}</td>
                <td>{row.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </section>
    </>
  );


  /*
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
  );*/
}
