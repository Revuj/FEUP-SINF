import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import PuffLoader from "react-spinners/PuffLoader";
import { css } from "@emotion/core";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
  },
  item_title: {
    color: theme.palette.text.secondary,
    marginRight: theme.spacing(2),
  },
}));

const fetchSupplierData = (id) => {
  return axios.get(`/api/suppliers/identifier/${id}`);
};

const styleTitle = {
  borderBottom: "1px solid black",
  backgroundColor: "#ffbf54",
  color: "white",
};

const spinnerStyle = css`
  margin: 0;
  top: 25%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
`;

const SupplierInformation = ({ id }) => {
  const classes = useStyles();

  const [loading, setLoading] = useState(true);
  const [supplier, setSupplier] = useState(null);

  useEffect(() => {
    const fetchSupplier = async () => {
      const { data } = await fetchSupplierData(id);
      setSupplier(data);
      setLoading(false);
    };
    fetchSupplier();
  }, [id]);

  return (
    <div className="card-information">
      <h3
        className="card-title"
        style={styleTitle !== undefined ? styleTitle : {}}
      >
        Supplier Information
      </h3>
      {supplier ? (
        <>
          <Grid container spacing={3} className="card-information-content">
            <Grid item xs={6}>
              <div>
                <span className={classes.item_title}>ID</span>
                <span>{id}</span>
              </div>
              <div>
                <span className={classes.item_title}>Name</span>
                <span>{supplier.name}</span>
              </div>
              <div>
                <span className={classes.item_title}>Address</span>
                <span>
                  {supplier.streetName} {supplier.buildingNumber}
                </span>
              </div>
            </Grid>
            <Grid item xs={6}>
              <div>
                <span className={classes.item_title}>City</span>
                <span>{supplier.cityName} </span>
              </div>
              <div>
                <span className={classes.item_title}>Country</span>
                <span>{supplier.countryDescription}</span>
              </div>
              <div>
                <span className={classes.item_title}>Postal Code</span>
                <span>{supplier.postalZone}</span>
              </div>
            </Grid>
          </Grid>
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
  );
};

export default SupplierInformation;
