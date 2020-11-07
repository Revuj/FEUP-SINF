import React from 'react';
import GenericCard from '../GenericCard';
import GenericTable from '../GenericTable';
import StockByTime from './StockByTime';
import StockByWarehouse from './StockByWarehouse';
import StockByProductTable from './StockByProductTable';
import { formatMoney } from '../../helper/CurrencyFormater';
import '../../styles/Inventory.css';

function index() {
  return (
    <div>
      <h1>Inventory</h1>
      <section className="top-cards">
        <GenericCard
          title="Stock"
          description="Current total stock"
          amount="300000"
          formatter={formatMoney}
          unit="€"
          styleTitle={{
            borderBottom: '1px solid black',
            backgroundColor: '#85DCB0',
          }}
        />
        <GenericCard
          title="Inventory Days"
          description="Average number of days the company holds its inventory before selling it"
          amount="69"
          formatter={formatMoney}
          unit=" days"
          styleTitle={{
            borderBottom: '1px solid black',
            backgroundColor: '#85DCB0',
          }}
        />
      </section>

      <section className="row-50-50">
        <span>
          <StockByProductTable
            numberItemsPerPage={6}
            containerStyle={{ width: '100%' }}
          />
        </span>

        <span>
          <StockByTime />
          <StockByWarehouse />
        </span>
      </section>
    </div>
  );
}

export default index;
