import React from 'react';
import '../styles/GenericListing.css';

/**
 *  example of usage: 
 *  <GenericListing t
        title = "Balance sheet"
        data = {[
          {label : "label", description : "description"},
          {label : "label2", description : "description2"}
        ]}
        style = {{width:'25%', backgroundColor: 'white'}}
        itemStyle = {{borderTop: '1px solid black'}}
    />
 */
const GenericListing = ({
  title,
  data,
  style,
  titleStyle,
  listStyle,
  itemStyle,
}) => {
  return (
    <div className="listCard" style={style}>
      <h3 className="listCard-title" style={titleStyle}>
        {title}
      </h3>

      <ul className="listCard-list" style={listStyle}>
        {data !== undefined &&
          data.map(
            (item) =>
              Object.entries(item).length !== 0 && (
                <li
                  style={itemStyle}
                  className="listCard-listItem"
                  key={item.label}
                >
                  <div className="listCard-listItem-label">{item.label}</div>
                  <div className="listCard-listItem-description">
                    {item.description}
                  </div>
                </li>
              )
          )}
      </ul>
    </div>
  );
};

export default GenericListing;
