import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import PuffLoader from "react-spinners/PuffLoader";
import { css } from "@emotion/core";

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

const spinnerStyle = css`
  margin: 0;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
`;

const UnitsStock = ({ id }) => {
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

  return (
    <div className="card">
      <h3
        className="card-title"
        style={styleTitle !== undefined ? styleTitle : {}}
      >
        Units in Stock
      </h3>
      <div className="card-amount">
        {info ? (
          <>{info.totalStock} units</>
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
        Number of units in stock for this product
      </div>
    </div>
  );
};

export default UnitsStock;
