import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { formatMoney } from '../../helper/CurrencyFormater';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const fetchPurchaseTotalData = async (id) => {
  return axios.get(`/api/customer/${id}/TopPurchases`);
};

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
  },
  value: {
    textAlign: 'center',
    fontSize: 26,
    color: theme.palette.text.secondary,
  },
}));

const TotalPurchased = ({ id }) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [purchase, setPurchase] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await fetchPurchaseTotalData(id);
      setPurchase(data);
      setLoading(false);
    };
    fetchData();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Paper style={{ padding: '0' }} className={classes.paper}>
      <h3
        style={{
          backgroundColor: '#37d5d6',
          color: 'white',
          padding: '0.5rem',
        }}
      >
        Total Purchased
      </h3>
      <p style={{ padding: '0.5rem' }} className={classes.value}>
        (what number are suppose to be here?) ({formatMoney(purchase)}€)
      </p>
    </Paper>
  );
};

export default TotalPurchased;
