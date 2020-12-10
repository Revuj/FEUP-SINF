import React, { useState, useEffect } from "react";
import { formatMoney } from "../../helper/CurrencyFormater";
import { fetchUnitsSold } from "../../actions/product";
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

const UnitsSold = ({ id }) => {
  const [loading, setLoading] = useState(true);
  const [unitsSold, setUnitsSold] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await fetchUnitsSold(id);
      console.log(data);
      setUnitsSold(data);
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
        Units Sold
      </h3>
      <div className="card-amount">
        {unitsSold ? (
          <>
            {unitsSold.unitsSold.reduce((a, b) => a + b, 0)} units (
            {formatMoney(unitsSold.value)}€)
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
        Number and amount of units sold for this product
      </div>
    </div>
  );
};

export default UnitsSold;
