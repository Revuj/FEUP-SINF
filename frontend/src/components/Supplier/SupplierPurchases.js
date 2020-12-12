import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import { css } from '@emotion/core';
import PuffLoader from 'react-spinners/PuffLoader';
import { fetchUnitsOrdered } from '../../actions/suppliers';
import { fetchUnitsPurchased } from '../../actions/suppliers';

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
      label: 'Units Purchased',
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
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

const graphStyle = css`
  margin: 0;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
`;

function SupplierPurchases({ id, year }) {
  const [graphData, setGraphData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const ordered = await fetchUnitsOrdered(id, year, true);
      const purchased = await fetchUnitsPurchased(id, year, true);

      setGraphData({
        labels: initial_data.labels,
        datasets: [
          {
            label: 'Units Purchased',
            data: purchased.data,
            fill: false,
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgba(255, 99, 132, 0.2)',
            yAxisID: 'y-axis-1',
          },
          {
            label: 'Units Ordered',
            data: ordered.data,
            fill: false,
            backgroundColor: 'rgb(54, 162, 235)',
            borderColor: 'rgba(54, 162, 235, 0.2)',
            yAxisID: 'y-axis-1',
          },
        ],
      });
      setLoading(false);
    };

    fetchData();
  }, [id, year]);

  return (
    <div className="chart">
      <h3 className="chart-title">Supplier Purchases</h3>
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
        <>
          {' '}
          <Line data={graphData} options={options} />
        </>
      )}
    </div>
  );
}

export default SupplierPurchases;
