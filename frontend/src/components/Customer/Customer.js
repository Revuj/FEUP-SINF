import React, { useState } from "react";
import CustomerInformation from "./CustomerInformation";
import TotalPurchased from "./TotalPurchased";
import TopPurchases from "./TopPurchases";
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
            <TotalPurchased id={id} />
          </section>
          <section>
            <TopPurchases numberItemsPerPage={5} id={id} />
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default Customer;
