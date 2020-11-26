import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';

function SalesByTime() {
  const [purchases, setPurchases] = useState(null);
  const [loading, setLoading] = useState(true);

  const year = 2020;
  // no futuro acrescentar await keyword
  useEffect(() => {
    axios
      .get(`/api/purchases/${year}`)
      .then((response) => {
        setPurchases(response.data);
        setPurchases({
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
              label: 'Purchases',
              data: response.data,
              fill: false,
              backgroundColor: 'rgb(255, 99, 132)',
              borderColor: 'rgba(255, 99, 132, 0.2)',
              yAxisID: 'y-axis-1',
            },
          ],
        });
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

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
      <h3 className="chart-title">Purchases</h3>
      {purchases && <Line height={60} data={purchases} options={options} />}
    </div>
  );
}

export default SalesByTime;
