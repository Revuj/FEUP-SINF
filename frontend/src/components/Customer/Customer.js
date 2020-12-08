import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import CustomerInformation from "./CustomerInformation";
import TotalPurchased from "./TotalPurchased";
import TopPurchases from "./TopPurchases";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    flexGrow: 1,
  },
}));

export default function Customer() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <h1>Customer</h1>

      <Grid container spacing={3}>
        <Grid item xs={8}>
          <CustomerInformation />
        </Grid>

        <Grid item xs={4}>
          <TotalPurchased />
        </Grid>
        <Grid item xs={12}>
          <TopPurchases />
        </Grid>
      </Grid>
    </div>
  );
}
