import React, { useState } from 'react';
import RevenueVsCost from './RevenueVsCost';
import GenericCard from '../GenericCard';
import GenericListing from '../GenericListing';
import GenericTable from '../GenericTable';
import { formatMoney } from '../../helper/CurrencyFormater';
import '../../styles/Finantial.css';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

const Index = () => {
  const [year, setYear] = useState('2020');
  return (
    <div>
      <div className="top-bar">
        <h1 className="title">Financial</h1>
        <DropdownButton id="dropdown-basic-button" title={year}>
          <Dropdown.Item href="#/action-1">2020</Dropdown.Item>
          <Dropdown.Item href="#/action-2">2019</Dropdown.Item>
          <Dropdown.Item href="#/action-3">2018</Dropdown.Item>
        </DropdownButton>
      </div>

      <div className="main-content">
        <section className="top-cards">
          <GenericCard
            title="EBIT"
            description="Earnings Before Interest and Taxes"
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
            title="EBITDA"
            description="Earnings before interest, taxes, depreciation and amortization"
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
            title="Net Income"
            description="Amount of profit "
            amount="300000"
            formatter={formatMoney}
            unit="€"
            styleTitle={{
              borderBottom: '1px solid black',
              backgroundColor: '#37d5d6',
              color: 'white',
            }}
          />
        </section>
        <RevenueVsCost />

        <section className="listingInfo">
          <GenericListing
            title="Balance sheet"
            data={[
              { label: 'caixa', description: '+100' },
              { label: 'caixa', description: '-50' },
              { label: 'vendas', description: '+150' },
              { label: 'compras', description: '-250' },
            ]}
            style={{ width: '25%', backgroundColor: 'white' }}
            itemStyle={{ borderTop: '1px solid black' }}
          />

          <GenericListing
            title="Income statement"
            data={[
              { label: 'caixa', description: '+100' },
              { label: 'caixa', description: '-50' },
              { label: 'vendas', description: '+150' },
              { label: 'compras', description: '-250' },
            ]}
            style={{ width: '25%', backgroundColor: 'white' }}
            itemStyle={{ borderTop: '1px solid black' }}
          />
        </section>
      </div>
    </div>
  );
};

export default Index;
