const moment = require('moment');

const processSuppliers = (product, orders, year) => {
  const suppliers = {};
  if (orders) {
    orders
      .filter((order) => moment(order.documentDate).year() == year)
      .forEach((order) => {
        order.documentLines
          .filter((line) => (product ? line.purchasesItem === product : true))
          .forEach((lineParsed) => {
            if (suppliers[order.sellerSupplierParty]) {
              suppliers[order.sellerSupplierParty].value += Number(
                lineParsed.grossValue.amount
              );
              suppliers[order.sellerSupplierParty].value += Number(
                lineParsed.quantity
              );
            } else {
              suppliers[order.sellerSupplierParty] = {
                id: order.sellerSupplierParty,
                name: order.sellerSupplierPartyName,
                value: Number(lineParsed.grossValue.amount),
                units: Number(lineParsed.quantity),
              };
            }
          });
      });
  }
  return Object.keys(suppliers).map((supplier) => suppliers[supplier]);
};

module.exports = (server) => {
  server.get('/api/suppliers/:year', (req, res) => {
    const { year } = req.params;
    const options = {
      method: 'GET',
      url: `${global.basePrimaveraUrl}/purchases/orders`,
    };

    return global.request(options, function (error, response, body) {
      if (error) res.json(error);
      res.json(processSuppliers(null, JSON.parse(body), year));
    });
  });
};
