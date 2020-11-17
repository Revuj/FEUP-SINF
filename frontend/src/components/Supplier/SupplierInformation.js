import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
  },
  item_title: {
    color: theme.palette.text.secondary,
    marginRight: theme.spacing(2),
  },
}));

const SupplierInformation = () => {
  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <h3>Supplier Information</h3>
      <Grid container spacing={3}>
        <Grid item xs={8}>
          <div>
            <span className={classes.item_title}>ID</span>
            <span>0002</span>
          </div>
          <div>
            <span className={classes.item_title}>Name</span>
            <span>Serra Mel</span>
          </div>
          <div>
            <span className={classes.item_title}>Address</span>
            <span>Quinta Pocinhos, 6090</span>
          </div>
        </Grid>
        <Grid item xs={4}>
          <div>
            <span className={classes.item_title}>City</span>
            <span>Penamacor</span>
          </div>
          <div>
            <span className={classes.item_title}>Country</span>
            <span>PT</span>
          </div>
          <div>
            <span className={classes.item_title}>Postal Code</span>
            <span>6091-909</span>
          </div>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default SupplierInformation;
