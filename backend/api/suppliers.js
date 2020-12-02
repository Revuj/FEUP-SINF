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

/**
 * 
 * @param {*} orders 
 * @param {*} supplier 
 * @param {*} year 
 * returns an object with the total price spent in purchases and the total number
 * of orders
 */
const totalPurchases = (orders, supplier, year) => {
  if (orders) {
    const validOrders =  orders.filter(order => 
      order.sellerSupplierParty === supplier &&
      moment(order.documentDate).year() === year);

      const total = validOrders.reduce((total, currentOrder) => total + currentOrder.payableAmount.amount, 0);
      return {totalPrice : total, message : "success", totalOrders: validOrders.length};
  }
  
   return { message : "There was an error processing the orders"};
}

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

  /**
   * get information related to a supplier
   */
  server.get('/api/suppliers/identifier/:id', (req, res) => {
    const {id} = req.params;
    const options = {
      method: 'GET',
      url: `${global.basePrimaveraUrl}/purchasesCore/supplierParties/${id}`,
    };

    return global.request(options, function (error, _response, body) {
      if (error) res.json(error);
      res.json(JSON.parse(body));
    });
  });

  /**
   * get total cost of purchases to a supplier and total number of orders
   * [TODO]: por a mudar o ano
   */
  server.get('/api/suppliers/:id/purchases', (req, res) => {
    const {id} = req.params;
    const year = 2020;
    const options = {
      method: 'GET',
      url: `${global.basePrimaveraUrl}/purchases/orders`,
    };


    return global.request(options, function (error, _response, body) {
      if (error) res.json(error);
      res.json(totalPurchases(JSON.parse(body), id, year ));
    });
  });

};
