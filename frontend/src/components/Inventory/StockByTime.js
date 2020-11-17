import React from 'react';
import { fetchYearStocks } from '../../api/stock';

import { Line } from 'react-chartjs-2';

function StockByTime() {
  // no futuro acrescentar await keyword
  const stock = fetchYearStocks();

  const data = {
    labels: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ],
    datasets: [
      {
        label: 'Stock',
        data: stock,
        fill: false,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgba(255, 99, 132, 0.2)',
        yAxisID: 'y-axis-1',
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          type: 'linear',
          display: true,
          position: 'left',
          id: 'y-axis-1',
        },
      ],
    },
  };

  return (
    <div className="chart">
      <h3 className="chart-title">Inventory value by Month</h3>
      <Line height={115} data={data} options={options} />
    </div>
  );
}

export default StockByTime;
