import React, { useState, useEffect } from "react";
import axios from "axios";
import { css } from "@emotion/core";
import PuffLoader from "react-spinners/PuffLoader";
import { Line } from "react-chartjs-2";

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

function SalesAndPurchases({ year, height }) {
  const [loading, setLoading] = useState(true);
  const [salesAndPurchases, setSalesAndPurchases] = useState(null);
  const [graphData, setGraphData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setGraphData(null);
      const sales = await axios.get(`/api/sales/${year}`);
      const purchases = await axios.get(`/api/purchases/${year}`);
      setSalesAndPurchases({
        sales: sales.data,
        purchases: purchases.data,
      });
      setLoading(false);
    };
    fetchData();
  }, [year]);

  useEffect(() => {
    const updateGraph = () => {
      if (salesAndPurchases) {
        console.log(salesAndPurchases);
        setGraphData({
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
              label: "Sales",
              data: salesAndPurchases.sales,
              fill: false,
              backgroundColor: "rgb(255, 99, 132)",
              borderColor: "rgba(255, 99, 132, 0.2)",
              yAxisID: "y-axis-1",
            },
            {
              label: "Purchases",
              data: salesAndPurchases.purchases,
              fill: false,
              backgroundColor: "rgb(54, 162, 235)",
              borderColor: "rgba(54, 162, 235, 0.2)",
              yAxisID: "y-axis-1",
            },
          ],
        });
      }
    };

    updateGraph();
  }, [salesAndPurchases]);

  const graphStyle = css`
    margin: 0;
    top: 50%;
    left: 50%;
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
  `;

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
        <Line height={height || 75} data={graphData} options={options} />
      )}
    </div>
  );
}

export default SalesAndPurchases;
