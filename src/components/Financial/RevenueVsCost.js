import React from 'react';
import { fetchYearSales } from '../../api/sales';
import { fetchYearPurchases } from '../../api/purchases';
import { Line } from 'react-chartjs-2';

function RevenueVsCost({ height }) {
  // no futuro acrescentar await keyword
  const sales = fetchYearSales();
  const purchases = fetchYearPurchases();

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
        label: 'Sales',
        data: sales,
        fill: false,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgba(255, 99, 132, 0.2)',
        yAxisID: 'y-axis-1',
      },
      {
        label: 'Costs',
        data: purchases,
        fill: false,
        backgroundColor: 'rgb(54, 162, 235)',
        borderColor: 'rgba(54, 162, 235, 0.2)',
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
      <h3 className="chart-title">Sales vs Costs</h3>
      <Line height={height || 75} data={data} options={options} />
    </div>
  );
}

export default RevenueVsCost;
