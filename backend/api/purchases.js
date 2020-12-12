const moment = require('moment');

const processPurchases = (orders, year) => {
  let monthlyCumulativeValue = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  orders
    .filter((order) => moment(order.documentDate).year() == year)
    .forEach(({ documentDate, taxExclusiveAmount }) => {
      const month = moment(documentDate).month();

      monthlyCumulativeValue[month] += taxExclusiveAmount.amount;
    });

  return monthlyCumulativeValue;
};

const getPurchasesBacklog = (orders, invoices) => {
  let purchasesBacklog = 0;
  orders
    .filter((order) => {
      for (const invoice of invoices) {
        for (const docLine of invoice.documentLines) {
          if (
            order.naturalKey === docLine.sourceDoc &&
            invoice.documentStatus === 2
          ) {
            return false;
          }
        }
      }
      return true;
    })
    .forEach(({ payableAmount }) => {
      purchasesBacklog += payableAmount.amount;
    });

  return purchasesBacklog;
};

const processDebtToSuppliers = (invoices) => {
  let temp = invoices;
  if (!Array.isArray(temp)) temp = [temp];

  return temp
    .filter( ({documentStatus}) => documentStatus === 1)
    .reduce((acc, invoice) => acc + invoice.payableAmount.amount, 0);
}

module.exports = (server) => {
  server.get('/api/purchases/debt-suppliers', (req, res) => {
    let options = {
      method: 'GET',
      url: `${global.basePrimaveraUrl}/invoiceReceipt/invoices`,
    };

    return global.request(options, (error, response, body) => {
      if (error) res.json(error);
      res.json(processDebtToSuppliers(JSON.parse(body)));
     
    });
  });

  server.get('/api/purchases/:year', (req, res) => {
    const { year } = req.params;
    const options = {
      method: 'GET',
      url: `${global.basePrimaveraUrl}/invoiceReceipt/invoices`,
    };

    return global.request(options, (error, response, body) => {
      if (error) res.json(error);

      if (!JSON.parse(body).message) {
        res.json(processPurchases(JSON.parse(body), year));
      }
    });
  });

  server.get('/api/purchasesBacklog', (req, res) => {
    const options_purchases = {
      method: 'GET',
      url: `${global.basePrimaveraUrl}/purchases/orders`,
    };

    const options_invoices = {
      method: 'GET',
      url: `${global.basePrimaveraUrl}/invoiceReceipt/invoices`,
    };

    return global.request(
      options_purchases,
      function (errorSales, response, bodySales) {
        if (errorSales) res.json(errorSales);
        return global.request(
          options_invoices,
          function (errorInvoices, response, bodyInvoices) {
            if (errorInvoices) res.json(errorInvoices);
            res.json(
              getPurchasesBacklog(
                JSON.parse(bodySales),
                JSON.parse(bodyInvoices)
              )
            );
          }
        );
      }
    );
  });
};
