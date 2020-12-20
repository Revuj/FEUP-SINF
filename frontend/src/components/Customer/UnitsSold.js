import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { formatMoney } from "../../helper/CurrencyFormater";
import axios from "axios";
import "../../styles/GenericCard.css";
import PuffLoader from "react-spinners/PuffLoader";
import { css } from "@emotion/core";
import { fetchUnitsSold } from "../../actions/clients";

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
  backgroundColor: "#ffbf54",
  color: "white",
};

const spinnerStyle = css`
  margin: 0;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
`;

const UnitsSold = ({ id, year }) => {
  const [loading, setLoading] = useState(true);
  const [purchase, setPurchase] = useState(null);

  useEffect(() => {
    setPurchase(null);
    setLoading(true);
    const fetchData = async () => {
      const { data } = await fetchUnitsSold(id, year, false);
      //console.log(data);
      setPurchase(data);
      setLoading(false);
    };
    fetchData();
  }, [id, year]);

  return (
    <div className="card">
      <h3
        className="card-title"
        style={styleTitle !== undefined ? styleTitle : {}}
      >
        Units Sold
      </h3>
      <div className="card-amount">
        {purchase ? (
          <>
            {purchase.totalOrders} ({formatMoney(purchase.totalPrice)}€)
          </>
        ) : (
          <PuffLoader
            css={spinnerStyle}
            size={60}
            color={"#ffbf54"}
            loading={loading == true}
            className="loader"
          />
        )}
      </div>
      <div className="card-description">
        Number and amount of units sold to the customer
      </div>
    </div>
  );
};

export default UnitsSold;
