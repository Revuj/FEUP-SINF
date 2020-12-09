import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { useParams } from "react-router-dom";
import { fetchUnitsSold } from "../../actions/product";

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

function ProductSales() {
  const [graphData, setGraphData] = useState(initial_data);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await fetchUnitsSold(id);
      setGraphData({
        labels: initial_data.labels,
        datasets: [
          {
            label: "Units Sold",
            data: data.unitsSold,
            fill: false,
            backgroundColor: "rgb(255, 99, 132)",
            borderColor: "rgba(255, 99, 132, 0.2)",
            yAxisID: "y-axis-1",
          },
        ],
      });
    };
    fetchData();
  }, [id]);

  return (
    <div className="chart">
      <h3 className="chart-title">Product Sales</h3>
      <Line data={graphData} options={options} />
    </div>
  );
}

export default ProductSales;
