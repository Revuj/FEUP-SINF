import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { formatMoney } from "../../helper/CurrencyFormater";
import axios from "axios";
import { useParams } from "react-router-dom";

const fetchStockUnits = async (id) => {
  return axios.get(`/api/products/${id}/stock-units`);
};

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

const styleTitle = {
  borderBottom: "1px solid black",
  backgroundColor: "#37d5d6",
  color: "white",
};

const UnitsStock = ({ id }) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [info, setInfo] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const { data } = await fetchStockUnits(id);
      setInfo(data);
      setLoading(false);
    };
    getData();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="card">
      <h3
        className="card-title"
        style={styleTitle !== undefined ? styleTitle : {}}
      >
        Units in Stock
      </h3>
      <div className="card-amount">{info.totalStock} units</div>
      <div className="card-description">
        Number of units in stock for this product
      </div>
    </div>
  );
};

export default UnitsStock;
