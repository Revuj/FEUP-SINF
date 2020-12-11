import React, { useState, useEffect } from "react";
import ProductInfo from "./ProductInfo";
import ProductSuppliers from "./ProductSuppliers";
import ProductSalesvsPurchases from "./ProductSalesvsPurchases";
import UnitsSold from "./UnitsSold";
import UnitsPurchased from "./UnitsPurchased";

import UnitsStock from "./UnitsStock";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

import Layout from "../Layout";
import { useParams } from "react-router-dom";

const Product = () => {
  const { id } = useParams();
  const [year, setYear] = useState("2020");

  return (
    <Layout>
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
            <UnitsSold id={id} year={year} />
            <UnitsPurchased id={id} year={year} />
            <UnitsStock id={id} />
          </section>
          <section className="row-50-50">
            <span>
              <ProductSalesvsPurchases id={id} year={year} />
            </span>
            <span>
              <ProductSuppliers id={id} numberItemsPerPage={5} />
            </span>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default Product;
