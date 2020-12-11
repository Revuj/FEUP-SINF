const processSuppliers = require("./processSuppliers");
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

  orders.forEach(({ documentLines }) => {
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
      (invoice) => moment(invoice.documentDate).year() == year
    );

    validInvoices.map((invoice) => {
      let month = moment(invoice.documentDate).month();
      invoice.documentLines.forEach((line) => {
        if (line[party] == id) {
          units[month] += line.quantity;
          value += line.quantity * line.unitPrice.amount;
        }
      });
    });
  }

  return { units, value };
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
      }
    });
  });

  server.get("/api/products/:id/avg-cost", (req, res) => {
    const { id } = req.params;
    const options = {
      method: "GET",
      url: `${global.basePrimaveraUrl}/purchases/orders`,
    };

    return global.request(options, function (error, response, body) {
      if (error) res.json(error);
      if (!JSON.parse(body).message) {
        res.json({ avg: calculateAvgCost(JSON.parse(body), id) });
      }
    });
  });

  /**
   * todo [year]
   */
  server.get("/api/products/:id/suppliers", (req, res) => {
    const { id } = req.params;
    const options = {
      method: "GET",
      url: `${global.basePrimaveraUrl}/purchases/orders`,
    };
    const year = 2020;
    console.log(year);
    return global.request(options, function (error, response, body) {
      if (error) res.json(error);
      res.json(processSuppliers(id, JSON.parse(body), year));
    });
  });
};
