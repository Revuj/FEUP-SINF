const moment = require("moment");

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
  server.get("/api/purchases/:year", (req, res) => {
    const { year } = req.params;
    const options = {
      method: "GET",
      url: `${global.basePrimaveraUrl}/purchases/orders`,
    };

    return global.request(options, (error, response, body) => {
      if (error) res.json(error);

      if (!JSON.parse(body).message) {
        res.json(processPurchases(JSON.parse(body), year));
      }
    });
  });

  server.get("/api/purchasesBacklog", (req, res) => {
    const options = {
      method: "GET",
      url: `${global.basePrimaveraUrl}/purchases/orders`,
    };

    return global.request(options, (error, response, body) => {
      if (error) res.json(error);

      if (!JSON.parse(body).message) {
        res.json(getPurchasesBacklog(JSON.parse(body)));
      }
    });
  });

  server.get("/api/purchases/debt", (req, res) => {
    let options = {
      method: "GET",
      url: `${global.basePrimaveraUrl}/purchases/orders`,
    };

    return global.request(options, (error, response, body) => {
      if (error) res.json(error);

      if (!JSON.parse(body).message) {
        const totalOrders = JSON.parse(body).reduce((acumulator, order) => {
          if (order.documentStatus == "2") {
            acumulator += order.payableAmount.amount;
          }
          return acumulator;
        }, 0);

        options = {};
        res.json(getPurchasesBacklog(JSON.parse(body)));
      }
    });
  });
};
