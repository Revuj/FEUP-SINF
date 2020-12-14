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
              customers[order.buyerCustomerParty].value += Number(
                lineParsed.quantity * lineParsed.unitPrice.amount
              );
            } else {
              customers[order.buyerCustomerParty] = {
                id: order.buyerCustomerParty,
                name: order.buyerCustomerPartyName,
                value:
                  Number(lineParsed.quantity) *
                  Number(lineParsed.unitPrice.amount),
                units: Number(lineParsed.quantity),
              };
            }
          });
      });
  }
  return Object.keys(customers).map((customer) => customers[customer]);
};
