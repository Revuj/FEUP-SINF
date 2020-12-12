const processCustomers = require("./processCustomers");
const moment = require("moment");

const processCostumerPurchases = (invoices, costumerId) => {
  if (Array.isArray(invoices)) {
    return invoices
      .filter(({ accountingParty }) => accountingParty === costumerId)
      .reduce(
        (total, currentInvoice) => total + currentInvoice.grossValue.amount,
        0
      );
  } else if (invoices.accountingParty === CustomerId) {
    return invoices.grossValue.amount;
  } else return {};
};

const totalSales = (invoices, customer, year) => {
  if (invoices) {
    const validOrders = invoices.filter(
      (invoice) =>
        invoice.buyerCustomerParty === customer &&
        moment(invoice.documentDate).year() == year
    );

    const total = validOrders.reduce(
      (total, currentOrder) => total + currentOrder.taxExclusiveAmount.amount,
      0
    );

    const totalOrders = validOrders.map((invoice) => {
      return invoice.documentLines.reduce(
        (acc, curr) => acc + curr.quantity,
        0
      );
    });
    return {
      totalPrice: total,
      message: "success",
      totalOrders: totalOrders.reduce((acc, curr) => acc + curr, 0),
    };
  }

  return { message: "There was an error processing the orders" };
};

const salesByMonth = (invoices, customer, year) => {
  let unitsPurchsed = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  if (invoices) {
    const validOrders = invoices.filter(
      (invoice) =>
        invoice.buyerCustomerParty === customer &&
        moment(invoice.documentDate).year() == year
    );

    validOrders.map((invoice) => {
      let month = moment(invoice.documentDate).month();
      unitsPurchsed[month] += invoice.documentLines.reduce(
        (acc, curr) => acc + curr.quantity,
        0
      );
    });
    return unitsPurchsed;
  }

  return { message: "There was an error processing the orders" };
};

const processSalesBacklog = (orders, invoices, id) => {
  let salesBacklog = {};
  let counter = 0;
  orders
    .filter((order) => {
      for (const invoice of invoices) {
        for (const docLine of invoice.documentLines) {
          if (
            (order.naturalKey === docLine.sourceDoc &&
              docLine.documentLineStatus === 2) ||
            order.buyerCustomerParty != id
          ) {
            return false;
          }
        }
      }
      return true;
    })
    .forEach(
      ({ naturalKey, documentDate, documentLines, taxExclusiveAmount }) => {
        salesBacklog[counter] = {
          reference: naturalKey,
          date: documentDate.substr(0, 10),
          units: documentLines.reduce(
            (acc, current) => acc + current.quantity,
            0
          ),
          value: taxExclusiveAmount.amount,
        };

        counter++;
      }
    );

  return Object.keys(salesBacklog).map((order) => salesBacklog[order]);
};

module.exports = (server) => {
  server.get("/api/customers/:year", (req, res) => {
    const { year } = req.params;
    const options = {
      method: "GET",
      url: `${global.basePrimaveraUrl}/billing/invoices`,
    };

    return global.request(options, function (error, response, body) {
      if (error) res.json(error);
      res.json(processCustomers(null, JSON.parse(body), year));
    });
  });

  server.get("/api/customer/:id", (req, res) => {
    const { id } = req.params;
    const options = {
      method: "GET",
      url: `${global.basePrimaveraUrl}/salesCore/customerParties/${id}`,
    };

    return global.request(options, function (error, response, body) {
      if (error) throw new Error(error.message);
      res.json(JSON.parse(body));
    });
  });

  server.get("/api/customer/:id/purchases", (req, res) => {
    const { id } = req.params;
    const options = {
      method: "GET",
      url: `${global.basePrimaveraUrl}/accountsReceivable/receipts`,
    };

    return global.request(options, function (error, response, body) {
      if (error) res.json(error);
      res.json(processCostumerPurchases(JSON.parse(body), id));
    });
  });

  server.get("/api/customer/:id/sales/:year", (req, res) => {
    const { id, year } = req.params;
    const monthly = req.query.monthly === "true";

    const options = {
      method: "GET",
      url: `${global.basePrimaveraUrl}/billing/invoices`,
    };

    return global.request(options, function (error, _response, body) {
      if (error) res.json(error);

      if (monthly) {
        res.json(salesByMonth(JSON.parse(body), id, year));
      } else {
        res.json(totalSales(JSON.parse(body), id, year));
      }
    });
  });

  server.get("/api/customer/:id/sales-orders/:year", (req, res) => {
    const { id, year } = req.params;
    const monthly = req.query.monthly === "true";

    const options = {
      method: "GET",
      url: `${global.basePrimaveraUrl}/sales/orders`,
    };

    return global.request(options, function (error, _response, body) {
      if (error) res.json(error);

      if (monthly) {
        res.json(salesByMonth(JSON.parse(body), id, year));
      } else {
        res.json(totalSales(JSON.parse(body), id, year));
      }
    });
  });

  server.get("/api/customer/:id/pending-sales", (req, res) => {
    const { id } = req.params;
    const options_sales = {
      method: "GET",
      url: `${global.basePrimaveraUrl}/sales/orders`,
    };

    const options_invoices = {
      method: "GET",
      url: `${global.basePrimaveraUrl}/billing/invoices`,
    };

    return global.request(
      options_sales,
      function (errorSales, response, bodySales) {
        if (errorSales) res.json(errorSales);
        return global.request(
          options_invoices,
          function (errorInvoices, response, bodyInvoices) {
            if (errorInvoices) res.json(errorInvoices);
            res.json(
              processSalesBacklog(
                JSON.parse(bodySales),
                JSON.parse(bodyInvoices),
                id
              )
            );
          }
        );
      }
    );
  });
};
