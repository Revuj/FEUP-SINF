import React from 'react';
import { fetchWarehousesStocks } from '../../api/stock';
import { Bar } from 'react-chartjs-2';

function StockByTime() {
  // no futuro acrescentar await keyword
  const stock = fetchWarehousesStocks();

  const data = {
    labels: ['Vila Real', 'Porto', 'Lisboa', 'Aveiro', 'Coimbra', 'Viseu'],
    datasets: [
      {
        label: 'Total Stock',
        data: stock,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  return (
    <div className="chart">
      <h3 className="chart-title">Stock By Warehouse</h3>
      <Bar
        options={{ responsive: true, maintainAspectRatio: false }}
        height={115}
        data={data}
        options={options}
      />
    </div>
  );
}

export default StockByTime;
