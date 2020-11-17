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

const ProductInfo = () => {
  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <h3>Product Information</h3>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <div>
            <span className={classes.item_title}>ID</span>
            <span>13</span>
          </div>
          <div>
            <span className={classes.item_title}>Name</span>
            <span>Favo de mel</span>
          </div>
        </Grid>
        <Grid item xs={6}>
          <div>
            <span className={classes.item_title}>Average PVP</span>
            <span>15 €</span>
          </div>
          <div>
            <span className={classes.item_title}>Supplier</span>
            <span>Abelhas LDA</span>
          </div>
        </Grid>
        <Grid item xs={12}>
          <div>
            <span className={classes.item_title}>Description</span>
            <span>
              O mel, é fabricado exclusivamente pelas abelhas para estas se
              alimentarem durante o Inverno. Contudo, a quantidade de mel que
              fabricam é cerca de três vezes superior àquela de que necessitam
              para sobreviver.
            </span>
          </div>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ProductInfo;
