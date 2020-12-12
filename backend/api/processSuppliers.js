const moment = require("moment");

module.exports = (product, orders, year) => {
  const suppliers = {};
  if (orders) {
    orders
      .filter((order) => moment(order.documentDate).year() == year)
      .forEach((order) => {
        order.documentLines
          .filter((line) => (product ? line.purchasesItem === product : true))
          .forEach((lineParsed) => {
            if (suppliers[order.sellerSupplierParty]) {
              suppliers[order.sellerSupplierParty].units += Number(
                lineParsed.quantity
              );
            } else {
              suppliers[order.sellerSupplierParty] = {
                id: order.sellerSupplierParty,
                name: order.sellerSupplierPartyName,
                value: Number(order.payableAmount.amount),
                units: Number(lineParsed.quantity),
              };
            }
          });
      });
  }
  return Object.keys(suppliers).map((supplier) => suppliers[supplier]);
};
