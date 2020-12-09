import React, {useState, useEffect} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
  },
  item_title: {
    color: theme.palette.text.secondary,
    marginRight: theme.spacing(2),
  },
}));

const fetchSupplierData = id => {
  return axios.get(`/api/suppliers/identifier/${id}`);
}

const SupplierInformation = ({id}) => {
  const classes = useStyles();
  
  const [isLoading, setLoading] = useState(true);
  const [supplier, setSupplier] = useState(null);

  useEffect(() => {
    const fetchSupplier = async() => {
      const {data} = await fetchSupplierData(id);
      setSupplier(data);
      setLoading(false);
    };
    fetchSupplier();
    
  }, [id]);

  if (isLoading) {
    return <div className="App">Loading...</div>;
  }


  return (
    <Paper className={classes.paper}>
      <h3>Supplier Information</h3>
      <Grid container spacing={3}>
        <Grid item xs={8}>
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
            <span>{supplier.streetName} {supplier.buildingNumber}</span>
          </div>
        </Grid>
        <Grid item xs={4}>
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
    </Paper>
  );
};

export default SupplierInformation;
