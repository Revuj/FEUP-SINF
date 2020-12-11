import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { formatMoney } from "../../helper/CurrencyFormater";
import axios from "axios";
import "../../styles/GenericCard.css";
import PuffLoader from "react-spinners/PuffLoader";
import { css } from "@emotion/core";

const fetchPurchaseTotalData = async (id) => {
  return axios.get(`/api/customer/${id}/TopPurchases`);
};

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
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

const spinnerStyle = css`
  margin: 0;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
`;

const TotalPurchased = ({ id }) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [purchase, setPurchase] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await fetchPurchaseTotalData(id);
      setPurchase(data);
      setLoading(false);
    };
    fetchData();
  }, [id]);

  return (
    <div className="card">
      <h3
        className="card-title"
        style={styleTitle !== undefined ? styleTitle : {}}
      >
        Total Purchased
      </h3>
      <div className="card-amount">
        {purchase ? (
          <>(what number are suppose to be here?) ({formatMoney(purchase)}€)</>
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
      <div className="card-description">
        Number and amount of sales orders for the customer
      </div>
    </div>

    /*<Paper style={{ padding: "0" }} className={classes.paper}>
      <h3
        style={{
          backgroundColor: "#37d5d6",
          color: "white",
          padding: "0.5rem",
        }}
      >
        Total Purchased
      </h3>
      <p style={{ padding: "0.5rem" }} className={classes.value}>
        (what number are suppose to be here?) ({formatMoney(purchase)}€)
      </p>
    </Paper>*/
  );
};

export default TotalPurchased;
