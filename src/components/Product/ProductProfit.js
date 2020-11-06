import React from "react";
import { fetchYearStocks } from "../../api/stock";
import { Line } from "react-chartjs-2";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
  },
}));

function ProductProfit() {
  // no futuro acrescentar await keyword
  const profit = fetchYearStocks();
  const classes = useStyles();

  const data = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Product Profit",
        data: profit,
        fill: false,
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgba(255, 99, 132, 0.2)",
        yAxisID: "y-axis-1",
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          type: "linear",
          display: true,
          position: "left",
          id: "y-axis-1",
        },
      ],
    },
  };

  return (
    <Paper className={classes.paper}>
      <h3>Product Profit</h3>
      <Line data={data} options={options} />
    </Paper>
  );
}

export default ProductProfit;
