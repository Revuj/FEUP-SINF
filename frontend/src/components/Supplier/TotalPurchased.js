import React, {useState, useEffect} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { formatMoney } from "../../helper/CurrencyFormater";
import axios from 'axios';
import useFullPageLoader from '../../hooks/FullPageLoader';


const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
  },
  value: {
    textAlign: "center",
    fontSize: 26,
    color: theme.palette.text.secondary,
  },
}));

const TotalPurchased = ({id}) => {
  const classes = useStyles();
  const [isLoading, setLoading] = useState(true);
  const [total, setTotal] = useState({});

  useEffect(() => {
    axios
      .get(`/api/suppliers/${id}/purchases`)
      .then((response) => {
        setTotal(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  if (isLoading) {
    return <div className="App">Loading...</div>;
  }

  return (
    <Paper className={classes.paper}>
      <h3>Total Purchased</h3>
      <p className={classes.value}> {total.totalOrders} orders</p>
      <p className={classes.value}> ({formatMoney(total.totalPrice)}€)</p>
    </Paper>
  );
};

export default TotalPurchased;
