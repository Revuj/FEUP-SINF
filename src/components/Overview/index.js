import React, { useState } from 'react';
import RevenueVsCost from '../Financial/RevenueVsCost';
import StockByTime from '../Inventory/StockByTime';
import GenericCard from '../GenericCard';
import TopProductsTable from '../Sales/TopProductsTable';
import SalesBacklogTable from '../Sales/SalesBacklogTable';
import { formatMoney } from '../../helper/CurrencyFormater';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

const Overview = () => {
  const [year, setYear] = useState('2020');
  return (
    <div>
      <div className="top-bar">
        <h1 className="title">Overview</h1>
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
          <GenericCard
            title="Accounts Receivable"
            description="Amount of money owed by customers for purchases made on credit"
            amount="300000"
            formatter={formatMoney}
            unit="€"
            styleTitle={{
              borderBottom: '1px solid black',
              backgroundColor: '#37d5d6',
              color: 'white',
            }}
          />
          <GenericCard
            title="Accounts Payable"
            description="Amount of money owed to suppliers"
            amount="10000"
            formatter={formatMoney}
            unit="€"
            styleTitle={{
              borderBottom: '1px solid black',
              backgroundColor: '#37d5d6',
              color: 'white',
            }}
          />
          <GenericCard
            title="Inventory value"
            description="Current total stock"
            amount="300000"
            formatter={formatMoney}
            unit="€"
            styleTitle={{
              borderBottom: '1px solid black',
              backgroundColor: '#37d5d6',
              color: 'white',
            }}
            styleCard={{
              backgroundColor: 'white',
            }}
          />
        </section>

        <section className="row-50-50">
          <span>
            <RevenueVsCost height="115" />
            <StockByTime />
          </span>
          <span>
            <SalesBacklogTable numberItemsPerPage={3} />
            <TopProductsTable numberItemsPerPage={3} />
          </span>
        </section>
      </div>
    </div>
  );
};

export default Overview;
