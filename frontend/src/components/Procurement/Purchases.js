import React, { useEffect, useState } from "react";
import axios from "axios";
import { css } from "@emotion/core";
import PuffLoader from "react-spinners/PuffLoader";
import { Line } from "react-chartjs-2";

function PurchasesByTime({ year }) {
  const [purchases, setPurchases] = useState(null);
  const [sales, setSales] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`/api/purchases/${year}`)
      .then((response) => {
        setPurchases({
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
              label: "Purchases",
              data: response.data,
              fill: false,
              backgroundColor: "rgb(255, 99, 132)",
              borderColor: "rgba(255, 99, 132, 0.2)",
              yAxisID: "y-axis-1",
            },
          ],
        });
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [year]);

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

  return (
    <div className="chart">
      <h3 className="chart-title">Purchases</h3>
      <div className="graph-loading" style={loading ? { height: "250px" } : {}}>
        <PuffLoader
          css={graphStyle}
          size={60}
          color={"#ffbf54"}
          loading={loading}
          className="loader"
        />
      </div>
      {!loading && purchases && (
        <Line height={148} data={purchases} options={options} />
      )}
    </div>
  );
}

export default PurchasesByTime;
