import React, { useState } from "react";
import CustomerInformation from "./CustomerInformation";
import UnitsSold from "./UnitsSold";
import PendingSales from "./PendingSales";
import CustomerSales from "./CustomerSales";
import { YearPicker } from "../YearPicker";
import Layout from "../Layout";
import { useParams } from "react-router-dom";

const Customer = () => {
  const { id } = useParams();
  const [year, setYear] = useState("2020");

  return (
    <Layout>
      <div>
        <div className="top-bar">
          <h1 className="title">Customer</h1>
          <YearPicker year={year} setYear={setYear} />
        </div>
        <div className="main-content">
          <section className="top-cards">
            <CustomerInformation id={id} />
            <UnitsSold id={id} year={year} />
          </section>
          <section className="row-50-50">
            <span>
              <CustomerSales id={id} year={year} />
            </span>
            <span>
              <PendingSales id={id} numberItemsPerPage={5} />
            </span>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default Customer;
