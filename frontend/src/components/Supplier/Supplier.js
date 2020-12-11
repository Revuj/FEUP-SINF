import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import SupplierInformation from "./SupplierInformation";
import UnitsPurchased from "./UnitsPurchased";
import UnitsOrdered from "./UnitsOrdered";
import SupplierPurchases from "./SupplierPurchases";
import PendingPurchases from "./PendingPurchases";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

import Layout from "../Layout";
import { useParams } from "react-router-dom";

const Supplier = () => {
  const { id } = useParams();
  const [year, setYear] = useState("2020");

  return (
    <Layout>
      <div>
        <div className="top-bar">
          <h1 className="title">Supplier</h1>
          <DropdownButton id="dropdown-basic-button" title={year}>
            <Dropdown.Item href="#/action-1">2020</Dropdown.Item>
            <Dropdown.Item href="#/action-2">2019</Dropdown.Item>
            <Dropdown.Item href="#/action-3">2018</Dropdown.Item>
          </DropdownButton>
        </div>
        <div className="main-content">
          <section className="top-cards">
            <SupplierInformation id={id} />
            <UnitsPurchased id={id} year={year} />
            <UnitsOrdered id={id} year={year} />
          </section>
          <section className="row-50-50">
            <span>
              <SupplierPurchases id={id} year={year} />
            </span>
            <span>
              <PendingPurchases id={id} numberItemsPerPage={5} />
            </span>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default Supplier;
