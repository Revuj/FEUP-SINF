import React, {useState, useEffect} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { formatMoney } from "../../helper/CurrencyFormater";
import { useParams } from "react-router-dom";
import axios from "axios";

const fetchUnitsSold = async(id) => {
  return axios.get(`/api/products/${id}/units-sold`);
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

const UnitsSold = () => {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [info, setInfo] = useState(null);
  const {id} = useParams();

  useEffect(() => {
    const fetchData = async() => {
      const {data} = await fetchUnitsSold(id);
      setInfo(data);
      setLoading(false);
    };
    fetchData();
  }, [id]);


  if (loading) { 
    return <div>Loading...</div>
  }
  
  return (
    <Paper className={classes.paper}>
      <h3>Units Sold</h3>
      <p className={classes.value}> {info.unitsSold} ({formatMoney(info.valueTotal)}€)</p>
    </Paper>
  );
};

export default UnitsSold;
