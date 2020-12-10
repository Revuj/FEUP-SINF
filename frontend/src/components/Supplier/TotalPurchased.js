import React, { useState, useEffect } from "react";
import { formatMoney } from "../../helper/CurrencyFormater";
import axios from "axios";
import "../../styles/GenericCard.css";
import PuffLoader from "react-spinners/PuffLoader";
import { css } from "@emotion/core";

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
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(null);

  useEffect(() => {
    axios
      .get(`/api/suppliers/${id}/purchases`)
      .then((response) => {
        setTotal(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
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
        {total ? (
          <>
            {total.totalOrders} orders ({formatMoney(total.totalPrice)}€)
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
      <div className="card-description">
        Number and amount of purchases orders for the supplier
      </div>
    </div>
  );
};

export default TotalPurchased;
