import React, { useState, useEffect } from 'react';
import RevenueVsCost from '../Financial/RevenueVsCost';
import GenericCard from '../GenericCard';
import TopProductsTable from '../Sales/TopProductsTable';
import SalesBacklogTable from '../Sales/SalesBacklogTable';
import { formatMoney } from '../../helper/CurrencyFormater';
import { YearPicker } from '../YearPicker';
import {
  fetchAccountsReceivable,
  fetchAccountsPayable,
} from '../../actions/financial';

import Layout from '../Layout';

const Overview = () => {
  const [accountsReceivable, setAccountsReceivable] = useState(null);
  const [accountsPayable, setAccountsPayable] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const acReceivable = (await fetchAccountsReceivable()).data;
      const acPayable = (await fetchAccountsPayable()).data;
      setAccountsReceivable(acReceivable);
      setAccountsPayable(acPayable);
    };
    fetchData();
  });

  const [year, setYear] = useState('2020');
  return (
    <Layout>
      <div>
        <div className="top-bar">
          <h1 className="title">Overview</h1>
          <YearPicker year={year} setYear={setYear} />
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
              title="Net Sales"
              description="Total value in sales"
              amount="6100000"
              formatter={formatMoney}
              unit="€"
              styleTitle={{
                borderBottom: '1px solid black',
                backgroundColor: '#37d5d6',
                color: 'white',
              }}
            />
            <GenericCard
              title="Net Costs"
              description="Total value in costs"
              amount="50500"
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
              description="Amount of money owed by customers"
              amount={accountsReceivable}
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
              amount={accountsPayable}
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
            <GenericCard
              title="Sales Backlog"
              description="Total value in backlog"
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
            </span>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default Overview;
