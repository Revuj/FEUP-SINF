import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { formatMoney } from "../../helper/CurrencyFormater";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    marginTop: theme.spacing(3),
  },
  value: {
    textAlign: "center",
    fontSize: 26,
    color: theme.palette.text.secondary,
  },
}));

const UnitsSold = () => {
  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <h3>Units in Stock</h3>
      <p className={classes.value}>10000 ({formatMoney(105000)}€)</p>
    </Paper>
  );
};

export default UnitsSold;
