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

module.exports = (server, db, cache) => {
  server.get("/api/products/:id", (req, res) => {
    const { id } = req.params;

    const options = {
      method: "GET",
      url: `${global.basePrimaveraUrl}/materialsCore/materialsItems/${id}`,
    };

    const key = `product_${id}_id`;
    const cached = cache.get(key);
    if (cached == undefined) {
      return global.request(options, function (error, response, body) {
        if (error) res.json(error);
        if (!JSON.parse(body).message) {
          const product = JSON.parse(body);
          cache.set(key, product, 3600);
          res.json(JSON.parse(body));
        }
      });
    } else {
      res.json(cached);
    }
  });

  server.get("/api/products/:id/units-sold/:year", (req, res) => {
    const { id, year } = req.params;

    const options = {
      method: "GET",
      url: `${global.basePrimaveraUrl}/billing/invoices`,
    };

    const key = `product_${id}_units_sold_${year}`;
    const cached = cache.get(key);
    if (cached == undefined) {
      return global.request(options, function (error, _response, body) {
        if (error) res.json(error);

        const unitsSold = processUnits(JSON.parse(body), id, year, "salesItem");
        cache.set(key, unitsSold, 3600);
        return res.json(unitsSold);
      });
    } else {
      res.json(cached);
    }
  });

  server.get("/api/products/:id/units-purchased/:year", (req, res) => {
    const { id, year } = req.params;

    const options = {
      method: "GET",
      url: `${global.basePrimaveraUrl}/invoiceReceipt/invoices`,
    };

    const key = `product_${id}_units_purchased_${year}`;
    const cached = cache.get(key);
    if (cached == undefined) {
      return global.request(options, function (error, _response, body) {
        if (error) res.json(error);

        const unitsPurchased = processUnits(
          JSON.parse(body),
          id,
          year,
          "purchasesItem"
        );

        cache.set(key, unitsPurchased, 3600);
        return res.json(unitsPurchased);
      });
    } else {
      res.json(cached);
    }
  });

  server.get("/api/products/:id/stock-units", (req, res) => {
    const { id } = req.params;
    const options = {
      method: "GET",
      url: `${global.basePrimaveraUrl}/materialsCore/materialsItems/${id}`,
    };
    const key = `product_${id}_stock_units`;
    const cached = cache.get(key);
    if (cached == undefined) {
      return global.request(options, function (error, response, body) {
        if (error) res.json(error);
        if (!JSON.parse(body).message) {
          const stock = calculateStockNumber(JSON.parse(body));
          cache.set(key, stock, 3600);
          res.json({ totalStock: stock });
        }
      });
    } else {
      res.json({ totalStock: cached });
    }
  });

  server.get("/api/products/:id/avg-price", (req, res) => {
    const { id } = req.params;
    const options = {
      method: "GET",
      url: `${global.basePrimaveraUrl}/salescore/salesitems/${id}`,
    };

    const key = `product_${id}_avg_price`;
    const cached = cache.get(key);
    if (cached == undefined) {
      return global.request(options, function (error, response, body) {
        if (error) res.json(error);
        if (!JSON.parse(body).message) {
          const avg = calculateAvgPrice(JSON.parse(body));
          cache.set(key, avg, 3600);
          res.json({ avg: avg });
        } else {
          res.json({ avg: 0 });
        }
      });
    } else {
      res.json({ avg: cached });
    }
  });

  server.get("/api/products/:id/avg-cost", (req, res) => {
    const { id } = req.params;
    const options = {
      method: "GET",
      url: `${global.basePrimaveraUrl}/invoiceReceipt/invoices`,
    };

    const key = `product_${id}_avg_cost`;
    const cached = cache.get(key);
    if (cached == undefined) {
      return global.request(options, function (error, response, body) {
        if (error) res.json({ avg: 0 });
        if (!JSON.parse(body).message) {
          const avg = calculateAvgCost(JSON.parse(body), id);
          cache.set(key, avg, 3600);
          res.json({ avg: avg });
        }
      });
    } else {
      res.json({ avg: cached });
    }
  });

  server.get("/api/products/:id/suppliers/:year", (req, res) => {
    const { id, year } = req.params;
    const options = {
      method: "GET",
      url: `${global.basePrimaveraUrl}/invoiceReceipt/invoices`,
    };

    const key = `product_${id}_suppliers_${year}`;
    const cached = cache.get(key);
    if (cached == undefined) {
      return global.request(options, function (error, response, body) {
        if (error) res.json(error);
        const suppliers = processSuppliers(JSON.parse(body), id, year);
        cache.set(key, suppliers, 3600);
        res.json(suppliers);
      });
    } else {
      res.json(cached);
    }
  });

  server.get("/api/products/:id/customers/:year", (req, res) => {
    const { id, year } = req.params;
    const options = {
      method: "GET",
      url: `${global.basePrimaveraUrl}/billing/invoices`,
    };

    const key = `product_${id}_customers_${year}`;
    const cached = cache.get(key);
    if (cached == undefined) {
      return global.request(options, function (error, response, body) {
        if (error) res.json(error);
        const customers = processCustomers(JSON.parse(body), id, year);
        cache.set(key, customers, 3600);
        res.json(customers);
      });
    } else {
      res.json(cached);
    }
  });
};
