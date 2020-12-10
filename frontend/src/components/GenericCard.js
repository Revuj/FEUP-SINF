import React from 'react';
import { css } from '@emotion/core';
import PuffLoader from 'react-spinners/PuffLoader';
import '../styles/GenericCard.css';

const GenericCard = ({
  title,
  description,
  amount,
  formatter,
  unit,
  styleCard,
  styleTitle,
  styleAmount,
  styleDescription,
}) => {
  const spinnerStyle = css`
    margin: 0;
    top: 50%;
    left: 50%;
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
  `;

  return (
    <div className="card" style={styleCard}>
      <h3
        className="card-title"
        style={styleTitle !== undefined ? styleTitle : {}}
      >
        {title}
      </h3>
      <div
        className="card-amount"
        style={styleAmount !== undefined ? styleAmount : {}}
      >
        {amount && formatter ? (
          <>
            {formatter(amount)} {unit}
          </>
        ) : (
          <PuffLoader
            css={spinnerStyle}
            size={60}
            color={'#37d5d6'}
            loading={amount == null}
            className="loader"
          />
        )}
      </div>
      <div
        className="card-description"
        style={styleDescription !== undefined ? styleAmount : {}}
      >
        {description}
      </div>
    </div>
  );
};

export default GenericCard;
