import React, { useState, useEffect } from "react";
import { fetchSales } from "../../actions/financial";
import { Line } from "react-chartjs-2";

const data = {
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

function SalesByTime() {
  const [monthlySales, setMonthlySales] = useState(data);

  useEffect(() => {
    const fetchData = async () => {
      const sales = await fetchSales(true);
      setMonthlySales({
        labels: data.labels,
        datasets: [
          {
            label: "Sales",
            data: sales.data.totalCredit,
            fill: false,
            backgroundColor: "rgb(255, 99, 132)",
            borderColor: "rgba(255, 99, 132, 0.2)",
            yAxisID: "y-axis-1",
          },
        ],
      });
    };
    fetchData();
  }, []);

  return (
    <div className="chart">
      <h3 className="chart-title">monthly sales</h3>
      <Line height={115} data={monthlySales} options={options} />
    </div>
  );
}

export default SalesByTime;
