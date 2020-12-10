import React, { useEffect, useState } from "react";
import axios from "axios";
import GenericCard from "../GenericCard";
import { formatMoney } from "../../helper/CurrencyFormater";
import Purchases from "./Purchases";
import SuppliersTable from "../Procurement/SuppliersTable";
import "../../styles/Procurement.css";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { fetchAccountsPayable } from "../../actions/financial";
import { fetchDebt } from "../../actions/purchases";

const Procurement = ({ title, setPage }) => {
  const [year, setYear] = useState("2020");
  const [accountsPayable, setAccountsPayable] = useState(null);
  const [purchasesBacklog, setPurchasesBacklog] = useState(null);
  const [totalOfPurchases, setTotalOfPurchases] = useState(null);
  const [delayInReceivment, setDelayInReceivment] = useState(null);
  const [debt, setDebt] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const acPayable = (await fetchAccountsPayable()).data;
      const debtSuplliers = (await fetchDebt()).data;
      setAccountsPayable(acPayable);
      setDebt(debtSuplliers.debt);
    };

    axios
      .get(`/api/purchases/${year}`)
      .then((response) => {
        setTotalOfPurchases(response.data.reduce((a, b) => a + b, 0));
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

    fetchData();
  }, [year]);

  return (
    <div>
      <div className="top-bar">
        <h1 className="title">{title}</h1>
        <DropdownButton id="dropdown-basic-button" title={year}>
          <Dropdown.Item href="#/action-1" onClick={() => setYear(2020)}>
            2020
          </Dropdown.Item>
          <Dropdown.Item href="#/action-2" onClick={() => setYear(2019)}>
            2019
          </Dropdown.Item>
          <Dropdown.Item href="#/action-3" onClick={() => setYear(2018)}>
            2018
          </Dropdown.Item>
        </DropdownButton>
      </div>

      <div className="main-content">
        <section className="top-cards">
          <GenericCard
            className="account-payable"
            title="Accounts payable"
            description="Amounts due to vendors or suppliers for goods that have not yet been paid for."
            amount={accountsPayable}
            formatter={formatMoney}
            unit="€"
            styleTitle={{
              borderBottom: "1px solid black",
              backgroundColor: "#37d5d6",
              color: "white",
            }}
          />
          <GenericCard
            className="orders-to-arrive"
            title="Purchase backlog"
            description="Amounts of money in orders that are to arrive."
            amount={purchasesBacklog}
            formatter={formatMoney}
            unit="€"
            styleTitle={{
              borderBottom: "1px solid black",
              backgroundColor: "#37d5d6",
              color: "white",
            }}
          />

          <GenericCard
            class
            qName="total-purchases"
            title="total of purchases"
            description="Amount of money spent in purchases"
            amount={totalOfPurchases}
            formatter={formatMoney}
            unit="€"
            styleTitle={{
              borderBottom: "1px solid black",
              backgroundColor: "#37d5d6",
              color: "white",
            }}
          />

          <GenericCard
            title="Debt to suppliers"
            description="Amount of money in debt to the suplliers"
            amount={debt || 0}
            formatter={formatMoney}
            unit="€"
            styleTitle={{
              borderBottom: "1px solid black",
              backgroundColor: "#37d5d6",
              color: "white",
            }}
            styleCard={{
              backgroundColor: "white",
            }}
          />

          <GenericCard
            title="Delay in inventory Receivment"
            description="Average number of days the company takes to receive items from the suppliers"
            amount="5"
            formatter={formatMoney}
            unit=" "
            styleTitle={{
              borderBottom: "1px solid black",
              backgroundColor: "#37d5d6",
              color: "white",
            }}
            styleCard={{
              backgroundColor: "white",
            }}
          />
        </section>

        <section className="row-50-50">
          <span>
            <Purchases year={year} />
          </span>
          <span>
            <SuppliersTable
              setPage={setPage}
              numberItemsPerPage={6}
              containerStyle={{ width: "100%" }}
              year={year}
            />
          </span>
        </section>
      </div>
    </div>
  );
};

export default Procurement;
