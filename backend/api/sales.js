const moment = require('moment');

module.exports = (server, db) => {
  // monthly sales by year
  server.get('/api/sales/:year', (req, res) => {
    const { year } = req.params;
    const salesInvoices = db.SourceDocuments.SalesInvoices.Invoice.filter(
      (invoice) => moment(invoice.InvoiceDate).year() == year
    );
    const monthlyCumulative = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    salesInvoices.forEach((invoice) => {
      monthlyCumulative[parseInt(invoice.Period, 10) - 1] =
        parseFloat(invoice.DocumentTotals.GrossTotal) +
        monthlyCumulative[parseInt(invoice.Period, 10) - 1];
    });
    res.json({ monthlyCumulative });
  });

  // net sales
  server.get('/api/netSales', (req, res) => {
    res.json(db.SourceDocuments.SalesInvoices.TotalCredit);
  });

  server.get('/api/products/random', (req, res) => {
    const { id } = req.params;
    const invoices = db.SourceDocuments.SalesInvoices;
    res.json(invoices);
  });

  // sales products
  server.get('/api/sales/products', (req, res) => {
    let products = {};
    const validTypes = ['FT', 'FS', 'FR', 'VD'];
    console.log(db.SourceDocuments.SalesInvoices);
    db.SourceDocuments.SalesInvoices.Invoice.forEach((invoice) => {
      const type = invoice.InvoiceType;

      if (!(invoice.Line.length && validTypes.includes(type))) return;

      invoice.Line.forEach((line) => {
        const { ProductCode, UnitPrice, ProductDescription, Quantity } = line;
        if (Object.prototype.hasOwnProperty.call(products, ProductCode)) {
          products[ProductCode].Quantity += parseInt(Quantity, 10);
        } else {
          products[ProductCode] = {
            ProductDescription,
            UnitPrice: parseFloat(UnitPrice, 10),
            Quantity: parseInt(Quantity, 10),
          };
        }
      });
    });

    products = Object.keys(products)
      .sort((a, b) => products[b].Quantity - products[a].Quantity)
      .map((productCode) => ({
        id: productCode,
        name: products[productCode].ProductDescription,
        quantity: products[productCode].Quantity,
        value: Number(
          (
            products[productCode].Quantity * products[productCode].UnitPrice
          ).toFixed(2)
        ),
      }));

    res.json(products);
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
