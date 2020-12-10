import React, { useState, useEffect } from "react";
import ProductInfo from "./ProductInfo";
import ProductSuppliers from "./ProductSuppliers";
import ProductSales from "./ProductSales";
import UnitsSold from "./UnitsSold";
import UnitsStock from "./UnitsStock";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

export default function Product({ id }) {
  const [year, setYear] = useState("2020");

  return (
    <div>
      <div className="top-bar">
        <h1 className="title">Product</h1>
        <DropdownButton id="dropdown-basic-button" title={year}>
          <Dropdown.Item href="#/action-1">2020</Dropdown.Item>
          <Dropdown.Item href="#/action-2">2019</Dropdown.Item>
          <Dropdown.Item href="#/action-3">2018</Dropdown.Item>
        </DropdownButton>
      </div>
      <div className="main-content">
        <section className="top-cards">
          <ProductInfo id={id} />
          <UnitsSold id={id} />
          <UnitsStock id={id} />
        </section>
        <section className="row-50-50">
          <span>
            <ProductSales id={id} />
          </span>
          <span>
            <ProductSuppliers id={id} numberItemsPerPage={5} />
          </span>
        </section>
      </div>
    </div>
  );
}
