import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GenericCard from '../GenericCard';
import StockByTime from './StockByTime';
import StockByProductTable from './StockByProductTable';
import StockByWarehouseTable from './StockByWarehouseTable';
import { formatMoney } from '../../helper/CurrencyFormater';
import '../../styles/Inventory.css';
import '../../styles/GenericChart.css';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { fetchInventoryTurnover } from '../../actions/stock';

const Index = ({ setPage }) => {
  const [year, setYear] = useState('2020');
  const [stock, setStock] = useState(null);
  const [inventoryTurnover, setInventoryTurnover] = useState(0);
  const [avgInventoryPeriod, setAvgInventoryPeriod] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const inventory_turnover = (await fetchInventoryTurnover()).data;
      setInventoryTurnover(inventory_turnover);
      setAvgInventoryPeriod(365 / inventory_turnover);
    };

    axios
      .get('/api/inventory/stock')
      .then((response) => {
        setStock(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

    fetchData();
  }, []);

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
            description="Current value in stock"
            amount={stock || 0}
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
            title="Average Inventory Period"
            description="Average number of days the company holds its inventory before selling it"
            amount={avgInventoryPeriod}
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
            amount={inventoryTurnover}
            formatter={formatMoney}
            unit=""
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
              numberItemsPerPage={4}
              containerStyle={{ width: '100%' }}
              setPage={setPage}
            />
          </span>

          <span>
            <StockByTime />
          </span>
        </section>
        <StockByWarehouseTable
          numberItemsPerPage={6}
          containerStyle={{ width: '100%' }}
          setPage={setPage}
        />
      </div>
    </div>
  );
};

export default Index;
