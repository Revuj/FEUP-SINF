import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import PuffLoader from 'react-spinners/PuffLoader';
import { css } from '@emotion/core';

const fetchCustomerData = async (id) => {
  return await axios.get(`/api/customer/${id}`);
};

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
  },
  item_title: {
    color: theme.palette.text.secondary,
    marginRight: theme.spacing(2),
  },
}));

const styleTitle = {
  borderBottom: '1px solid black',
  backgroundColor: '#ffbf54',
  color: 'white',
};

const spinnerStyle = css`
  margin: 0;
  top: 25%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
`;

const CustomerInformation = ({ id }) => {
  const classes = useStyles();
  const [customer, setCustomer] = useState(null);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await fetchCustomerData(id);
      setCustomer(data);
      setloading(false);
    };

    fetchData();
  }, [id]);

  console.log(customer);
  // faltam algum atributos tao a null
  // temos outros atributos que se calhar deviamos colocar
  return (
    <div className="card-information">
      <h3
        className="card-title"
        style={styleTitle !== undefined ? styleTitle : {}}
      >
        Customer Information
      </h3>
      {customer ? (
        <>
          <Grid container spacing={3} className="card-information-content">
            <Grid item xs={6}>
              <div>
                <span className={classes.item_title}>ID</span>
                <span>{customer.partyKey}</span>
              </div>
              <div>
                <span className={classes.item_title}>Name</span>
                <span>{customer.contactName}</span>
              </div>
              <div>
                <span className={classes.item_title}>Address</span>
                <span>
                  {customer.streetName} {customer.buildingNumber}
                </span>
              </div>
            </Grid>
            <Grid item xs={6}>
              <div>
                <span className={classes.item_title}>City</span>
                <span>{customer.cityName} </span>
              </div>
              <div>
                <span className={classes.item_title}>Country</span>
                <span>{customer.countryDescription}</span>
              </div>
              <div>
                <span className={classes.item_title}>Postal Code</span>
                <span>{customer.postalZone}</span>
              </div>
            </Grid>
          </Grid>
        </>
      ) : (
        <PuffLoader
          css={spinnerStyle}
          size={60}
          color={'#ffbf54'}
          loading={loading == true}
          className="loader"
        />
      )}
    </div>
  );
};

export default CustomerInformation;
