const moment = require('moment');
const processSuppliers = require('./processSuppliers');

/**
 *
 * @param {*} orders
 * @param {*} supplier
 * @param {*} year
 * returns an object with the total price spent in purchases and the total number
 * of orders
 */
const totalPurchases = (invoices, supplier, year) => {
  if (invoices) {
    const validOrders = invoices.filter(
      (invoice) =>
        invoice.sellerSupplierParty === supplier &&
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

const purchasesByMonth = (invoices, supplier, year) => {
  let unitsPurchsed = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  if (invoices) {
    const validOrders = invoices.filter(
      (invoice) =>
        invoice.sellerSupplierParty === supplier &&
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

const getPurchasesBacklog = (orders, invoices, id) => {
  let purchasesBacklog = {};
  let counter = 0;
  orders
    .filter(
      (order) => order.sellerSupplierParty === id && order.isDeleted == false
    )
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
    .forEach(({ naturalKey, documentDate, documentLines, payableAmount }) => {
      purchasesBacklog[counter] = {
        reference: naturalKey,
        date: documentDate.substr(0, 10),
        units: documentLines.reduce(
          (acc, current) => acc + current.quantity,
          0
        ),
        value: payableAmount.amount,
      };

      counter++;
    });

  return Object.keys(purchasesBacklog).map((order) => purchasesBacklog[order]);
};

module.exports = (server, cache) => {
  server.get('/api/suppliers/:year', (req, res) => {
    const { year } = req.params;
    const options = {
      method: 'GET',
      url: `${global.basePrimaveraUrl}/purchases/orders`,
    };

    const key = 'suppliers' + year;
    const cachedSuppliers = cache.get(key);
    if (cachedSuppliers == undefined) {
      return global.request(options, function (error, response, body) {
        if (error) res.json(error);
        const suppliers = processSuppliers(null, JSON.parse(body), year);
        cache.set(key, suppliers, 3600);
        res.json(suppliers);
      });
    } else {
      console.log('hit');
      return res.json(cachedSuppliers);
    }
  });

  /**
   * get information related to a supplier
   */
  server.get('/api/suppliers/identifier/:id', (req, res) => {
    const { id } = req.params;
    const options = {
      method: 'GET',
      url: `${global.basePrimaveraUrl}/purchasesCore/supplierParties/${id}`,
    };

    const key = 'supplier' + id;
    const cachedSupplier = cache.get(key);
    if (cachedSupplier == undefined) {
      return global.request(options, function (error, _response, body) {
        if (error) res.json(error);
        const information = JSON.parse(body);
        cache.set(key, information, 3600);
        res.json(information);
      });
    } else {
      return res.json(cachedSupplier);
    }
  });

  server.get('/api/suppliers/:id/purchases/:year', (req, res) => {
    const { id, year } = req.params;
    const monthly = req.query.monthly === 'true';

    const options = {
      method: 'GET',
      url: `${global.basePrimaveraUrl}/invoiceReceipt/invoices`,
    };

    const key = 'supplier' + id + 'purchases' + year;
    const cachedSupplier = cache.get(key);
    if (cachedSupplier == undefined) {
      return global.request(options, function (error, _response, body) {
        if (error) res.json(error);

        let purchases;
        if (monthly) {
          purchases = purchasesByMonth(JSON.parse(body), id, year);
        } else {
          purchases = totalPurchases(JSON.parse(body), id, year);
        }
        cache.set(key, purchases, 3600);
        res.json(purchases);
      });
    } else {
      return res.json(cachedSupplier);
    }
  });

  server.get('/api/suppliers/:id/purchases-orders/:year', (req, res) => {
    const { id, year } = req.params;
    const monthly = req.query.monthly === 'true';

    const options = {
      method: 'GET',
      url: `${global.basePrimaveraUrl}/purchases/orders`,
    };

    return global.request(options, function (error, _response, body) {
      if (error) res.json(error);
      let orders;
      if (monthly) {
        orders = purchasesByMonth(JSON.parse(body), id, year);
      } else {
        orders = totalPurchases(JSON.parse(body), id, year);
      }
      res.json(orders);
    });
  });

  server.get('/api/suppliers/:id/pending-purchases', (req, res) => {
    const { id } = req.params;

    const options_purchases = {
      method: 'GET',
      url: `${global.basePrimaveraUrl}/purchases/orders`,
    };

    const options_invoices = {
      method: 'GET',
      url: `${global.basePrimaveraUrl}/invoiceReceipt/invoices`,
    };

    const key = 'supplier' + id + 'pending';
    const cachedSupplier = cache.get(key);
    if (cachedSupplier == undefined) {
      return global.request(
        options_purchases,
        function (errorSales, response, bodySales) {
          if (errorSales) res.json(errorSales);
          return global.request(
            options_invoices,
            function (errorInvoices, response, bodyInvoices) {
              if (errorInvoices) res.json(errorInvoices);
              {
                const backlog = getPurchasesBacklog(
                  JSON.parse(bodySales),
                  JSON.parse(bodyInvoices),
                  id
                );
                cache.set(key, backlog, 3600);
                res.json(backlog);
              }
            }
          );
        }
      );
    } else {
      return res.json(cachedSupplier);
    }
  });
};
