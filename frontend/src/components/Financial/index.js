import React, { useState, useEffect } from "react";
import RevenueVsCost from "./RevenueVsCost";
import GenericCard from "../GenericCard";
import GenericListing from "../GenericListing";
import { formatMoney } from "../../helper/CurrencyFormater";
import "../../styles/Finantial.css";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { fetchProfitLoss } from "../../api/financial";

const Index = () => {
  const [year, setYear] = useState("2020");
  const [ebit, setEbit] = useState(0);
  const [ebitda, setEbitda] = useState(0);
  const [netIncome, setNetIncome] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await fetchProfitLoss();
      setEbit(data.ebit);
      setEbitda(data.ebitda);
      setNetIncome(data.netIncome);
    };
    fetchData();
  });

  return (
    <div>
      <div className="top-bar">
        <h1 className="title">Financial</h1>
        <DropdownButton id="dropdown-basic-button" title={year}>
          <Dropdown.Item href="#/action-1">2020</Dropdown.Item>
          <Dropdown.Item href="#/action-2">2019</Dropdown.Item>
          <Dropdown.Item href="#/action-3">2018</Dropdown.Item>
        </DropdownButton>
      </div>

      <div className="main-content">
        <section className="top-cards">
          <GenericCard
            title="EBIT"
            description="Earnings Before Interest and Taxes"
            amount={ebit}
            formatter={formatMoney}
            unit="€"
            styleTitle={{
              borderBottom: "1px solid black",
              backgroundColor: "#37d5d6",
              color: "white",
            }}
          />
          <GenericCard
            title="EBITDA"
            description="Earnings before interest, taxes, depreciation and amortization"
            amount={ebitda}
            formatter={formatMoney}
            unit="€"
            styleTitle={{
              borderBottom: "1px solid black",
              backgroundColor: "#37d5d6",
              color: "white",
            }}
          />
          <GenericCard
            title="Accounts Receivable"
            description="Amount of money owed by customers for purchases made on credit"
            amount="300000"
            formatter={formatMoney}
            unit="€"
            styleTitle={{
              borderBottom: "1px solid black",
              backgroundColor: "#37d5d6",
              color: "white",
            }}
          />
          <GenericCard
            title="Accounts Payable"
            description="Amount of money owed to suppliers"
            amount="10000"
            formatter={formatMoney}
            unit="€"
            styleTitle={{
              borderBottom: "1px solid black",
              backgroundColor: "#37d5d6",
              color: "white",
            }}
          />
          <GenericCard
            title="Net Income"
            description="Amount of profit "
            amount={netIncome}
            formatter={formatMoney}
            unit="€"
            styleTitle={{
              borderBottom: "1px solid black",
              backgroundColor: "#37d5d6",
              color: "white",
            }}
          />
        </section>
        <RevenueVsCost />

        <section className="listingInfo">
          <GenericListing
            title="Balance sheet"
            data={[
              { label: "Cash", description: "+6600" },
              { label: "Accounts Receivable", description: "+6200" },
              { label: "Tools and Equipment", description: "+25000" },
              { label: "Notes Payable", description: "-5000" },
              { label: "Accounts Payable", description: "-25000" },
            ]}
            style={{ width: "25%", backgroundColor: "white" }}
            itemStyle={{ borderTop: "1px solid black" }}
          />

          <GenericListing
            title="Income statement"
            data={[
              { label: "Revenue", description: "+21186" },
              { label: "Cost of sales", description: "-11745" },
              { label: "Operating expenses", description: "-4172" },
              { label: "Interest income", description: "+12" },
              { label: "Interest expense", description: "-799" },
              { label: "Income tax expense", description: "-1789" },
              { label: "Profit for the year", description: "2486" },
            ]}
            style={{ width: "25%", backgroundColor: "white" }}
            itemStyle={{ borderTop: "1px solid black" }}
          />
        </section>
      </div>
    </div>
  );
};

export default Index;
