import React, {useState, useEffect} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import axios from 'axios';
import { useParams } from "react-router-dom";


const fetchProductData = async(id) => {
  return await axios.get(`/api/products/${id}`);
} 


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
  const {id} = useParams();

  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchData = async() => {
      const {data} = await fetchProductData(id);
      setProduct(data);
      setLoading(false);
    }
    fetchData();

  }, [id]);

  if (loading) {
    return <div className="App">Loading...</div>;
  }

  console.log(product)

  return (
    <Paper className={classes.paper}>
      <h3>Product Information</h3>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <div>
            <span className={classes.item_title}>ID</span>
            <span>{product.itemKey}</span>
          </div>
          <div>
            <span className={classes.item_title}>Name</span>
            <span></span>
          </div>
        </Grid>
        <Grid item xs={6}>
          <div>
            <span className={classes.item_title}>Average PVP</span>
            <span></span>
          </div>
          <div>
            <span className={classes.item_title}>Supplier</span>
            <span></span>
          </div>
        </Grid>
        <Grid item xs={12}>
          <div>
            <span className={classes.item_title}>Description</span>
            <span>
              {product.description}
            </span>
          </div>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ProductInfo;
