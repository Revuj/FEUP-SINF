import React from 'react';
import RevenueVsCost from './RevenueVsCost';
import GenericCard from '../GenericCard';
import GenericListing from '../GenericListing';
import GenericTable from '../GenericTable';
import { formatMoney } from '../../helper/CurrencyFormater';
import '../../styles/Finantial.css';

function index() {
  return (
    <div>
      <h1>Financial</h1>

      <section className="pontualInfo">
        <GenericCard
          title="EBIT"
          description="Earnings Before Interest and Taxes"
          amount="300000"
          formatter={formatMoney}
          unit="€"
          styleTitle={{
            borderBottom: '1px solid black',
            backgroundColor: '#85DCB0',
          }}
          styleCard={{
            width: '45%',
          }}
        />
        <GenericCard
          title="EBITA"
          description="Earnings before interest, taxes, and amortization"
          amount="300000"
          formatter={formatMoney}
          unit="€"
          styleTitle={{
            borderBottom: '1px solid black',
            backgroundColor: '#E8A87C',
          }}
          styleCard={{
            width: '45%',
          }}
        />
        <GenericCard
          title="Account Receivables"
          description="Amount of money owed by customers for purchases made on credit"
          amount="300000"
          formatter={formatMoney}
          unit="€"
          styleTitle={{
            borderBottom: '1px solid black',
            backgroundColor: '#C38D9E',
          }}
          styleCard={{
            width: '45%',
          }}
        />
        <GenericCard
          title="Earnings"
          description="Amount of profit "
          amount="300000"
          formatter={formatMoney}
          unit="€"
          styleTitle={{
            borderBottom: '1px solid black',
            backgroundColor: '#41B3A3',
          }}
          styleCard={{
            width: '45%',
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
          title="Profit and loss statement"
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
  );
}

export default index;
