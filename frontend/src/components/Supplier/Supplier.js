import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import SupplierInformation from "./SupplierInformation";
import TotalPurchased from "./TotalPurchased";
import PendingPurchases from "./PendingPurchases";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

export default function Supplier({ id }) {
  const [year, setYear] = useState("2020");

  return (
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
          <TotalPurchased id={id} />
        </section>
        <section>
          <PendingPurchases id={id} numberItemsPerPage={5} />
        </section>
      </div>
    </div>
  );
}
