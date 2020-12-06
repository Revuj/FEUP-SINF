const moment = require('moment');

const processMonthlySales = (receipts, year) => {
  let monthlyCumulativeValue = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  receipts
    .filter((receipt) => moment(receipt.documentDate).year() == year)
    .forEach(({ documentDate, payableAmount }) => {
      const month = moment(documentDate).month();

      monthlyCumulativeValue[month] += payableAmount.amount;
    });

  return monthlyCumulativeValue;
};

const processSales = (invoices, year) => {
  productSales = {}
  invoices
    .filter((invoice) => moment(invoice.documentDate).year() == year && invoice.documentStatus == 2)
    .forEach(({ documentLines, payableAmount }) => {
      let salesItem = documentLines[0].salesItem;
      let salesItemDescription = documentLines[0].salesItemDescription;
      let quantity = documentLines[0].quantity;
      if (productSales[salesItem]) {
        productSales[salesItem].value += Number(payableAmount.amount);
        productSales[salesItem].quantity += Number(quantity);
      } else {
        productSales[salesItem] = {
          id: salesItem,
          name: salesItemDescription,
          value: payableAmount.amount,
          quantity: quantity
        }
      }
    });

  return Object.keys(productSales).map(product => productSales[product]);
}

const getNetSales = (receipts, year) => {
  let netSales = 0;

  receipts
    .filter((receipt) => moment(receipt.documentDate).year() == year)
    .forEach(({ payableAmount }) => {
      netSales += payableAmount.amount;
    });

  return netSales;
};

const processOrders = orders => {
  let salesBacklog = {}
  let counter = 0;
  orders
    .filter((order) => moment(order.documentDate).isAfter(moment())) //mudar no futuro
    .forEach(({ buyerCustomerPartyName, documentDate, documentLines, payableAmount }) => {

      salesBacklog[counter] = {
        date: documentDate.substr(0, 10),
        customer: buyerCustomerPartyName,
        items: '',
        value: Number(payableAmount.amount)
      }

      documentLines.forEach(item => {
        salesBacklog[counter].items += item.quantity + 'x ' + item.description + ';  ';
      })

      counter++;
    });

  return Object.keys(salesBacklog).map(order => salesBacklog[order]);
}

const getSalesBacklog = orders => {
  let salesBacklog = 0;
  orders
    .filter((order) => moment(order.documentDate).isAfter(moment())) //mudar no futuro
    .forEach(({ payableAmount }) => {
      salesBacklog += payableAmount.amount;
    });

  return salesBacklog;
}


module.exports = (server, db) => {
  // monthly sales by year
  server.get('/api/sales/:year([0-9]+)', (req, res) => {
    const { year } = req.params;
    const options = {
      method: 'GET',
      url: `${global.basePrimaveraUrl}/accountsReceivable/receipts`
    };

    return global.request(options, function (error, response, body) {
      if (error) res.json(error);
      res.json(processMonthlySales(JSON.parse(body), year));
    });
  });

  // net sales
  server.get('/api/sales/net/:year', (req, res) => {
    const { year } = req.params;
    const options = {
      method: 'GET',
      url: `${global.basePrimaveraUrl}/accountsReceivable/receipts`
    };

    return global.request(options, function (error, response, body) {
      if (error) res.json(error);
      res.json(getNetSales(JSON.parse(body), year));
    });
  });


  // sales products
  server.get('/api/sales/products/:year([0-9]+)', (req, res) => {
    const { year } = req.params;

    const options = {
      method: 'GET',
      url: `${global.basePrimaveraUrl}/billing/invoices `
    };

    return global.request(options, function (error, response, body) {
      if (error) res.json(error);
      res.json(processSales(JSON.parse(body), year));
    });
  });

  // backlog table
  server.get('/api/sales/backlogProducts', (req, res) => {
    const options = {
      method: 'GET',
      url: `${global.basePrimaveraUrl}/sales/orders`
    };

    return global.request(options, function (error, response, body) {
      if (error) res.json(error);
      res.json(processOrders(JSON.parse(body)));
    });
  });

  // backlog value
  server.get('/api/sales/backlog', (req, res) => {
    const options = {
      method: 'GET',
      url: `${global.basePrimaveraUrl}/sales/orders`
    };

    return global.request(options, function (error, response, body) {
      if (error) res.json(error);
      res.json(getSalesBacklog(JSON.parse(body)));
    });
  });

  // sales clients
  server.get('/api/sales/topClients', (req, res) => {
    const salesInvoices = db.SourceDocuments.SalesInvoices.Invoice;
    const validTypes = ['FT', 'FS', 'FR', 'VD'];

    const clients = [];

    if (Array.isArray(salesInvoices)) {
      salesInvoices.forEach((invoice) => {
        console.log(invoice.InvoiceType);
        if (validTypes.includes(invoice.InvoiceType)) {
          const customerID = invoice.CustomerID;
          let purchased = 0;

          if (Array.isArray(invoice.Line)) {
            invoice.Line.forEach((line) => {
              const { UnitPrice, Quantity } = line;
              purchased += UnitPrice * Quantity;
            });
          } else {
            purchased = invoice.Line.UnitPrice * invoice.Line.Quantity;
          }
          let exists = false;
          for (let i = 0; i < clients.length; i += 1) {
            if (clients[i].id === customerID) {
              exists = true;
              clients[i].nPurchases += 1;
              clients[i].totalPurchased += purchased;
              break;
            }
          }
          if (!exists) {
            clients.push({
              id: customerID,
              totalPurchased: purchased,
              nPurchases: 1,
            });
          }
        }
      });
    } else {
      const invoice = salesInvoices;
      const customerID = invoice.CustomerID;
      let purchased = 0;

      if (validTypes.includes(invoice.InvoiceType)) {
        if (Array.isArray(invoice.Line)) {
          invoice.Line.forEach((line) => {
            const { UnitPrice, Quantity } = line;
            purchased += UnitPrice * Quantity;
          });
        } else {
          purchased = invoice.Line.UnitPrice * invoice.Line.Quantity;
        }
        let exists = false;
        for (let i = 0; i < clients.length; i += 1) {
          if (clients[i].id === customerID) {
            exists = true;
            clients[i].nPurchases += 1;
            clients[i].totalPurchased += purchased;
            break;
          }
        }
        if (!exists) {
          clients.push({
            id: customerID,
            totalPurchased: purchased,
            nPurchases: 1,
          });
        }
      }
    }

    for (let i = 0; i < clients.length; i += 1) {
      clients[i].totalPurchased = parseFloat(clients[i].totalPurchased).toFixed(
        2
      );
    }

    const sorted = clients.sort((a, b) => a.totalPurchased > b.totalPurchased);
    res.json(sorted.slice(0, 5));
  });
};
