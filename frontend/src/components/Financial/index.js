import React, { useState, useEffect } from 'react';
import RevenueVsCost from './RevenueVsCost';
import GenericCard from '../GenericCard';
import BalanceSheet from './BalanceSheet';
import { formatMoney } from '../../helper/CurrencyFormater';
import '../../styles/Finantial.css';
import { YearPicker } from '../YearPicker';
import {
  fetchProfitLoss,
  fetchBalanceSheet,
  fetchAccountsReceivable,
  fetchAccountsPayable,
} from '../../actions/financial';
import ProfitLossStatement from './ProfitLossStatement';

import Layout from '../Layout';

const Index = () => {
  const [year, setYear] = useState('2020');
  const [ebit, setEbit] = useState(null);
  const [ebitda, setEbitda] = useState(null);
  const [accountsReceivable, setAccountsReceivable] = useState(null);
  const [accountsPayable, setAccountsPayable] = useState(null);
  const [netIncome, setNetIncome] = useState(null);
  const [cogs, setCogs] = useState(null);
  const [revenue, setRevenue] = useState(null);
  const [expenses, setExpenses] = useState(null);
  const [assets, setAssets] = useState(null);
  const [liabilities, setLiabilities] = useState(null);
  const [equity, setEquity] = useState(null);

  useEffect(() => {
    const fetchProfitLossData = async () => {
      const { data } = await fetchProfitLoss();
      const acReceivable = (await fetchAccountsReceivable()).data;
      const acPayable = (await fetchAccountsPayable()).data;
      setEbit(data.ebit);
      setEbitda(data.ebitda);
      setNetIncome(data.netIncome);
      setCogs(data.cogs);
      setRevenue(data.revenue);
      setExpenses(data.expenses);
      setAccountsReceivable(acReceivable);
      setAccountsPayable(acPayable);
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
    <Layout>
      <div>
        <div className="top-bar">
          <h1 className="title">Financial</h1>
          <YearPicker year={year} setYear={setYear} />
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
                backgroundColor: '#ffbf54',
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
                backgroundColor: '#ffbf54',
                color: 'white',
              }}
            />
            <GenericCard
              title="Accounts Receivable"
              description="Amount of money owed by customers for purchases made on credit"
              amount={accountsReceivable}
              formatter={formatMoney}
              unit="€"
              styleTitle={{
                borderBottom: '1px solid black',
                backgroundColor: '#ffbf54',
                color: 'white',
              }}
            />
            <GenericCard
              title="Accounts Payable"
              description="Amount of money owed to suppliers"
              amount={accountsPayable}
              formatter={formatMoney}
              unit="€"
              styleTitle={{
                borderBottom: '1px solid black',
                backgroundColor: '#ffbf54',
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
                backgroundColor: '#ffbf54',
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
                backgroundColor: '#ffbf54',
                color: 'white',
              }}
            />
          </section>
          <RevenueVsCost />

          <section className="listingInfo">
            <ProfitLossStatement
              title="Profit & Loss Statement"
              data={
                !(revenue && expenses)
                  ? null
                  : [
                      { name: 'revenue', data: revenue },
                      { name: 'expenses', data: expenses },
                    ]
              }
              style={{ width: '25%', backgroundColor: 'white' }}
              itemStyle={{ borderTop: '1px solid black' }}
            />
            <BalanceSheet
              title="Balance Sheet"
              assets={assets}
              liabilities={liabilities}
              equity={equity}
              style={{ width: '25%', backgroundColor: 'white' }}
              itemStyle={{ borderTop: '1px solid black' }}
            />
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
