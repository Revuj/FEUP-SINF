import React from 'react';
import '../styles/GenericCard.css';

/**
 * 
 * example of use: 
 *     <GenericCard 
        title = "Price" 
        description = "This is all the money they need"
        amount = "30000"
        formatter = {formatMoney}
        unit = "€"
        styleCard = {{
          backgroundColor:'white',
          width:'25%',
        }}
        styleTitle = { {
          borderBottom:'1px solid black'
        }}
      />
 */

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
  console.log(styleAmount);
  return (
    <div className="card" style={styleCard}>
      <div
        className="card__title"
        style={styleTitle !== undefined ? styleTitle : {}}
      >
        {title}
      </div>
      <div
        className="card__amount"
        style={styleAmount !== undefined ? styleAmount : {}}
      >
        {formatter && formatter(amount)}
        {unit}
      </div>
      <div
        className="card__description"
        style={styleDescription !== undefined ? styleAmount : {}}
      >
        {description}
      </div>
    </div>
  );
};

export default GenericCard;
