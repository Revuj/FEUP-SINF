const moment = require("moment");
const processSuppliers = require("./processSuppliers");

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
    const validOrders = orders.filter(
      (order) =>
        order.sellerSupplierParty === supplier &&
        moment(order.documentDate).year() === year
    );
    const total = validOrders.reduce(
      (total, currentOrder) => total + currentOrder.payableAmount.amount,
      0
    );
    return {
      totalPrice: total,
      message: "success",
      totalOrders: validOrders.length,
      orders,
    };
  }

  return { message: "There was an error processing the orders" };
};

module.exports = (server) => {
  server.get("/api/suppliers/:year", (req, res) => {
    const { year } = req.params;
    const options = {
      method: "GET",
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
  server.get("/api/suppliers/identifier/:id", (req, res) => {
    const { id } = req.params;
    const options = {
      method: "GET",
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
  server.get("/api/suppliers/:id/purchases", (req, res) => {
    const { id } = req.params;
    const year = 2020;
    const options = {
      method: "GET",
      url: `${global.basePrimaveraUrl}/purchases/orders`,
    };

    return global.request(options, function (error, _response, body) {
      if (error) res.json(error);
      res.json(totalPurchases(JSON.parse(body), id, year));
    });
  });

  server.get("/api/suppliers/:id/pending-purchases", (req, res) => {
    const { id } = req.params;
    let options = {
      method: "GET",
      url: `${global.basePrimaveraUrl}/goodsReceipt/processOrders/1/1000?company=${process.env.COMPANY_KEY}`,
    };

    return global.request(options, function (error, response, body) {
      if (error) res.json(error);

      if (!JSON.parse(body).message) {
        const keys = JSON.parse(body)
          .filter(({ party }) => party === id)
          .map(({ sourceDocKey }) => sourceDocKey);

        options = {
          method: "GET",
          url: `${global.basePrimaveraUrl}/purchases/orders`,
        };

        global.request(options, (e, r, b) => {
          if (e) res.json(e);

          if (!JSON.parse(b).message) {
            let pendingPurchases = JSON.parse(b);

            pendingPurchases = pendingPurchases
              .filter(({ naturalKey }) =>
                keys.find((key) => naturalKey === key)
              )
              .map(
                ({
                  naturalKey,
                  documentDate,
                  documentLines,
                  payableAmount,
                }) => ({
                  reference: naturalKey,
                  date: documentDate.substr(0, 10),
                  units: documentLines.reduce(
                    (acc, current) => acc + current.quantity,
                    0
                  ),
                  value: payableAmount.amount,
                })
              );

            res.json(pendingPurchases);
          }
        });
      }
    });
  });
};
