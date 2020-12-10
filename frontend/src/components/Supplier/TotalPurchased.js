import React, { useState, useEffect } from "react";
import { formatMoney } from "../../helper/CurrencyFormater";
import axios from "axios";
import "../../styles/GenericCard.css";

const styleTitle = {
  borderBottom: "1px solid black",
  backgroundColor: "#37d5d6",
  color: "white",
};

const TotalPurchased = ({ id }) => {
  const [isLoading, setLoading] = useState(true);
  const [total, setTotal] = useState({});

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

  if (isLoading) {
    return <div className="App">Loading...</div>;
  }

  return (
    <div className="card">
      <h3
        className="card-title"
        style={styleTitle !== undefined ? styleTitle : {}}
      >
        Total Purchased
      </h3>
      <div className="card-amount">
        {total.totalOrders} orders ({formatMoney(total.totalPrice)}€)
      </div>
      <div className="card-description">
        Number and amount of purchases orders for the supplier
      </div>
    </div>
  );
};

export default TotalPurchased;
