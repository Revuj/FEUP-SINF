import React from 'react';
import '../../styles/GenericListing.css';
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
  return (
    <div className="listCard" id="balance-sheet" style={style}>
      <h3 className="listCard-title" style={titleStyle}>
        {title}
      </h3>

      <ul className="listCard-list" style={listStyle}>
        <li style={itemStyle} className="list-section-title">
          <div className="">Assets</div>
        </li>
        <li style={itemStyle} className="list-subsection-title">
          <div className="">Current</div>
        </li>
        {assets.currentAssets.map((item) => {
          return (
            <li style={itemStyle} className="listCard-listItem" key={item.name}>
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
            <li style={itemStyle} className="listCard-listItem" key={item.name}>
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
        {console.log(liabilities)}
        {liabilities.currentLiabilities.map((item) => {
          return (
            <li style={itemStyle} className="listCard-listItem" key={item.name}>
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
            <li style={itemStyle} className="listCard-listItem" key={item.name}>
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
            <li style={itemStyle} className="listCard-listItem" key={item.name}>
              <div className="listCard-listItem-label">{item.name}</div>
              <div className="listCard-listItem-description">
                {formatMoney(item.value)} €
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default BalanceSheet;
