import React from 'react';
import '../../styles/GenericListing.css';
import { formatMoney } from '../../helper/CurrencyFormater';

const ProfitLossStatement = ({
  title,
  data,
  style,
  titleStyle,
  listStyle,
  itemStyle,
}) => {
  console.log(data);
  return (
    <div className="listCard" id="profit-loss-statement" style={style}>
      <h3 className="listCard-title" style={titleStyle}>
        {title}
      </h3>

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
    </div>
  );
};

export default ProfitLossStatement;
