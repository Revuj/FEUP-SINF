import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Line } from "react-chartjs-2";


function SalesByTime({ year }) {
  const [sales, setSales] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`/api/sales/${year}`)
      .then((response) => {
        setSales(response.data);
        setSales({
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
  }, [year]);

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

  return (
    <div className="chart">
      <h3 className="chart-title">Sales</h3>
      {sales && <Line height={115} data={sales} options={options} />}
    </div>
  );
}

export default SalesByTime;
