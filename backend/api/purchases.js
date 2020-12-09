const moment = require('moment');

const processPurchases = (orders, year) => {
  let monthlyCumulativeValue = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  orders
    .filter((order) => moment(order.documentDate).year() == year)
    .forEach(({ documentDate, payableAmount }) => {
      const month = moment(documentDate).month();

      monthlyCumulativeValue[month] += payableAmount.amount;
    });

  return monthlyCumulativeValue;
};

const getPurchasesBacklog = (orders) => {
  let purchasesBacklog = 0;

  orders
    .filter((order) => moment(order.documentDate).isAfter(moment()))
    .forEach(({ documentDate, payableAmount }) => {
      purchasesBacklog += payableAmount.amount;
    });

  return purchasesBacklog;
};

module.exports = (server) => {
  server.get('/api/purchases/:year', (req, res) => {
    const { year } = req.params;
    const options = {
      method: 'GET',
      url: `${global.basePrimaveraUrl}/purchases/orders`,
    };

    return global.request(options, (error, response, body) => {
      if (error) res.json(error);

      if (!JSON.parse(body).message) {
        res.json(processPurchases(JSON.parse(body), year));
      }
    });
  });

  server.get('/api/purchasesBacklog', (req, res) => {
    const options2 = {
      method: 'GET',
      url: `${global.basePrimaveraUrl}/purchases/orders`,
    };

    const options1 = {
      method: 'GET',
      url: `${global.basePrimaveraUrl}/goodsReceipt/processOrders/1/1000?company=${process.env.COMPANY_KEY}`,
    };

    return global.request(options1, function (error, response, body) {
      if (error) throw new Error(error);

      let productBacklog = 0;
      if (!JSON.parse(body).message) {
        const keys = JSON.parse(body).map(({ sourceDocKey }) => sourceDocKey);

        global.request(options2, (error2, response2, body2) => {
          if (error2) throw new Error(error2);

          if (!JSON.parse(body2).message) {
            let receipts = JSON.parse(body2);

            receipts = receipts.filter(
              ({ naturalKey }) => !keys.find((key) => naturalKey == key)
            );

            productBacklog = receipts.reduce(
              (accum, curr) => accum + curr.payableAmount.amount,
              0
            );

            res.json(receipts);
          }
        });
      }
    });
  });
};
