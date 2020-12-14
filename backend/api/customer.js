const processCustomers = require('./processCustomers');
const moment = require('moment');

const processCostumerPurchases = (invoices, costumerId) => {
  if (Array.isArray(invoices)) {
    return invoices
      .filter(
        ({ accountingParty, isDeleted }) =>
          accountingParty === costumerId && isDeleted == false
      )
      .reduce(
        (total, currentInvoice) =>
          total + currentInvoice.taxExclusiveAmount.amount,
        0
      );
  } else if (invoices.accountingParty === CustomerId) {
    return invoices.taxExclusiveAmount.amount;
  } else return {};
};

const totalSales = (invoices, customer, year) => {
  if (invoices) {
    const validOrders = invoices.filter(
      (invoice) =>
        invoice.buyerCustomerParty === customer &&
        moment(invoice.documentDate).year() == year &&
        invoice.isDeleted == false
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
      message: 'success',
      totalOrders: totalOrders.reduce((acc, curr) => acc + curr, 0),
    };
  }

  return { message: 'There was an error processing the orders' };
};

const salesByMonth = (invoices, customer, year) => {
  let unitsPurchsed = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  if (invoices) {
    const validOrders = invoices.filter(
      (invoice) =>
        invoice.buyerCustomerParty === customer &&
        moment(invoice.documentDate).year() == year &&
        invoice.isDeleted == false
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

  return { message: 'There was an error processing the orders' };
};

const processSalesBacklog = (orders, invoices, id) => {
  let salesBacklog = {};
  let counter = 0;
  orders
    .filter((order) => order.isDeleted == false)
    .filter((order) => {
      for (const invoice of invoices) {
        for (const docLine of invoice.documentLines) {
          if (
            order.naturalKey === docLine.sourceDoc ||
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

module.exports = (server, cache) => {
  server.get('/api/customers/:year', (req, res) => {
    const { year } = req.params;
    const options = {
      method: 'GET',
      url: `${global.basePrimaveraUrl}/billing/invoices`,
    };

    const key = `customer_${year}`;
    const cached = cache.get(key);
    if (cached == undefined) {
      return global.request(options, function (error, response, body) {
        if (error) res.json(error);
        const customers = processCustomers(null, JSON.parse(body), year);
        cache.set(key, customers, 3600);
        res.json(customers);
      });
    } else {
      res.json(cached);
    }
  });

  server.get('/api/customer/:id', (req, res) => {
    const { id } = req.params;
    const options = {
      method: 'GET',
      url: `${global.basePrimaveraUrl}/salesCore/customerParties/${id}`,
    };

    const key = `customer_id_${id}`;
    const cached = cache.get(key);
    if (cached == undefined) {
      return global.request(options, function (error, response, body) {
        if (error) throw new Error(error.message);
        const customer = JSON.parse(body);
        cache.set(key, customer, 3600);
        res.json(customer);
      });
    } else {
      res.json(cached);
    }
  });

  server.get('/api/customer/:id/purchases', (req, res) => {
    const { id } = req.params;
    const options = {
      method: 'GET',
      url: `${global.basePrimaveraUrl}/accountsReceivable/receipts`,
    };

    const key = `customer_purchases_${id}`;
    const cached = cache.get(key);
    if (cached == undefined) {
      return global.request(options, function (error, response, body) {
        if (error) res.json(error);
        const customer_purchases = processCostumerPurchases(
          JSON.parse(body),
          id
        );
        cache.set(key, customer_purchases, 3600);
        res.json(customer_purchases);
      });
    } else {
      res.json(cached);
    }
  });

  server.get('/api/customer/:id/sales/:year', (req, res) => {
    const { id, year } = req.params;
    const monthly = req.query.monthly === 'true';

    const options = {
      method: 'GET',
      url: `${global.basePrimaveraUrl}/billing/invoices`,
    };

    const key = `customer_sales_${id}_${year}_${monthly}`;
    const cached = cache.get(key);
    if (cached == undefined) {
      return global.request(options, function (error, _response, body) {
        if (error) res.json(error);

        let sales;
        if (monthly) {
          sales = salesByMonth(JSON.parse(body), id, year);
        } else {
          sales = totalSales(JSON.parse(body), id, year);
        }

        cache.set(key, sales, 3600);
        res.json(sales);
      });
    } else {
      res.json(cached);
    }
  });

  server.get('/api/customer/:id/sales-orders/:year', (req, res) => {
    const { id, year } = req.params;
    const monthly = req.query.monthly === 'true';

    const options = {
      method: 'GET',
      url: `${global.basePrimaveraUrl}/sales/orders`,
    };

    const key = `customer_sales_orders_${id}_${year}_${monthly}`;
    const cached = cache.get(key);
    if (cached == undefined) {
      return global.request(options, function (error, _response, body) {
        if (error) res.json(error);

        let sales;

        if (monthly) {
          sales = salesByMonth(JSON.parse(body), id, year);
        } else {
          sales = totalSales(JSON.parse(body), id, year);
        }

        cache.set(key, sales, 3600);
        res.json(sales);
      });
    } else {
      res.json(cached);
    }
  });

  server.get('/api/customer/:id/pending-sales', (req, res) => {
    const { id } = req.params;
    const options_sales = {
      method: 'GET',
      url: `${global.basePrimaveraUrl}/sales/orders`,
    };

    const options_invoices = {
      method: 'GET',
      url: `${global.basePrimaveraUrl}/billing/invoices`,
    };

    const key = `customer_pending_sales_${id}`;
    const cached = cache.get(key);
    if (cached == undefined) {
      return global.request(
        options_sales,
        function (errorSales, response, bodySales) {
          if (errorSales) res.json(errorSales);
          return global.request(
            options_invoices,
            function (errorInvoices, response, bodyInvoices) {
              if (errorInvoices) res.json(errorInvoices);

              const sales_backlog = processSalesBacklog(
                JSON.parse(bodySales),
                JSON.parse(bodyInvoices),
                id
              );

              cache.set(key, sales_backlog, 3600);
              res.json(sales_backlog);
            }
          );
        }
      );
    } else {
      res.json(cached);
    }
  });
};
