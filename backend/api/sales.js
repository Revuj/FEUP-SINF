const moment = require("moment");

const processMonthlySales = (invoices, year) => {
  let monthlyCumulativeValue = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  invoices
    .filter(
      (invoice) =>
        moment(invoice.documentDate).year() == parseInt(year, 10) &&
        invoice.isDeleted == false
    )
    .forEach(({ documentDate, grossValue }) => {
      const month = moment(documentDate).month();
      // monthlyCumulativeValue[month] += payableAmount.amount;
      monthlyCumulativeValue[month] += grossValue.amount;
    });

  return monthlyCumulativeValue;
};

const processSales = (invoices, year) => {
  let productSales = {};
  invoices
    .filter(
      (invoice) =>
        moment(invoice.documentDate).year() == year &&
        invoice.isDeleted == false
    )
    .forEach(({ documentLines }) => {
      documentLines.forEach((line) => {
        let salesItem = line.salesItem;
        let salesItemDescription = line.salesItemDescription;
        let quantity = line.quantity;
        let value = line.unitPrice.amount;
        if (productSales[salesItem]) {
          productSales[salesItem].quantity += quantity;
          productSales[salesItem].value += value * quantity;
        } else {
          productSales[salesItem] = {
            id: salesItem,
            name: salesItemDescription,
            value: quantity * value,
            quantity: quantity,
          };
        }
      });
    });

  return Object.keys(productSales).map((product) => productSales[product]);
};

const getNetSales = (invoices, year) => {
  return invoices
    .filter(
      (invoice) =>
        moment(invoice.documentDate).year() == year &&
        invoice.isDeleted == false
    )
    .reduce(
      (current, invoice) => current + invoice.taxExclusiveAmount.amount,
      0
    );
};

const processSalesBacklog = (orders, invoices) => {
  let salesBacklog = {};
  let counter = 0;
  orders
    .filter((order) => order.isDeleted == false)
    .filter((order) => {
      for (const invoice of invoices) {
        for (const docLine of invoice.documentLines) {
          if (
            order.naturalKey === docLine.sourceDoc &&
            docLine.documentLineStatus === 2
          ) {
            return false;
          }
        }
      }
      return true;
    })
    .forEach(
      ({
        buyerCustomerPartyName,
        documentDate,
        documentLines,
        payableAmount,
      }) => {
        salesBacklog[counter] = {
          date: documentDate.substr(0, 10),
          customer: buyerCustomerPartyName,
          items: "",
          value: Number(payableAmount.amount),
        };

        documentLines.forEach((item) => {
          salesBacklog[counter].items +=
            item.quantity + "x " + item.description + ";  ";
        });

        counter++;
      }
    );

  return Object.keys(salesBacklog).map((order) => salesBacklog[order]);
};

const getSalesBacklog = (orders, invoices) => {
  let salesBacklog = 0;
  orders
    .filter((order) => order.isDeleted == false)
    .filter((order) => {
      for (const invoice of invoices) {
        for (const docLine of invoice.documentLines) {
          if (
            order.naturalKey === docLine.sourceDoc &&
            docLine.documentLineStatus === 2
          ) {
            return false;
          }
        }
      }
      return true;
    })
    .forEach(({ taxExclusiveAmount }) => {
      salesBacklog += taxExclusiveAmount.amount;
    });

  return salesBacklog;
};

const processDebtCustomers = (invoices) => {
  let temp = invoices.filter((invoice) => invoice.isDeleted == false);
  if (!Array.isArray(temp)) temp = [temp];

  return temp
    .filter(({ documentStatus }) => documentStatus === 1)
    .reduce((acc, invoice) => acc + invoice.taxExclusiveAmount.amount, 0);
};

module.exports = (server, db, client) => {
  // monthly sales by year
  server.get("/api/sales/:year([0-9]+)", (req, res) => {
    const { year } = req.params;
    const options = {
      method: "GET",
      url: `${global.basePrimaveraUrl}/billing/invoices`,
    };

    return global.request(options, function (error, response, body) {
      if (error) res.json(error);
      res.json(processMonthlySales(JSON.parse(body), year));
    });
  });

  server.get("/api/sales/debt-customers", (req, res) => {
    let options = {
      method: "GET",
      url: `${global.basePrimaveraUrl}/billing/invoices`,
    };

    return global.request(options, (error, response, body) => {
      if (error) res.json(error);
      res.json(processDebtCustomers(JSON.parse(body)));
    });
  });

  // net sales
  server.get("/api/sales/net/:year", (req, res) => {
    const { year } = req.params;
    const options = {
      method: "GET",
      url: `${global.basePrimaveraUrl}/billing/invoices`,
    };

    const key = 'net_sales' + year;
    try {
       client.get(key, async (err, payload) => {
        // return res.status(200).json(JSON.parse(payload));

        if (payload != null) {
          console.log("Sent " + payload);
          return res.json(
           JSON.parse(payload)
          )
          
        }
        return global.request(options, function (error, response, body) {
          if (error) res.json(error);
          const netSales=getNetSales(JSON.parse(body), year);
          client.setex(key, 1440, JSON.stringify(netSales));
          res.json(netSales);
        });
          
    });
  } catch(error) {
    console.log(error);
  }

  });

  // sales products
  server.get("/api/sales/products/:year([0-9]+)", (req, res) => {
    const { year } = req.params;

    const options = {
      method: "GET",
      url: `${global.basePrimaveraUrl}/billing/invoices `,
    };

    return global.request(options, function (error, response, body) {
      if (error) res.json(error);
      res.json(processSales(JSON.parse(body), year));
    });
  });

  // backlog table
  server.get("/api/sales/backlogProducts", (req, res) => {
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
                JSON.parse(bodyInvoices)
              )
            );
          }
        );
      }
    );
  });

  // backlog value
  server.get("/api/sales/backlog", (req, res) => {
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
              getSalesBacklog(JSON.parse(bodySales), JSON.parse(bodyInvoices))
            );
          }
        );
      }
    );
  });
};
