import React, { useState } from "react";
import CustomerInformation from "./CustomerInformation";
import UnitsSold from "./UnitsSold";
import UnitsOrdered from "./UnitsOrdered";
import PendingSales from "./PendingSales";
import CustomerSales from "./CustomerSales";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
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
          <DropdownButton id="dropdown-basic-button" title={year}>
            <Dropdown.Item href="#/action-1">2020</Dropdown.Item>
            <Dropdown.Item href="#/action-2">2019</Dropdown.Item>
            <Dropdown.Item href="#/action-3">2018</Dropdown.Item>
          </DropdownButton>
        </div>
        <div className="main-content">
          <section className="top-cards">
            <CustomerInformation id={id} />
            <UnitsSold id={id} year={year} />
            <UnitsOrdered id={id} year={year} />
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
