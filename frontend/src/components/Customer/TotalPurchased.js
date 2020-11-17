import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { formatMoney } from "../../helper/CurrencyFormater";

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

const TotalPurchased = () => {
  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <h3>Total Purchased</h3>
      <p className={classes.value}>2500 ({formatMoney(45000)}€)</p>
    </Paper>
  );
};

export default TotalPurchased;
