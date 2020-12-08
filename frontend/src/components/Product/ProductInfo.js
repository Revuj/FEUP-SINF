import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';

const fetchProductData = async (id) => {
  return await axios.get(`/api/products/${id}`);
};

const fetchAvg = async (id) => {
  return await axios.get(`/api/products/${id}/avg-price`);
};

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
  },
  item_title: {
    color: theme.palette.text.secondary,
    marginRight: theme.spacing(2),
  },
}));

const ProductInfo = ({ id }) => {
  const classes = useStyles();

  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const [avg, setAvg] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await fetchProductData(id);
      const prod = await fetchAvg(id);
      setProduct(data);
      setAvg(prod.data.avg);
      setLoading(false);
    };
    fetchData();
  }, [id]);

  if (loading) {
    return <div className="App">Loading...</div>;
  }

  return (
    <Paper className={classes.paper}>
      <h3>Product Information</h3>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <div>
            <span className={classes.item_title}>ID</span>
            <span>{product.itemKey}</span>
          </div>
          {/** 
          <div>
            <span className={classes.item_title}>Name</span>
            <span></span>
          </div>*/}
        </Grid>
        <Grid item xs={12}>
          <div>
            <span className={classes.item_title}>Average PVP</span>
            <span>{avg}</span>
          </div>

          {/**
          <div>
            <span className={classes.item_title}>Supplier</span>
            <span></span>
          </div> */}
        </Grid>
        <Grid item xs={12}>
          <div>
            <span className={classes.item_title}>Description</span>
            <span>{product.description}</span>
          </div>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ProductInfo;
