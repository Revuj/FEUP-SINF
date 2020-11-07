import React, { useState } from 'react';
import GenericCard from '../GenericCard';
import BestClients from './BestClients';
import SalesByTime from './SalesByTime';
import TopProducts from './TopProducts';
import { formatMoney } from '../../helper/CurrencyFormater';
import '../../styles/Sales.css';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

const Sales = () => {
  const [year, setYear] = useState('2020');

  return (
    <div>
      <div className="top-bar">
        <h1 className="title">Sales</h1>
        <DropdownButton id="dropdown-basic-button" title={year}>
          <Dropdown.Item href="#/action-1">2020</Dropdown.Item>
          <Dropdown.Item href="#/action-2">2019</Dropdown.Item>
          <Dropdown.Item href="#/action-3">2018</Dropdown.Item>
        </DropdownButton>
      </div>

      <div className="main-content">
        <section className="top-cards">
          <GenericCard
            title="GPM"
            description="Gross Profit Margin"
            amount="70000"
            formatter={formatMoney}
            unit="€"
            styleTitle={{
              borderBottom: '1px solid black',
              backgroundColor: '#37d5d6',
              color: 'white',
            }}
          />
        </section>

        <section className="row-50-50">
          <span>
            <SalesByTime />
            <BestClients />
          </span>

          <span>
            <TopProducts />
          </span>
        </section>
      </div>
    </div>
  );
};

export default Sales;
