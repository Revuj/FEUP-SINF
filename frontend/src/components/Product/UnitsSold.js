import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { formatMoney } from "../../helper/CurrencyFormater";
import { useParams } from "react-router-dom";
import { fetchUnitsSold } from "../../actions/product";

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

const UnitsSold = ({ id }) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [unitsSold, setUnitsSold] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await fetchUnitsSold(id);
      console.log(data);
      setUnitsSold(data);
      setLoading(false);
    };
    fetchData();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Paper style={{ padding: 0 }} className={classes.paper}>
      <h3
        style={{
          backgroundColor: "#37d5d6",
          color: "white",
          padding: "0.5rem",
        }}
      >
        Units Sold
      </h3>
      <p style={{ padding: "0.5rem" }} className={classes.value}>
        {" "}
        {info.unitsSold} ({formatMoney(info.valueTotal)}€)
      </p>
    </Paper>
  );
};

export default UnitsSold;
