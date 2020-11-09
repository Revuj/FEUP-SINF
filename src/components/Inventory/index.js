import React, { useState } from 'react';
import GenericCard from '../GenericCard';
import GenericTable from '../GenericTable';
import StockByTime from './StockByTime';
import StockByWarehouse from './StockByWarehouse';
import StockByProductTable from './StockByProductTable';
import StockByWarehouseTable from './StockByWarehouseTable';
import { formatMoney } from '../../helper/CurrencyFormater';
import '../../styles/Inventory.css';
import '../../styles/GenericChart.css';
import { withTheme } from '@material-ui/core';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

const Index = () => {
  const [year, setYear] = useState('2020');
  return (
    <div>
      <div className="top-bar">
        <h1 className="title">Inventory</h1>
        <DropdownButton id="dropdown-basic-button" title={year}>
          <Dropdown.Item href="#/action-1">2020</Dropdown.Item>
          <Dropdown.Item href="#/action-2">2019</Dropdown.Item>
          <Dropdown.Item href="#/action-3">2018</Dropdown.Item>
        </DropdownButton>
      </div>
      <div className="main-content">
        <section className="top-cards">
          <GenericCard
            title="Stock"
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
            title="Inventory Days"
            description="Average number of days the company holds its inventory before selling it"
            amount="69"
            formatter={formatMoney}
            unit=" days"
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
            title="Inventory Turnover"
            description="Ratio showing how many times a company has sold and replaced inventory during a given period"
            amount="5"
            formatter={formatMoney}
            unit=" "
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
            title="Delay in Stock Receivment"
            description="Average number of days the company takes to receive items from the suppliers"
            amount="5"
            formatter={formatMoney}
            unit=" "
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
            <StockByProductTable
              numberItemsPerPage={12}
              containerStyle={{ width: '100%' }}
            />
          </span>

          <span>
            <StockByTime />
            <StockByWarehouse />
            <StockByWarehouseTable
              numberItemsPerPage={6}
              containerStyle={{ width: '100%' }}
            />
          </span>
        </section>
      </div>
    </div>
  );
};

export default Index;
