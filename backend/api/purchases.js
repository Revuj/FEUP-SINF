const request = require('request');
const moment = require('moment');

const processPurchases = (orders, year) => {
  const monthlyCumulativeValue = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  orders
    // eslint-disable-next-line eqeqeq
    .filter((order) => moment(order.documentDate).year() == year)
    .forEach(({ documentDate, payableAmount }) => {
      const month = moment(documentDate).month();

      monthlyCumulativeValue[month] += payableAmount.amount;
    });

  return monthlyCumulativeValue;
};

module.exports = (server) => {
  server.get('api/purchases', (req, res) => {
    const options = {
      method: 'GET',
      url: `${basePrimaveraUrl}/purchases/orders`,
    };

    return global.request(options, (error, response, body) => {
      console.error('error:', error);

      let monthlyCumulativeValue = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      if (!JSON.parse(body).message) {
        monthlyCumulativeValue = processPurchases(
          JSON.parse(body),
          req.body.year
        );
      }
      res.json(monthlyCumulativeValue);
    });
  });
};
