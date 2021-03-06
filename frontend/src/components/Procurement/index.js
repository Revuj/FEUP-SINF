import React, { useEffect, useState } from "react";
import axios from "axios";
import GenericCard from "../GenericCard";
import { formatMoney } from "../../helper/CurrencyFormater";
import Purchases from "./Purchases";
import SuppliersTable from "../Procurement/SuppliersTable";
import "../../styles/Procurement.css";
import { YearPicker } from "../YearPicker";
import { fetchAccountsPayable } from "../../actions/financial";
import { fetchDebt } from "../../actions/purchases";
import PurchasesBacklogTable from "./PurchasesBacklogTable";
import TopProductsTable from "./TopProductsTable";
import Layout from "../Layout";

const Procurement = ({ title, setPage }) => {
  const [year, setYear] = useState("2020");
  const [purchasesBacklog, setPurchasesBacklog] = useState(null);
  const [totalOfPurchases, setTotalOfPurchases] = useState(null);
  const [debt, setDebt] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const debtSuplliers = (await fetchDebt()).data;
      setDebt(debtSuplliers);
    };

    setTotalOfPurchases(null);
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
    <Layout>
      <div className="top-bar">
        <h1 className="title">Procurement</h1>
        <YearPicker year={year} setYear={setYear} />
      </div>

      <div className="main-content">
        <section className="top-cards">
          <GenericCard
            className="account-payable"
            title="Accounts payable"
            description="Amounts due to vendors or suppliers for goods that have not yet been paid for."
            amount={debt}
            formatter={formatMoney}
            unit="€"
            styleTitle={{
              borderBottom: "1px solid black",
              backgroundColor: "#ffbf54",
              color: "white",
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
              borderBottom: "1px solid black",
              backgroundColor: "#ffbf54",
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
              backgroundColor: "#ffbf54",
              color: "white",
            }}
          />
        </section>

        <section className="row-50-50">
          <span>
            <Purchases year={year} />
            <SuppliersTable
              setPage={setPage}
              numberItemsPerPage={6}
              containerStyle={{ width: "100%" }}
              year={year}
            />{" "}
          </span>
          <span>
            <TopProductsTable
              setPage={setPage}
              numberItemsPerPage={6}
              containerStyle={{ width: "100%" }}
              year={year}
            />
            <PurchasesBacklogTable numberItemsPerPage={4} setPage={setPage} />
          </span>
        </section>
      </div>
    </Layout>
  );
};

export default Procurement;
