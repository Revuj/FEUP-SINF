import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CustomerInformation from './CustomerInformation';
import TotalPurchased from './TotalPurchased';
import TopPurchases from './TopPurchases';

import Layout from '../Layout'
import { useParams } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    flexGrow: 1,
  },
}));

const Customer = () => {
  const classes = useStyles();
  const { id } = useParams();

  return (
    <Layout>
      <div className={classes.root}>
        <h1>Customer</h1>

        <Grid container spacing={3}>
          <Grid item xs={8}>
            <CustomerInformation id={id} />
          </Grid>

          <Grid item xs={4}>
            <TotalPurchased id={id} />
          </Grid>
          <Grid item xs={12}>
            <TopPurchases numberItemsPerPage={5} id={id} />
          </Grid>
        </Grid>
      </div>
    </Layout>
  );
}

export default Customer;
