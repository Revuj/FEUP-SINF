import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { formatMoney } from '../../helper/CurrencyFormater';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const fetchStockUnits = async (id) => {
  return axios.get(`/api/products/${id}/stock-units`);
};

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    marginTop: theme.spacing(3),
  },
  value: {
    textAlign: 'center',
    fontSize: 26,
    color: theme.palette.text.secondary,
  },
}));

const UnitsSold = ({ id }) => {
  const classes = useStyles();
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

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Paper  style = {{padding: 0}} className={classes.paper}>
      <h3 style = {{
        backgroundColor: "#37d5d6",
        color : "white",
        padding: '0.5rem'
        }}>Units in Stock (todo money part)</h3>
      <p style= {{padding: '0.5rem'}} className={classes.value}>
        {info.totalStock}({formatMoney()}€)
      </p>
    </Paper>
  );
};

export default UnitsSold;
