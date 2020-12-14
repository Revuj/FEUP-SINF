const moment = require('moment');
const cache = require('node-cache');

const processMonthlySales = (invoices, year) => {
  let monthlyCumulativeValue = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  invoices
    .filter(
      (invoice) =>
        moment(invoice.documentDate).year() == parseInt(year, 10) &&
        invoice.isDeleted == false
    )
    .forEach(({ documentDate, taxExclusiveAmount }) => {
      const month = moment(documentDate).month();
      // monthlyCumulativeValue[month] += payableAmount.amount;
      monthlyCumulativeValue[month] += taxExclusiveAmount.amount;
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
          if (order.naturalKey === docLine.sourceDoc) {
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
        taxExclusiveAmount,
      }) => {
        salesBacklog[counter] = {
          date: documentDate.substr(0, 10),
          customer: buyerCustomerPartyName,
          items: '',
          value: Number(taxExclusiveAmount.amount),
        };

        documentLines.forEach((item) => {
          salesBacklog[counter].items +=
            item.quantity + 'x ' + item.description + ';  ';
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
          if (order.naturalKey === docLine.sourceDoc) {
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
    .reduce((acc, invoice) => acc + invoice.payableAmount.amount, 0);
};

const processCogs = (entries, year) => {
  let temp = entries.filter(
    (entry) => entry.year == year && entry.accountType.indexOf('61') == 0
  );
  const total = temp.reduce((acc, entry) => acc + entry.amount, 0);
  return total;
};

module.exports = (server, db, cache) => {
  // monthly sales by year
  server.get('/api/sales/:year([0-9]+)', (req, res) => {
    const { year } = req.params;

    const key = 'sales' + year;
    const cached = cache.get(key);
    if (cached == undefined) {
      const options = {
        method: 'GET',
        url: `${global.basePrimaveraUrl}/billing/invoices`,
      };

      return global.request(options, function (error, response, body) {
        if (error) res.json(error);
        const sales_year = processMonthlySales(JSON.parse(body), year);
        cache.set(key, sales_year, 3600);
        res.json(sales_year);
      });
    }

    res.json(cached);
  });

  server.get('/api/sales/debt-customers', (req, res) => {
    const key = 'accountsPayable';
    const cached = cache.get(key);

    if (cached == undefined) {
      let options = {
        method: 'GET',
        url: `${global.basePrimaveraUrl}/billing/invoices`,
      };

      return global.request(options, (error, response, body) => {
        if (error) res.json(error);
        const acc_payable = processDebtCustomers(JSON.parse(body));
        cache.set(key, acc_payable, 3600);
        res.json(acc_payable);
      });
    }

    res.json(cached);
  });

  // net sales
  server.get('/api/sales/net/:year', (req, res) => {
    const { year } = req.params;
    const options = {
      method: 'GET',
      url: `${global.basePrimaveraUrl}/billing/invoices`,
    };

    const key = 'net_sales' + year;
    const cachedNetSales = cache.get(key);
    if (cachedNetSales == undefined) {
      return global.request(options, function (error, response, body) {
        if (error) res.json(error);
        const netSales = getNetSales(JSON.parse(body), year);
        cache.set(key, netSales, 3600);
        res.json(netSales);
      });
    } else {
      res.json(cachedNetSales);
    }
  });

  // sales products
  server.get('/api/sales/products/:year([0-9]+)', (req, res) => {
    const { year } = req.params;

    const key = 'sales_products' + year;
    const cachedSalesProducts = cache.get(key);
    if (cachedSalesProducts == undefined) {
      const options = {
        method: 'GET',
        url: `${global.basePrimaveraUrl}/billing/invoices `,
      };

      return global.request(options, function (error, response, body) {
        if (error) res.json(error);
        const sales_products = processSales(JSON.parse(body), year);
        cache.set(key, sales_products, 3600);
        res.json(sales_products);
      });
    }

    res.json(cachedSalesProducts);
  });

  // backlog table
  server.get('/api/sales/backlogProducts', (req, res) => {
    const key = 'backlog_products';
    const cached = cache.get(key);
    if (cached == undefined) {
      const options_sales = {
        method: 'GET',
        url: `${global.basePrimaveraUrl}/sales/orders`,
      };

      const options_invoices = {
        method: 'GET',
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
              const backlog_products = processSalesBacklog(
                JSON.parse(bodySales),
                JSON.parse(bodyInvoices)
              );
              cache.set(key, backlog_products, 3600);
              res.json(backlog_products);
            }
          );
        }
      );
    }
    res.json(cached);
  });

  // backlog value
  server.get('/api/sales/backlog', (req, res) => {
    const key = 'sales_backlog';
    const cached = cache.get(key);
    if (cached == undefined) {
      const options_sales = {
        method: 'GET',
        url: `${global.basePrimaveraUrl}/sales/orders`,
      };

      const options_invoices = {
        method: 'GET',
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

              const backlog = getSalesBacklog(
                JSON.parse(bodySales),
                JSON.parse(bodyInvoices)
              );

              cache.set(key, backlog, 3600);

              res.json(backlog);
            }
          );
        }
      );
    }

    res.json(cached);
  });

  server.get('/api/sales/cogs/:year', (req, res) => {
    const { year } = req.params;
    const accounts = {
      method: 'GET',
      url: `${global.basePrimaveraUrl}/financialCore/accountingEntries/getAccountingSummaries?startDate=1-1-${year}&endDate=31-12-${year}`,
    };

    const key = 'cogs' + year;
    const cached = cache.get(key);

    if (cached == undefined) {
      return global.request(accounts, function (error, response, body) {
        if (error) res.json(error);
        const cogs = processCogs(JSON.parse(body), year);
        cache.set(key, cogs, 3600);
        res.json(cogs);
      });
    }
    res.json(cached);
  });
};
