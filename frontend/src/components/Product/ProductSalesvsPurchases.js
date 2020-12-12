import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { fetchUnitsSold, fetchUnitsPurchased } from "../../actions/product";
import { css } from "@emotion/core";
import PuffLoader from "react-spinners/PuffLoader";

const initial_data = {
  labels: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
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
      label: "Units Sold",
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
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

const graphStyle = css`
  margin: 0;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
`;

function ProductSalesvsPurchases({ id, year }) {
  const [graphData, setGraphData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setGraphData(null);
      setLoading(true);
      const sold = await fetchUnitsSold(id, year);
      const purchased = await fetchUnitsPurchased(id, year);

      setGraphData({
        labels: initial_data.labels,
        datasets: [
          {
            label: "Units Sold",
            data: sold.data.units,
            fill: false,
            backgroundColor: "rgb(255, 99, 132)",
            borderColor: "rgba(255, 99, 132, 0.2)",
            yAxisID: "y-axis-1",
          },
          {
            label: "Units Purchased",
            data: purchased.data.units,
            fill: false,
            backgroundColor: "rgb(54, 162, 235)",
            borderColor: "rgba(54, 162, 235, 0.2)",
            yAxisID: "y-axis-1",
          },
        ],
      });
      setLoading(false);
    };
    fetchData();
  }, [id, year]);

  return (
    <div className="chart">
      <h3 className="chart-title">Sales vs Purchases</h3>
      <div className="graph-loading" style={loading ? { height: "250px" } : {}}>
        <PuffLoader
          css={graphStyle}
          size={60}
          color={"#ffbf54"}
          loading={loading}
          className="loader"
        />
      </div>
      {graphData && (
        <>
          {" "}
          <Line data={graphData} options={options} />
        </>
      )}
    </div>
  );
}

export default ProductSalesvsPurchases;
