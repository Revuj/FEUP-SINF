const moment = require('moment');

const processPurchases = (orders, year) => {
  const monthlyCumulativeValue = [10, 0, 30, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  orders
    .filter((order) => moment(order.documentDate).year() == year)
    .forEach(({ documentDate, payableAmount }) => {
      const month = moment(documentDate).month();

      monthlyCumulativeValue[month] += payableAmount.amount;
    });

  return monthlyCumulativeValue;
};

module.exports = (server) => {
  server.get('/api/purchases/:year', (req, res) => {
    const { year } = req.params;
    const options = {
      method: 'GET',
      url: `${global.basePrimaveraUrl}/purchases/orders`,
    };

    return global.request(options, (error, response, body) => {
      if (error) console.error('error:', error);

      let monthlyCumulativeValue = [10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      if (!JSON.parse(body).message) {
        monthlyCumulativeValue = processPurchases(JSON.parse(body), year);
      }
      res.json(monthlyCumulativeValue);
    });
  });
};
