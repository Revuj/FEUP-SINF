import React, { useState, useEffect } from "react";
import ProductInfo from "./ProductInfo";
import ProductSuppliers from "./ProductSuppliers";
import ProductCustomers from "./ProductCustomers";
import ProductSalesvsPurchases from "./ProductSalesvsPurchases";
import UnitsSold from "./UnitsSold";
import UnitsPurchased from "./UnitsPurchased";
import UnitsStock from "./UnitsStock";
import { YearPicker } from "../YearPicker";

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
          <YearPicker year={year} setYear={setYear} />
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
              <ProductCustomers id={id} numberItemsPerPage={5} year={year} />
            </span>
            <span>
              <ProductSuppliers id={id} numberItemsPerPage={5} year={year} />
            </span>
          </section>
          <section>
            <span>
              <ProductSalesvsPurchases id={id} year={year} />
            </span>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default Product;
