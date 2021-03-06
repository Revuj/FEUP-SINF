import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { css } from "@emotion/core";
import PuffLoader from "react-spinners/PuffLoader";
import { fetchUnitsOrdered } from "../../actions/clients";
import { fetchUnitsSold } from "../../actions/clients";

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

function CustomerSales({ id, year }) {
  const [graphData, setGraphData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setGraphData(null);
    setLoading(true);
    const fetchData = async () => {
      const sold = await fetchUnitsSold(id, year, true);

      setGraphData({
        labels: initial_data.labels,
        datasets: [
          {
            label: "Units Sold",
            data: sold.data,
            fill: false,
            backgroundColor: "rgb(255, 99, 132)",
            borderColor: "rgba(255, 99, 132, 0.2)",
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
      <h3 className="chart-title">Customer Sales</h3>
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

export default CustomerSales;
