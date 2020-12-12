import React, { useState, useEffect } from 'react';
import { formatMoney } from '../../helper/CurrencyFormater';
import axios from 'axios';
import '../../styles/GenericCard.css';
import PuffLoader from 'react-spinners/PuffLoader';
import { css } from '@emotion/core';
import { fetchUnitsPurchased } from '../../actions/suppliers';

const styleTitle = {
  borderBottom: '1px solid black',
  backgroundColor: '#ffbf54',
  color: 'white',
};

const spinnerStyle = css`
  margin: 0;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
`;

const UnitsPurchased = ({ id, year }) => {
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await fetchUnitsPurchased(id, year, false);
      setTotal(data);
      setLoading(false);
    };

    fetchData();
  }, [id, year]);

  return (
    <div className="card">
      <h3
        className="card-title"
        style={styleTitle !== undefined ? styleTitle : {}}
      >
        Units Purchased
      </h3>
      <div className="card-amount">
        {total ? (
          <>
            {total.totalOrders} ({formatMoney(total.totalPrice)}€)
          </>
        ) : (
          <PuffLoader
            css={spinnerStyle}
            size={60}
            color={'#ffbf54'}
            loading={loading == true}
            className="loader"
          />
        )}
      </div>
      <div className="card-description">
        Number and amount of products purchased from the supplier
      </div>
    </div>
  );
};

export default UnitsPurchased;
