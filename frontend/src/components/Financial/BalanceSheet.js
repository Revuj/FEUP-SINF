import React from 'react';
import '../../styles/GenericListing.css';
import { css } from '@emotion/core';
import PuffLoader from 'react-spinners/PuffLoader';
import { formatMoney } from '../../helper/CurrencyFormater';

const BalanceSheet = ({
  title,
  assets,
  liabilities,
  equity,
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
    <div className="listCard" id="balance-sheet" style={style}>
      <h3 className="listCard-title" style={titleStyle}>
        {title}
      </h3>
      {assets && liabilities && equity ? (
        <ul className="listCard-list" style={listStyle}>
          <li style={itemStyle} className="list-section-title">
            <div className="">Assets</div>
          </li>
          <li style={itemStyle} className="list-subsection-title">
            <div className="">Current</div>
          </li>
          {assets.currentAssets.map((item) => {
            return (
              <li
                style={itemStyle}
                className="listCard-listItem"
                key={item.name}
              >
                <div className="listCard-listItem-label">{item.name}</div>
                <div className="listCard-listItem-description">
                  {formatMoney(item.value)} €
                </div>
              </li>
            );
          })}

          <li style={itemStyle} className="list-subsection-title">
            <div className="">Non Current</div>
          </li>
          {assets.nonCurrentAssets.map((item) => {
            return (
              <li
                style={itemStyle}
                className="listCard-listItem"
                key={item.name}
              >
                <div className="listCard-listItem-label">{item.name}</div>
                <div className="listCard-listItem-description">
                  {formatMoney(item.value)} €
                </div>
              </li>
            );
          })}

          <li style={itemStyle} className="list-section-title">
            <div className="">Liabilities</div>
          </li>
          <li style={itemStyle} className="list-subsection-title">
            <div className="">Current</div>
          </li>
          {liabilities.currentLiabilities.map((item) => {
            return (
              <li
                style={itemStyle}
                className="listCard-listItem"
                key={item.name}
              >
                <div className="listCard-listItem-label">{item.name}</div>
                <div className="listCard-listItem-description">
                  {formatMoney(item.value)} €
                </div>
              </li>
            );
          })}

          <li style={itemStyle} className="list-subsection-title">
            <div className="">Non Current</div>
          </li>
          {liabilities.nonCurrentLiabilities.map((item) => {
            return (
              <li
                style={itemStyle}
                className="listCard-listItem"
                key={item.name}
              >
                <div className="listCard-listItem-label">{item.name}</div>
                <div className="listCard-listItem-description">
                  {formatMoney(item.value)} €
                </div>
              </li>
            );
          })}

          <li style={itemStyle} className="list-section-title">
            <div className="">Equity</div>
          </li>
          {equity.equity.map((item) => {
            return (
              <li
                style={itemStyle}
                className="listCard-listItem"
                key={item.name}
              >
                <div className="listCard-listItem-label">{item.name}</div>
                <div className="listCard-listItem-description">
                  {formatMoney(item.value)} €
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        <div
          className="graph-loading"
          style={!(assets && liabilities && equity) ? { height: '250px' } : {}}
        >
          <PuffLoader
            css={graphStyle}
            size={60}
            color={'#ffbf54'}
            loading={!(assets && liabilities && equity)}
            className="loader"
          />
        </div>
      )}
    </div>
  );
};

export default BalanceSheet;
