import React, { useState, useEffect } from "react";
import { formatMoney } from "../../helper/CurrencyFormater";
import { fetchUnitsSold } from "../../actions/product";
import "../../styles/GenericCard.css";
import PuffLoader from "react-spinners/PuffLoader";
import { css } from "@emotion/core";

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
  const [unitsSold, setUnitsSold] = useState(null);

  useEffect(() => {
    setUnitsSold(null);
    setLoading(true);
    const fetchData = async () => {
      const { data } = await fetchUnitsSold(id, year);
      setUnitsSold(data);
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
        {unitsSold ? (
          <>
            {unitsSold.units.reduce((a, b) => a + b, 0)} (
            {formatMoney(unitsSold.value)}€)
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
        Number and amount of units sold for this product
      </div>
    </div>
  );
};

export default UnitsSold;
