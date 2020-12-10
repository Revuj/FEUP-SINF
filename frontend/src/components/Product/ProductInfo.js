import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import PuffLoader from "react-spinners/PuffLoader";
import { css } from "@emotion/core";

const fetchProductData = async (id) => {
  return await axios.get(`/api/products/${id}`);
};

const fetchAvg = async (id) => {
  return await axios.get(`/api/products/${id}/avg-price`);
};

const fetchAvgCost = async (id) => {
  return await axios.get(`/api/products/${id}/avg-cost`);
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

const styleTitle = {
  borderBottom: "1px solid black",
  backgroundColor: "#37d5d6",
  color: "white",
};

const spinnerStyle = css`
  margin: 0;
  top: 25%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
`;

const ProductInfo = ({ id }) => {
  const classes = useStyles();

  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const [avg, setAvg] = useState(null);
  const [avgCost, setAvgCost] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await fetchProductData(id);
      const prod = await fetchAvg(id);
      const avgC = await fetchAvgCost(id);
      setProduct(data);
      setAvg(prod.data.avg);
      setAvgCost(avgC.data.avg);
      setLoading(false);
    };
    fetchData();
  }, [id]);

  return (
    <div className="card-information">
      <h3
        className="card-title"
        style={styleTitle !== undefined ? styleTitle : {}}
      >
        Product Information
      </h3>
      {product && avg && avgCost ? (
        <>
          <Grid container spacing={3} className="card-information-content">
            <Grid item xs={8}>
              <div>
                <span className={classes.item_title}>ID</span>
                <span>{product.itemKey}</span>
              </div>
              <div>
                <span className={classes.item_title}>Description</span>
                <span>{product.description}</span>
              </div>
            </Grid>
            <Grid item xs={4}>
              <div>
                <span className={classes.item_title}>Average Cost</span>
                <span>{avgCost} €</span>
              </div>
              <div>
                <span className={classes.item_title}>Average PVP</span>
                <span>{avg} €/unit</span>
              </div>
            </Grid>
          </Grid>
        </>
      ) : (
        <PuffLoader
          css={spinnerStyle}
          size={60}
          color={"#37d5d6"}
          loading={loading == true}
          className="loader"
        />
      )}
    </div>
  );
};

export default ProductInfo;
