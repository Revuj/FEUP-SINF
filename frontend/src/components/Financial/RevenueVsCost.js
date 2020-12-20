import React, { useState, useEffect } from 'react';
import { fetchSales, fetchCosts } from '../../actions/financial';
import { css } from '@emotion/core';
import PuffLoader from 'react-spinners/PuffLoader';
import { Line } from 'react-chartjs-2';

const initial_data = {
  labels: [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
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
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      fill: false,
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgba(255, 99, 132, 0.2)',
      yAxisID: 'y-axis-1',
    },
    {
      label: 'Costs',
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
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

function RevenueVsCost({ height }) {
  const [loading, setLoading] = useState(true);
  const [salesAndCosts, setSalesAndCosts] = useState(null);
  const [graphData, setGraphData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const sales = await fetchSales(true);
      const costs = await fetchCosts();
      setSalesAndCosts({
        sales: sales.data,
        costs: costs.data,
      });
      setLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const updateGraph = () => {
      if (salesAndCosts) {
        setGraphData({
          labels: [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
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
              data: salesAndCosts.sales.totalCredit,
              fill: false,
              backgroundColor: 'rgb(255, 99, 132)',
              borderColor: 'rgba(255, 99, 132, 0.2)',
              yAxisID: 'y-axis-1',
            },
            {
              label: 'Costs',
              data: salesAndCosts.costs.totalDebit,
              fill: false,
              backgroundColor: 'rgb(54, 162, 235)',
              borderColor: 'rgba(54, 162, 235, 0.2)',
              yAxisID: 'y-axis-1',
            },
          ],
        });
      }
    };

    updateGraph();
  }, [salesAndCosts]);

  const graphStyle = css`
    margin: 0;
    top: 50%;
    left: 50%;
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
  `;

  return (
    <div className="chart">
      <h3 className="chart-title">Sales vs Costs</h3>
      <div className="graph-loading" style={loading ? { height: '250px' } : {}}>
        <PuffLoader
          css={graphStyle}
          size={60}
          color={'#ffbf54'}
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

export default RevenueVsCost;
