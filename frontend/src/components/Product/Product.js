import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import ProductInfo from "./ProductInfo";
import ProductSuppliers from "./ProductSuppliers";
import ProductTopClients from "./ProductTopClients";
import ProductSales from "./ProductSales";
import UnitsSold from "./UnitsSold";
import UnitsStock from "./UnitsStock";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    flexGrow: 1,
  },
}));

export default function Product({ id }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <h1>Product</h1>
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <ProductInfo id={id} />
          <UnitsSold id={id} />
          <UnitsStock id={id} />
        </Grid>
        <Grid item xs={8} sm={8}>
          <ProductSales />
        </Grid>

        <Grid item xs={12} sm={6}>
          <ProductSuppliers id={id}             
           numberItemsPerPage={5}
           />
        </Grid>

        {/**
        <Grid item xs={12} sm={6}>
          <ProductTopClients />
        </Grid>*/}
      </Grid>
    </div>
  );
}
