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

const getGoodsReceipts = (id) => {
  let keys = [];
  const options = {
    method: "GET",
    url: `${global.basePrimaveraUrl}/goodsReceipt/processOrders/1/1000?company=${process.env.COMPANY}`,
  };

  global.request(options, function (error, response, body) {
    if (error) return { error: error };

    if (!JSON.parse(body).message) {
      keys = JSON.parse(body)
        .filter(({ party }) => party === id)
        .map(({ sourceDocKey }) => sourceDocKey);
    }
  });
  console.log(keys);
  return keys;
};

const pendingPurchases = (keys) => {
  const options = {
    method: "GET",
    url: `${global.basePrimaveraUrl}/purchases/orders`,
  };

  global.request(options, (error, response, body) => {
    if (error) return { error: error };

    if (!JSON.parse(body).message) {
      let pendingPurchases = JSON.parse(body);

      pendingPurchases = pendingPurchases
        .filter(({ naturalKey }) => keys.find((key) => naturalKey === key))
        .map(({ naturalKey, documentDate, payableAmount }) => ({
          id: naturalKey,
          date: documentDate,
          value: payableAmount.amount,
        }));

      res.json(pendingPurchases);
    }
  });
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

    const goodsReceipt = getGoodsReceipts(id);
    if (!goodsReceipt.error) {
      const pendingPurchases = pendingPurchases(goodsReceipt);
      if (pendingPurchases.error) {
        res.json(pendingPurchases);
      } else {
        res.json({ error: pendingPurchases.error });
      }
    } else {
      res.json({ error: goodsReceipt.error });
    }
  });
};
