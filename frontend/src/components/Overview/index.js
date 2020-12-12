import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RevenueVsCost from '../Financial/RevenueVsCost';
import GenericCard from '../GenericCard';
import TopProductsTable from '../Sales/TopProductsTable';
import SalesBacklogTable from '../Sales/SalesBacklogTable';
import { formatMoney } from '../../helper/CurrencyFormater';
import { YearPicker } from '../YearPicker';
import {
  fetchCogs,
  fetchNetSales,
  fetchBacklogValue,
} from '../../actions/sales';
import {
  fetchAccountsReceivable,
  fetchAccountsPayable,
} from '../../actions/financial';
import SalesAndPurchases from './salesAndPurchases';

import Layout from '../Layout';

const Overview = () => {
  const [year, setYear] = useState('2020');
  const [gpm, setGpm] = useState(null);
  const [netSales, setNetSales] = useState(null);
  const [stock, setStock] = useState(null);
  const [salesBacklog, setSalesBacklog] = useState(null);
  const [purchasesBacklog, setPurchasesBacklog] = useState(null);
  const [totalOfPurchases, setTotalOfPurchases] = useState(null);
  const [accountsReceivable, setAccountsReceivable] = useState(null);
  const [accountsPayable, setAccountsPayable] = useState(null);

  useEffect(() => {
    setNetSales(null);
    setGpm(null);
    setTotalOfPurchases(null);
    const fetchData = async () => {
      const { data } = await fetchCogs();
      const sales = await fetchNetSales(year);
      const backlogValue = await fetchBacklogValue();
      const acReceivable = (await fetchAccountsReceivable()).data;
      const acPayable = (await fetchAccountsPayable()).data;
      setAccountsReceivable(acReceivable);
      setAccountsPayable(acPayable);
      setNetSales(sales.data);
      setSalesBacklog(backlogValue.data);
      setGpm(
        !sales.data
          ? 'N/A'
          : (sales.data - (data.cogs.totalDebit - data.cogs.totalCredit)) /
              sales.data
      );

      axios
        .get(`/api/purchases/${year}`)
        .then((response) => {
          setTotalOfPurchases(response.data.reduce((a, b) => a + b, 0));
        })
        .catch((error) => {
          console.error(error);
        });

      axios
        .get('/api/inventory/stock')
        .then((response) => {
          setStock(response.data);
        })
        .catch((error) => {
          console.error(error);
        });

      axios
        .get(`/api/purchasesBacklog`)
        .then((response) => {
          setPurchasesBacklog(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    };
    fetchData();
  }, [year]);

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
              amount={gpm}
              formatter={(x) => Math.round((x + Number.EPSILON) * 100) / 100}
              unit="%"
              styleTitle={{
                borderBottom: '1px solid black',
                backgroundColor: '#ffbf54',
                color: 'white',
              }}
            />
            <GenericCard
              title="Net Sales"
              description="Total value in sales"
              amount={netSales}
              formatter={formatMoney}
              unit="€"
              styleTitle={{
                borderBottom: '1px solid black',
                backgroundColor: '#ffbf54',
                color: 'white',
              }}
            />
            <GenericCard
              title="Total Purchases"
              description="Total value in purchases"
              amount={totalOfPurchases}
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
              description="Amount of money owed by customers"
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
              title="Stock"
              description="Current value in stock"
              amount={stock}
              formatter={formatMoney}
              unit="€"
              styleTitle={{
                borderBottom: '1px solid black',
                backgroundColor: '#ffbf54',
                color: 'white',
              }}
              styleCard={{
                backgroundColor: 'white',
              }}
            />
            <GenericCard
              title="Sales Backlog"
              description="Total value in backlog"
              amount={salesBacklog}
              formatter={formatMoney}
              unit="€"
              styleTitle={{
                borderBottom: '1px solid black',
                backgroundColor: '#ffbf54',
                color: 'white',
              }}
              styleCard={{
                backgroundColor: 'white',
              }}
            />
            <GenericCard
              className="orders-to-arrive"
              title="Purchases backlog"
              description="Amounts of money in orders that are to arrive."
              amount={purchasesBacklog}
              formatter={formatMoney}
              unit="€"
              styleTitle={{
                borderBottom: '1px solid black',
                backgroundColor: '#ffbf54',
                color: 'white',
              }}
            />
          </section>

          <section className="row-50-50">
            <span>
              <RevenueVsCost height="115" />
            </span>
            <span>
              <SalesAndPurchases height="115" year={year} />
            </span>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default Overview;
