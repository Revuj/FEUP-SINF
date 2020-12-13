const moment = require('moment');

const processPurchases = (orders, year) => {
  let monthlyCumulativeValue = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  orders
    .filter(
      (order) =>
        moment(order.documentDate).year() == year && order.isDeleted == false
    )
    .forEach(({ documentDate, taxExclusiveAmount }) => {
      const month = moment(documentDate).month();

      monthlyCumulativeValue[month] += taxExclusiveAmount.amount;
    });

  return monthlyCumulativeValue;
};

const getPurchasesBacklog = (orders, invoices) => {
  let purchasesBacklog = 0;
  orders
    .filter((order) => order.isDeleted == false)
    .filter((order) => {
      for (const invoice of invoices) {
        for (const docLine of invoice.documentLines) {
          if (order.naturalKey === docLine.sourceDoc) {
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
  let temp = invoices.filter((invoice) => invoice.isDeleted == false);
  if (!Array.isArray(temp)) temp = [temp];

  return temp
    .filter(({ documentStatus }) => documentStatus === 1)
    .reduce((acc, invoice) => acc + invoice.payableAmount.amount, 0);
};

const processPurchasesProducts = (invoices, year) => {
  let productPurchases = {};
  invoices
    .filter(
      (invoice) =>
        moment(invoice.documentDate).year() == year &&
        invoice.isDeleted == false
    )
    .forEach(({ documentLines }) => {
      documentLines.forEach((line) => {
        let purchasesItem = line.purchasesItem;
        let purchasesItemDescription = line.purchasesItemDescription;
        let quantity = line.quantity;
        let value = line.lineExtensionAmount.amount;
        if (productPurchases[purchasesItem]) {
          productPurchases[purchasesItem].quantity += quantity;
          productPurchases[purchasesItem].value += value;
        } else {
          productPurchases[purchasesItem] = {
            id: purchasesItem,
            name: purchasesItemDescription,
            value: value,
            quantity: quantity,
          };
        }
      });
    });

  return Object.keys(productPurchases).map(
    (product) => productPurchases[product]
  );
};

const processPurchasesBacklog = (orders, invoices) => {
  let purchasesBacklog = {};
  let counter = 0;
  orders
    .filter((order) => {
      for (const invoice of invoices) {
        for (const docLine of invoice.documentLines) {
          if (order.naturalKey === docLine.sourceDoc) {
            return false;
          }
        }
      }
      return true;
    })
    .forEach(
      ({
        sellerSupplierPartyName,
        documentDate,
        documentLines,
        payableAmount,
      }) => {
        purchasesBacklog[counter] = {
          date: documentDate.substr(0, 10),
          supplier: sellerSupplierPartyName,
          items: '',
          value: Number(payableAmount.amount),
        };

        documentLines.forEach((item) => {
          purchasesBacklog[counter].items +=
            item.quantity + 'x ' + item.description + ';  ';
        });

        counter++;
      }
    );

  return Object.keys(purchasesBacklog).map((order) => purchasesBacklog[order]);
};

module.exports = (server, cache) => {
  // backlog table
  server.get('/api/purchases/backlogProducts', (req, res) => {
    const options_purchases = {
      method: 'GET',
      url: `${global.basePrimaveraUrl}/purchases/orders`,
    };

    const options_invoices = {
      method: 'GET',
      url: `${global.basePrimaveraUrl}/invoiceReceipt/invoices`,
    };

    const key = 'backlogProducts';
    const cachedBacklogProducts = cache.get(key);
    if (cachedBacklogProducts == undefined) {
      return global.request(
        options_purchases,
        function (errorSales, response, bodyPurchases) {
          if (errorSales) res.json(errorSales);
          return global.request(
            options_invoices,
            function (errorInvoices, response, bodyInvoices) {
              if (errorInvoices) res.json(errorInvoices);
              const backlogProducts = processPurchasesBacklog(
                JSON.parse(bodyPurchases),
                JSON.parse(bodyInvoices)
              );
              cache.set(key, backlogProducts, 3600);
              res.json(backlogProducts);
            }
          );
        }
      );
    } else {
      return res.json(cachedBacklogProducts);
    }
  });

  server.get('/api/purchases/debt-suppliers', (req, res) => {
    let options = {
      method: 'GET',
      url: `${global.basePrimaveraUrl}/invoiceReceipt/invoices`,
    };

    const key = 'suppliersDebt';
    const cachedDebt = cache.get(key);
    if (cachedDebt == undefined) {
      return global.request(options, (error, response, body) => {
        if (error) res.json(error);
        const debt = processDebtToSuppliers(JSON.parse(body));
        cache.set(key, debt, 3600);
        res.json(debt);
      });
    } else {
      return res.json(cachedDebt);
    }
  });

  server.get('/api/purchases/products/:year([0-9]+)', (req, res) => {
    const { year } = req.params;

    const options = {
      method: 'GET',
      url: `${global.basePrimaveraUrl}/invoiceReceipt/invoices`,
    };

    const key = 'purchasesProducts' + year;
    const cachedPurchases = cache.get(key);
    if (cachedPurchases == undefined) {
      return global.request(options, function (error, response, body) {
        if (error) res.json(error);
        const purchases = processPurchasesProducts(JSON.parse(body), year);
        cache.set(key, purchases, 3600);
        res.json(purchases);
      });
    } else {
      return res.json(cachedPurchases);
    }
  });

  server.get('/api/purchases/:year', (req, res) => {
    const { year } = req.params;
    const options = {
      method: 'GET',
      url: `${global.basePrimaveraUrl}/invoiceReceipt/invoices`,
    };

    const key = 'purchases' + year;
    const cachedPurchases = cache.get(key);
    if (cachedPurchases == undefined) {
      return global.request(options, (error, response, body) => {
        if (error) res.json(error);

        if (!JSON.parse(body).message) {
          const purchases = processPurchases(JSON.parse(body), year);
          cache.set(key, purchases, 3600);
          res.json(purchases);
        }
      });
    } else {
      return res.json(cachedPurchases);
    }
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

    const key = 'purchasesBacklog';
    const cachedPurchasesBacklog = cache.get(key);
    if (cachedPurchasesBacklog == undefined) {
      return global.request(
        options_purchases,
        function (errorSales, response, bodySales) {
          if (errorSales) res.json(errorSales);
          return global.request(
            options_invoices,
            function (errorInvoices, response, bodyInvoices) {
              if (errorInvoices) res.json(errorInvoices);
              const purchasesBacklog = getPurchasesBacklog(
                JSON.parse(bodySales),
                JSON.parse(bodyInvoices)
              );
              cache.set(key, purchasesBacklog, 3600);
              res.json(purchasesBacklog);
            }
          );
        }
      );
    } else {
      return res.json(cachedPurchasesBacklog);
    }
  });
};
