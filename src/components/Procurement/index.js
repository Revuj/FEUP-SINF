/*
procurement => 
    compras (grafico) [] => grafico a ser usado tem a informacao errada, depois e preciso fazer outro
    suppliers (tabela) [x]
    product not arrived (card) [x]
    accounts payable (card) [x]
    total  em compras (card) [x]ou grafico cumulativo das compras [x]
*/
import React, { useState } from 'react';
import GenericCard from '../GenericCard';
import { formatMoney } from '../../helper/CurrencyFormater';
import GenericTable from '../GenericTable';
import RevenueVsCost from '../Financial/RevenueVsCost';
import '../../styles/Procurement.css';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

const Procurement = ({ title }) => {
  const [year, setYear] = useState('2020');

  return (
    <div>
      <div className="top-bar">
        <h1 className="title">{title}</h1>
        <DropdownButton id="dropdown-basic-button" title={year}>
          <Dropdown.Item href="#/action-1">2020</Dropdown.Item>
          <Dropdown.Item href="#/action-2">2019</Dropdown.Item>
          <Dropdown.Item href="#/action-3">2018</Dropdown.Item>
        </DropdownButton>
      </div>

      <div className="main-content">
        <section className="top-cards">
          <GenericCard
            className="account-payable"
            title="Accounts payable"
            description="Amounts due to vendors or suppliers for goods that have not yet been paid for."
            amount="56000"
            formatter={formatMoney}
            unit="€"
            styleTitle={{
              borderBottom: '1px solid black',
              backgroundColor: '#37d5d6',
              color: 'white',
            }}
          />
          <GenericCard
            className="orders-to-arrive"
            title="Orders To Arrive"
            description="Amounts of money in orders that are to arrive."
            amount="33000"
            formatter={formatMoney}
            unit="€"
            styleTitle={{
              borderBottom: '1px solid black',
              backgroundColor: '#37d5d6',
              color: 'white',
            }}
          />

          <GenericCard
            class
            qName="total-purchases"
            title="Total purchases"
            description="Amounts of money spent in purchases"
            amount="80000"
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

        <GenericTable
          title="Suppliers"
          numberItemsPerPage={4}
          headers={[
            { name: 'No#', field: 'id', sortable: false },
            { name: 'Name', field: 'name', sortable: true },
            { name: 'Email', field: 'email', sortable: true },
          ]}
          containerStyle={{ width: '100%', marginTop: '2rem' }}
          themeColor=""
        />
      </div>
    </div>
  );
};

export default Procurement;
