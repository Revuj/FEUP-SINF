import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import SupplierInformation from "./SupplierInformation";
import TotalPurchased from "./TotalPurchased";
import PendingPurchases from "./PendingPurchases";
import { useParams } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    flexGrow: 1,
  },
}));

export default function Customer() {
  const classes = useStyles();
  const { id } = useParams();

  return (
    <div className={classes.root}>
      <h1>Supplier</h1>
      <Grid container spacing={3}>
        <Grid item xs={8}>
          <SupplierInformation id={id} />
        </Grid>
        <Grid item xs={4}>
          <TotalPurchased id={id} />
        </Grid>
        <Grid item xs={12}>
          <PendingPurchases id={id} numberItemsPerPage={5} />
        </Grid>
      </Grid>
    </div>
  );
}
