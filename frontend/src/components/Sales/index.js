import React, { useState, useEffect } from 'react';
import GenericCard from '../GenericCard';
import SalesByTime from './SalesByTime';
import BestClientsTable from './BestClientsTable';
import SalesBacklogTable from './SalesBacklogTable';
import TopProductsTable from './TopProductsTable';
import { formatMoney } from '../../helper/CurrencyFormater';
// import { formatePercentage } from "../../helper/PercentageFormater";
import '../../styles/Sales.css';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import {
  fetchGrossProfitMargin,
  fetchNetSales,
  fetchBacklogValue,
} from '../../actions/sales';

const Sales = ({ setPage }) => {
  const [year, setYear] = useState('2020');
  const [gpm, setGpm] = useState(null);
  const [backlog, setBacklog] = useState(null);
  const [netSales, setNetSales] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const gpm = await fetchGrossProfitMargin();
      const sales = await fetchNetSales(year);
      const backlogValue = await fetchBacklogValue();
      setGpm(gpm.data.gpm);
      setNetSales(sales.data);
      setBacklog(backlogValue.data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <div className="top-bar">
        <h1 className="title">Sales</h1>
        <DropdownButton id="dropdown-basic-button" title={year}>
          <Dropdown.Item href="#/action-1">2020</Dropdown.Item>
          <Dropdown.Item href="#/action-2">2019</Dropdown.Item>
          <Dropdown.Item href="#/action-3">2018</Dropdown.Item>
        </DropdownButton>
      </div>

      <div className="main-content">
        <section className="top-cards">
          <GenericCard
            title="GPM"
            description="Gross Profit Margin"
            amount={gpm}
            formatter={null}
            unit="%"
            styleTitle={{
              borderBottom: '1px solid black',
              backgroundColor: '#37d5d6',
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
              backgroundColor: '#37d5d6',
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
  );
};

export default Sales;
