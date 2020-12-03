import React, { useState, useEffect } from 'react';
import RevenueVsCost from './RevenueVsCost';
import GenericCard from '../GenericCard';
import BalanceSheet from './BalanceSheet';
import { formatMoney } from '../../helper/CurrencyFormater';
import '../../styles/Finantial.css';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { fetchProfitLoss, fetchBalanceSheet } from '../../actions/financial';
import ProfitLossStatement from './ProfitLossStatement';

const Index = () => {
  const [year, setYear] = useState('2020');
  const [ebit, setEbit] = useState(0);
  const [ebitda, setEbitda] = useState(0);
  const [netIncome, setNetIncome] = useState(0);
  const [cogs, setCogs] = useState(0);
  const [revenue, setRevenue] = useState(null);
  const [expenses, setExpenses] = useState(null);
  const [assets, setAssets] = useState(null);
  const [liabilities, setLiabilities] = useState(null);
  const [equity, setEquity] = useState(null);

  useEffect(() => {
    const fetchProfitLossData = async () => {
      const { data } = await fetchProfitLoss();
      setEbit(data.ebit);
      setEbitda(data.ebitda);
      setNetIncome(data.netIncome);
      setCogs(data.cogs);
      setRevenue(data.revenue);
      setExpenses(data.expenses);
    };
    fetchProfitLossData();

    const fetchBalanceSheetData = async () => {
      const { data } = await fetchBalanceSheet();
      console.log('balance sheet');
      console.log(data);
      setAssets(data.assets);
      setLiabilities(data.liabilities);
      setEquity(data.equity);
    };
    fetchBalanceSheetData();
  }, []);

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
            amount={ebit}
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
            amount={ebitda}
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
            amount={netIncome}
            formatter={formatMoney}
            unit="€"
            styleTitle={{
              borderBottom: '1px solid black',
              backgroundColor: '#37d5d6',
              color: 'white',
            }}
          />
          <GenericCard
            title="Cogs"
            description="Cost of goods sold"
            amount={cogs}
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
          {revenue && expenses && (
            <ProfitLossStatement
              title="Profit & Loss Statement"
              data={[
                { name: 'revenue', data: revenue },
                { name: 'expenses', data: expenses },
              ]}
              style={{ width: '25%', backgroundColor: 'white' }}
              itemStyle={{ borderTop: '1px solid black' }}
            />
          )}

          {assets && liabilities && equity && (
            <BalanceSheet
              title="Profit & Loss Statement"
              assets={assets}
              liabilities={liabilities}
              equity={equity}
              style={{ width: '25%', backgroundColor: 'white' }}
              itemStyle={{ borderTop: '1px solid black' }}
            />
          )}
        </section>
      </div>
    </div>
  );
};

export default Index;
