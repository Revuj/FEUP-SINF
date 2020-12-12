import React from 'react';
import '../../styles/GenericListing.css';
import { css } from '@emotion/core';
import PuffLoader from 'react-spinners/PuffLoader';
import { formatMoney } from '../../helper/CurrencyFormater';

const ProfitLossStatement = ({
  title,
  data,
  style,
  titleStyle,
  listStyle,
  itemStyle,
}) => {
  const graphStyle = css`
    margin: 0;
    top: 50%;
    left: 50%;
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
  `;

  return (
    <div className="listCard" id="profit-loss-statement" style={style}>
      <h3 className="listCard-title" style={titleStyle}>
        {title}
      </h3>
      {data ? (
        <ul className="listCard-list" style={listStyle}>
          {data !== undefined &&
            data.map((section) => {
              return (
                <>
                  <li style={itemStyle} className="list-section-title">
                    <div className="">{section.name}</div>
                  </li>
                  {section.data.map(
                    (item) =>
                      Object.entries(item).length !== 0 && (
                        <li
                          style={itemStyle}
                          className="listCard-listItem"
                          key={item.name}
                        >
                          <div className="listCard-listItem-label">
                            {item.name}
                          </div>
                          <div className="listCard-listItem-description">
                            {formatMoney(item.value)} €
                          </div>
                        </li>
                      )
                  )}
                </>
              );
            })}
        </ul>
      ) : (
        <div className="graph-loading" style={!data ? { height: '250px' } : {}}>
          <PuffLoader
            css={graphStyle}
            size={60}
            color={'#ffbf54'}
            loading={!data}
            className="loader"
          />
        </div>
      )}
    </div>
  );
};

export default ProfitLossStatement;
