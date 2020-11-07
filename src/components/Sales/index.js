import React from 'react';
import GenericCard from '../GenericCard';
import BestClientsTable from './BestClientsTable';
import SalesByTime from './SalesByTime';
import TopProductsTable from './TopProductsTable';
import { formatMoney } from '../../helper/CurrencyFormater';
import '../../styles/Sales.css';

function index() {
  return (
    <div>
      <h1>Sales</h1>
      <section className="top-cards">
        <GenericCard
          title="GPM"
          description="Gross Profit Margin"
          amount="70000"
          formatter={formatMoney}
          unit="€"
          styleTitle={{
            borderBottom: '1px solid black',
            backgroundColor: '#85DCB0',
          }}
        />
      </section>
      <section className="row-50-50">
        <span>
          <SalesByTime />
          <BestClientsTable
            numberItemsPerPage={4}
          />
        </span>

        <span>
          <TopProductsTable
            numberItemsPerPage={6}
          />
        </span>
      </section>
    </div>
  );
}

export default index;
