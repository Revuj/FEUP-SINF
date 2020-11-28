const processProducts = materials =>
    materials.map(({ itemKey, description, materialsItemWarehouses }) => ({
        id: itemKey,
        name: description,
        quantity: materialsItemWarehouses.reduce(
            (accum, val) => accum + val.stockBalance,
            0,
        ),
        value: materialsItemWarehouses.reduce(
            (accum, val) => accum + val.inventoryBalance.amount,
            0,
        ),
    }));

const processWarehouses = items => {
    const warehouses = {};
    if (items) {
        items.forEach(item => {
            item.materialsItemWarehouses.forEach(materialsItem => {
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
    return Object.keys(warehouses).map(warehouse => warehouses[warehouse]);
};

const processStock = materials =>
    materials.reduce(
        (accum, val) =>
            accum +
            val.materialsItemWarehouses.reduce(
                (accum2, val2) => accum2 + val2.inventoryBalance.amount,
                0,
            ),
        0,
    );


module.exports = (server) => {
    server.get('/api/inventory/products', (req, res) => {
        const options = {
            method: 'GET',
            url: `${global.basePrimaveraUrl}/materialsCore/materialsItems`,
        };

        return global.request(options, function (error, response, body) {
            if (error) res.json(error);
            if (!JSON.parse(body).message) {
                res.json(processProducts(JSON.parse(body)));
            }
        });
    });

    server.get('/api/inventory/warehouses', (req, res) => {
        const options = {
            method: 'GET',
            url: `${global.basePrimaveraUrl}/materialscore/materialsitems`,
        };


        return global.request(options, function (error, response, body) {
            if (error) res.json(error);
            if (!JSON.parse(body).message) {
                res.json(processWarehouses(JSON.parse(body)));
            }
        });
    });

    server.get('/api/inventory/stock', (req, res) => {
        const options = {
            method: 'GET',
            url: `${global.basePrimaveraUrl}/materialsCore/materialsItems`,
        };

        return global.request(options, function (error, response, body) {
            if (error) res.json(error);
            if (!JSON.parse(body).message) {
                res.json(processStock(JSON.parse(body)));
            }
        });
    });
}