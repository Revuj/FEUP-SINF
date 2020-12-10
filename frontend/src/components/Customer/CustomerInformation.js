import React, {useEffect, useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import axios from 'axios';
import { useParams } from "react-router-dom";


const fetchCustomerData = async (id) => {
  return await axios.get(`/api/customer/${id}`);
}


const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
  },
  item_title: {
    color: theme.palette.text.secondary,
    marginRight: theme.spacing(2),
  },
}));

const CustomerInformation = () => {
  const classes = useStyles();
  const{id} = useParams();
  const [customer, setCustomer] = useState(null);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    const fetchData = async() => {
      console.log(id);
      const{data} = await fetchCustomerData(id);
      setCustomer(data);
      setloading(false);
    };

    fetchData();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>
  }
  
  console.log(customer);
 // faltam algum atributos tao a null
 // temos outros atributos que se calhar deviamos colocar
  return (
    <Paper style = {{padding: '0'}} className={classes.paper}>
      <h3 style = {{
        backgroundColor: "#37d5d6",
        color : "white",
        padding: '0.5rem'
      }}>Customer Information</h3>
      <Grid style= {{padding: '0.5rem'}}  container spacing={3}>
        <Grid item xs={8}>
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
            <span>{customer.streetName} {customer.buildingNumber}</span>
          </div>
        </Grid>
        <Grid item xs={4}>
          <div>
            <span className={classes.item_title}>City</span>
            <span>{customer.cityName}</span>
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
    </Paper>
  );
};

export default CustomerInformation;
