import React from 'react';
import { fetchYearSales } from '../../api/sales';
import { Line } from 'react-chartjs-2';

function SalesByTime() {
  // no futuro acrescentar await keyword
  const purchases = fetchYearSales();

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
        label: 'Purchases',
        data: purchases,
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
      <h3 className="chart-title">Supplier Purchases</h3>
      <Line height={65} data={data} options={options} />
    </div>
  );
}

export default SalesByTime;
