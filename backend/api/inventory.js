const processProducts = (materials) =>
  materials.map(({ itemKey, description, materialsItemWarehouses }) => ({
    id: itemKey,
    name: description,
    quantity: materialsItemWarehouses.reduce(
      (accum, val) => accum + val.stockBalance,
      0
    ),
    value: materialsItemWarehouses.reduce(
      (accum, val) => accum + val.inventoryBalance.amount,
      0
    ),
  }));

const processWarehouses = (items) => {
  const warehouses = {};
  if (items) {
    items.forEach((item) => {
      item.materialsItemWarehouses.forEach((materialsItem) => {
        if (warehouses[materialsItem.warehouse]) {
          warehouses[materialsItem.warehouse].value +=
            materialsItem.inventoryBalance.reportingAmount;
          warehouses[materialsItem.warehouse].quantity +=
            materialsItem.stockBalance;
        } else {
          warehouses[materialsItem.warehouse] = {
            id: materialsItem.warehouse,
            name: materialsItem.warehouseDescription,
            quantity: materialsItem.stockBalance,
            value: materialsItem.inventoryBalance.reportingAmount,
          };
        }
      });
    });
  }
  return Object.keys(warehouses).map((warehouse) => warehouses[warehouse]);
};

const processStock = (materials) =>
  materials.reduce(
    (accum, val) =>
      accum +
      val.materialsItemWarehouses.reduce(
        (accum2, val2) => accum2 + val2.inventoryBalance.amount,
        0
      ),
    0
  );

module.exports = (server, cache) => {
  server.get("/api/inventory/products", (req, res) => {
    const options = {
      method: "GET",
      url: `${global.basePrimaveraUrl}/materialsCore/materialsItems`,
    };

    const key = 'inventory-products';
    const cachedProducts = cache.get(key);

    if (cachedProducts != undefined){
      console.log('hit');
      return res.json(cachedProducts);
    }
    
    return global.request(options, function (error, response, body) {
      if (error) res.json(error);
      if (!JSON.parse(body).message) {
        const products = processProducts(JSON.parse(body));
        cache.set(key, products, 3600);
        res.json(products);
      }
    });
  });

  server.get("/api/inventory/warehouses", (req, res) => {
    const options = {
      method: "GET",
      url: `${global.basePrimaveraUrl}/materialscore/materialsitems`,
    };

    const key = 'inventory-warehouses';
    const cachedWarehouses = cache.get(key);

    if (cachedWarehouses != undefined){
      console.log('hit');
      return res.json(cachedWarehouses);
    }

    return global.request(options, function (error, response, body) {
      if (error) res.json(error);
      if (!JSON.parse(body).message) {
        const warehouses = processWarehouses(JSON.parse(body));
        cache.set(key, warehouses, 3600);
        res.json(warehouses);
      }
    });
  });

  server.get("/api/inventory/stock", (req, res) => {
    const options = {
      method: "GET",
      url: `${global.basePrimaveraUrl}/materialsCore/materialsItems`,
    };

    const key = 'inventory-stock';
    const cachedStock = cache.get(key);

    if (cachedStock != undefined){
      console.log('hit');
      return res.json(cachedStock);
    }

    return global.request(options, function (error, response, body) {
      if (error) res.json(error);
      if (!JSON.parse(body).message) {
        const stock = processStock(JSON.parse(body));
        cache.set(key, stock, 3600);
        res.json(stock);
      }
    });
  });
};
