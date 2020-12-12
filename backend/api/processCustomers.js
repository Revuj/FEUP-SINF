const moment = require("moment");

module.exports = (product, orders, year) => {
  const customers = {};
  if (orders) {
    orders
      .filter(
        (order) =>
          moment(order.documentDate).year() == year && order.isDeleted == false
      )
      .forEach((order) => {
        order.documentLines
          .filter((line) => (product ? line.salesItem === product : true))
          .forEach((lineParsed) => {
            if (customers[order.buyerCustomerParty]) {
              customers[order.buyerCustomerParty].units += Number(
                lineParsed.quantity
              );
            } else {
              customers[order.buyerCustomerParty] = {
                id: order.buyerCustomerParty,
                name: order.buyerCustomerPartyName,
                value: Number(order.taxExclusiveAmount.amount),
                units: Number(lineParsed.quantity),
              };
            }
          });
      });
  }
  return Object.keys(customers).map((customer) => customers[customer]);
};
