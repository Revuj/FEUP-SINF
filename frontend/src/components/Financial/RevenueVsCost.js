import React, { useState, useEffect } from "react";
import { fetchSalesAndCosts } from "../../api/financial";
import { Line } from "react-chartjs-2";

const initial_data = {
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
      label: "Sales",
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      fill: false,
      backgroundColor: "rgb(255, 99, 132)",
      borderColor: "rgba(255, 99, 132, 0.2)",
      yAxisID: "y-axis-1",
    },
    {
      label: "Costs",
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      fill: false,
      backgroundColor: "rgb(54, 162, 235)",
      borderColor: "rgba(54, 162, 235, 0.2)",
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

function RevenueVsCost({ height }) {
  const [sales, setSales] = useState(null);
  const [costs, setCosts] = useState(null);
  const [graphData, setGraphData] = useState(initial_data);

  const updateGraph = () => {
    if (sales && costs) {
      setGraphData(
        initial_data.datasets.forEach((dataset) => {
          dataset.data =
            dataset.label == "Sales" ? sales.totalCredit : costs.totalDebit;
        })
      );
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const salesAndCosts = await fetchSalesAndCosts();
      setSales(salesAndCosts.sales);
      setCosts(salesAndCosts.costs);
    };
    fetchData();
  }, []);

  useEffect(() => {
    updateGraph();
  }, [sales, costs]);

  return (
    <div className="chart">
      <h3 className="chart-title">Sales vs Costs</h3>
      <Line height={height || 75} data={graphData} options={options} />
    </div>
  );
}

export default RevenueVsCost;
