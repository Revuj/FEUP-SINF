import React, { useState, useEffect } from 'react';
import GenericCard from '../GenericCard';
import SalesByTime from './SalesByTime';
import BestClientsTable from './BestClientsTable';
import SalesBacklogTable from './SalesBacklogTable';
import TopProductsTable from './TopProductsTable';
import { YearPicker } from '../YearPicker';
import { formatMoney } from '../../helper/CurrencyFormater';
import '../../styles/Sales.css';
import {
  fetchCogs,
  fetchNetSales,
  fetchBacklogValue,
} from '../../actions/sales';

import Layout from '../Layout';

const Sales = ({ setPage }) => {
  const [year, setYear] = useState('2020');
  const [gpm, setGpm] = useState(null);
  const [backlog, setBacklog] = useState(null);
  const [netSales, setNetSales] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await fetchCogs();
      const sales = await fetchNetSales(year);
      const backlogValue = await fetchBacklogValue();
      setNetSales(sales.data);
      setBacklog(backlogValue.data);
      setGpm(
        netSales === null
          ? null
          : (netSales - (data.cogs.totalDebit - data.cogs.totalCredit)) /
              netSales
      );
    };
    fetchData();
  }, [netSales]);

  return (
    <Layout>
      <div>
        <div className="top-bar">
          <h1 className="title">Sales</h1>
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
              title="Sales Backlog"
              description="Total value in backlog"
              amount={backlog}
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
          </section>

          <section className="row-50-50">
            <span>
              <SalesByTime year={year} />
              <BestClientsTable
                numberItemsPerPage={5}
                year={year}
                setPage={setPage}
              />
            </span>
            <span>
              <TopProductsTable
                numberItemsPerPage={4}
                year={year}
                setPage={setPage}
              />
              <SalesBacklogTable numberItemsPerPage={4} setPage={setPage} />
            </span>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default Sales;
