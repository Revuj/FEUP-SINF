import React, { useState } from "react";
import SupplierInformation from "./SupplierInformation";
import UnitsPurchased from "./UnitsPurchased";
import SupplierPurchases from "./SupplierPurchases";
import PendingPurchases from "./PendingPurchases";
import { YearPicker } from "../YearPicker";
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
          <YearPicker year={year} setYear={setYear} />
        </div>
        <div className="main-content">
          <section className="top-cards">
            <SupplierInformation id={id} />
            <UnitsPurchased id={id} year={year} />
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
