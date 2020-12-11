import React, { useState, useEffect } from "react";
import { formatMoney } from "../../helper/CurrencyFormater";
import axios from "axios";
import "../../styles/GenericCard.css";
import PuffLoader from "react-spinners/PuffLoader";
import { css } from "@emotion/core";
import { fetchUnitsPurchased } from "../../actions/product";

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

const UnitsPurchased = ({ id, year }) => {
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await fetchUnitsPurchased(id, year);
      console.log(data);
      setTotal(data);
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
        Units Purchased
      </h3>
      <div className="card-amount">
        {total ? (
          <>
            {total.units.reduce((a, b) => a + b, 0)} ({formatMoney(total.value)}
            €)
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
        Number and amount of units purchased for this product
      </div>
    </div>
  );
};

export default UnitsPurchased;
