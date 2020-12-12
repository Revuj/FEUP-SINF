const moment = require("moment");

const calculateStockNumber = (productInfo) => {
  //console.log(productInfo.materialsItemWarehouses[0]);
  return productInfo.materialsItemWarehouses.reduce(
    (total, currentProduct) => total + currentProduct.stockBalance,
    0
  );
};

const calculateAvgPrice = (productSaleInfo) => {
  return (
    productSaleInfo.priceListLines.reduce(
      (total, currentSell) => total + currentSell.priceAmount.amount,
      0
    ) / productSaleInfo.priceListLines.length
  );
};

const calculateAvgCost = (orders, id) => {
  let avgCost = 0;
  let number_orders = 0;

  orders
    .filter((order) => order.isDeleted == false)
    .forEach(({ documentLines }) => {
      documentLines.forEach((line) => {
        if (line.purchasesItem === id) {
          avgCost += line.unitPrice.amount;
          number_orders++;
        }
      });
    });

  return avgCost / number_orders;
};

const processUnits = (invoices, id, year, party) => {
  let units = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  let value = 0;

  if (invoices) {
    const validInvoices = invoices.filter(
      (invoice) =>
        moment(invoice.documentDate).year() == year &&
        invoice.isDeleted == false
    );

    validInvoices.map((invoice) => {
      let month = moment(invoice.documentDate).month();
      invoice.documentLines.forEach((line) => {
        if (line[party] == id) {
          units[month] += line.quantity;
          value +=
            party == "purchasesItem"
              ? line.lineExtensionAmount.amount
              : line.quantity * line.unitPrice.amount;
        }
      });
    });
  }

  return { units, value };
};

const processCustomers = (invoices, id, year) => {
  const customers = {};
  if (invoices) {
    invoices
      .filter(
        (invoice) =>
          moment(invoice.documentDate).year() == year &&
          invoice.isDeleted == false
      )
      .forEach((invoice) => {
        invoice.documentLines
          .filter((line) => (id ? line.salesItem === id : true))
          .forEach((lineParsed) => {
            if (customers[invoice.buyerCustomerParty]) {
              customers[invoice.buyerCustomerParty].units += Number(
                lineParsed.quantity
              );
              customers[invoice.buyerCustomerParty].value += Number(
                lineParsed.quantity * lineParsed.unitPrice.amount
              );
            } else {
              customers[invoice.buyerCustomerParty] = {
                id: invoice.buyerCustomerParty,
                name: invoice.buyerCustomerPartyName,
                value:
                  Number(lineParsed.quantity) *
                  Number(lineParsed.unitPrice.amount),
                units: Number(lineParsed.quantity),
              };
            }
          });
      });
  }

  return Object.keys(customers).map((customer) => customers[customer]);
};

const processSuppliers = (invoices, id, year) => {
  const customers = {};
  if (invoices) {
    invoices
      .filter(
        (invoice) =>
          moment(invoice.documentDate).year() == year &&
          invoice.isDeleted == false
      )
      .forEach((invoice) => {
        invoice.documentLines
          .filter((line) => (id ? line.purchasesItem === id : true))
          .forEach((lineParsed) => {
            if (customers[invoice.sellerSupplierParty]) {
              customers[invoice.sellerSupplierParty].units += Number(
                lineParsed.quantity
              );
              customers[invoice.sellerSupplierParty].value += Number(
                lineParsed.lineExtensionAmount.amount
              );
            } else {
              customers[invoice.sellerSupplierParty] = {
                id: invoice.sellerSupplierParty,
                name: invoice.sellerSupplierPartyName,
                value: Number(lineParsed.lineExtensionAmount.amount),
                units: Number(lineParsed.quantity),
              };
            }
          });
      });
  }

  return Object.keys(customers).map((customer) => customers[customer]);
};

module.exports = (server, db) => {
  server.get("/api/products/:id", (req, res) => {
    const { id } = req.params;

    const options = {
      method: "GET",
      url: `${global.basePrimaveraUrl}/materialsCore/materialsItems/${id}`,
    };

    return global.request(options, function (error, response, body) {
      if (error) res.json(error);
      if (!JSON.parse(body).message) {
        res.json(JSON.parse(body));
      }
    });
  });

  server.get("/api/products/:id/units-sold/:year", (req, res) => {
    const { id, year } = req.params;

    const options = {
      method: "GET",
      url: `${global.basePrimaveraUrl}/billing/invoices`,
    };

    return global.request(options, function (error, _response, body) {
      if (error) res.json(error);

      const unitsSold = processUnits(JSON.parse(body), id, year, "salesItem");
      return res.json(unitsSold);
    });
  });

  server.get("/api/products/:id/units-purchased/:year", (req, res) => {
    const { id, year } = req.params;

    const options = {
      method: "GET",
      url: `${global.basePrimaveraUrl}/invoiceReceipt/invoices`,
    };

    return global.request(options, function (error, _response, body) {
      if (error) res.json(error);

      const unitsPurchased = processUnits(
        JSON.parse(body),
        id,
        year,
        "purchasesItem"
      );
      return res.json(unitsPurchased);
    });
  });

  server.get("/api/products/:id/stock-units", (req, res) => {
    const { id } = req.params;
    const options = {
      method: "GET",
      url: `${global.basePrimaveraUrl}/materialsCore/materialsItems/${id}`,
    };

    return global.request(options, function (error, response, body) {
      if (error) res.json(error);
      if (!JSON.parse(body).message) {
        res.json({ totalStock: calculateStockNumber(JSON.parse(body)) });
      }
    });
  });

  server.get("/api/products/:id/avg-price", (req, res) => {
    const { id } = req.params;
    const options = {
      method: "GET",
      url: `${global.basePrimaveraUrl}/salescore/salesitems/${id}`,
    };

    return global.request(options, function (error, response, body) {
      if (error) res.json(error);
      if (!JSON.parse(body).message) {
        res.json({ avg: calculateAvgPrice(JSON.parse(body)) });
      } else {
        res.json({ avg: 0 });
      }
    });
  });

  server.get("/api/products/:id/avg-cost", (req, res) => {
    const { id } = req.params;
    const options = {
      method: "GET",
      url: `${global.basePrimaveraUrl}/invoiceReceipt/invoices`,
    };

    return global.request(options, function (error, response, body) {
      if (error) res.json({ avg: 0 });
      if (!JSON.parse(body).message) {
        res.json({ avg: calculateAvgCost(JSON.parse(body), id) });
      }
    });
  });

  server.get("/api/products/:id/suppliers/:year", (req, res) => {
    const { id, year } = req.params;
    const options = {
      method: "GET",
      url: `${global.basePrimaveraUrl}/invoiceReceipt/invoices`,
    };
    console.log(year);
    return global.request(options, function (error, response, body) {
      if (error) res.json(error);
      res.json(processSuppliers(JSON.parse(body), id, year));
    });
  });

  server.get("/api/products/:id/customers/:year", (req, res) => {
    const { id, year } = req.params;
    const options = {
      method: "GET",
      url: `${global.basePrimaveraUrl}/billing/invoices`,
    };

    console.log(year);
    return global.request(options, function (error, response, body) {
      if (error) res.json(error);
      res.json(processCustomers(JSON.parse(body), id, year));
    });
  });
};
