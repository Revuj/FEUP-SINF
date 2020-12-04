const processSuppliers = require('./processSuppliers');

const calculateStockNumber = (productInfo) => {
    //console.log(productInfo.materialsItemWarehouses[0]);
    return productInfo.materialsItemWarehouses.reduce((total, currentProduct) => 
        total + currentProduct.stockBalance, 0);
}

const calculateAvgPrice = (productSaleInfo) => {
    return productSaleInfo.priceListLines.reduce((total, currentSell) => 
        total + currentSell.priceAmount.amount, 0)/productSaleInfo.priceListLines.length ;
}

module.exports = (server, db) => {

    server.get('/api/products/:id', (req, res) => {
        const {id} = req.params;

        const options = {
            method: 'GET',
            url: `${global.basePrimaveraUrl}/materialsCore/materialsItems/${id}`,
        };

        return global.request(options, function (error, response, body) {
            if (error) res.json(error);
            if (!JSON.parse(body).message) {
                res.json(JSON.parse(body));
            }
        });
    });

    server.get('/api/products/:id/units-sold', (req, res) => {
        const {id} = req.params;
        let  invoices = db.SourceDocuments.SalesInvoices.Invoice;
        if (!Array.isArray(invoices)) {
            invoices = [invoices];
        }
        let unitsSold = 0;
        let value = 0;

        invoices.forEach(({Line}) => {
            if (Array.isArray(Line)){
                Line.forEach( ({ProductCode, Quantity, UnitPrice}) => {
                    if (ProductCode === id) {
                        console.log(id);
                        unitsSold += parseInt(Quantity, 10);
                        value += parseFloat(Quantity * UnitPrice, 10);
                    }
                });

            } else {

                if (Line.ProductCode === id) {
                    unitsSold += parseInt(Line.Quantity, 10);
                    value += parseFloat(Line.Quantity * Line.UnitPrice, 10);
                }
  
            }
        });

        return res.json({unitsSold, valueTotal : value});
        
    });

    server.get('/api/products/:id/stock-units', (req, res) => {
        const {id} = req.params;
        const options = {
            method: 'GET',
            url: `${global.basePrimaveraUrl}/materialsCore/materialsItems/${id}`,
        };

        return global.request(options, function (error, response, body) {
            if (error) res.json(error);
            if (!JSON.parse(body).message) {
                res.json({ totalStock : calculateStockNumber(JSON.parse(body))});
            }
        });

    });

    server.get('/api/products/:id/avg-price', (req, res) => {
        const {id} = req.params;
        const options = {
            method: 'GET',
            url: `${global.basePrimaveraUrl}/salescore/salesitems/${id}`,
          };

          return global.request(options, function (error, response, body) {
            if (error) res.json(error);
            if (!JSON.parse(body).message) {
                res.json({avg:calculateAvgPrice(JSON.parse(body))});
            }
        });

    });

    /**
     * todo [year]
     */
    server.get('/api/products/:id/suppliers', (req, res) => {
        const {id} = req.params;
        const options = {
            method: 'GET',
            url: `${global.basePrimaveraUrl}/purchases/orders`,
        };
        const year = 2020;
        console.log(year)
        return global.request(options, function (error, response, body) {
            if (error) res.json(error);
                res.json(processSuppliers(id, JSON.parse(body), year));
        });

    });


}
