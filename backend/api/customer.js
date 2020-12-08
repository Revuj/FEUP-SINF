const processCustomers = require('./processCustomers');

const processCostumerPurchases = (invoices, costumerId) => {
    if (Array.isArray(invoices)) {
        return invoices.filter( ({accountingParty}) => accountingParty === costumerId)
            .reduce((total, currentInvoice) => total + currentInvoice.grossValue.amount, 0);
    
    } else if (invoices.accountingParty === CustomerId) {
        return invoices.grossValue.amount;
    } else 
        return {}
};

/** maybe por mais algum atributo */
const processTopPurchases = (invoices, costumerId) => {
    const purchases = [];
    if (Array.isArray(invoices)) {
        return invoices.filter( ({accountingParty}) => accountingParty === costumerId)
            .map(({currency, documentDate, grossValue }) => 
               {return {currency,  date:documentDate,  amount: grossValue.amount }})
            .sort((a,b) => a.grossValue.amount - b.grossValue.amount);
    
    } else if (invoices.accountingParty === CustomerId) {
        purchases.push({
            receiptId: invoices.receiptId,
            date: invoices.documentDate,
            amount: invoices.grossValue.amount
        })
    } else 
        return purchases;
}

module.exports = (server) => {

    server.get('/api/customers/:year', (req, res) => {
        const { year } = req.params;
        const options = {
            method: 'GET',
            url: `${global.basePrimaveraUrl}/sales/orders`,
        };

        return global.request(options, function (error, response, body) {
            if (error) res.json(error);
            res.json(processCustomers(null, JSON.parse(body), year));
        });
        });

    server.get('/api/customer/:id', (req, res) => {

            const {id} = req.params;
            const options = {
                method: 'GET',
                url: `${global.basePrimaveraUrl}/salesCore/customerParties/${id}`
            };

            return global.request(options, function (error, response, body) {
                if (error) throw new Error(error.message);
                res.json(JSON.parse(body));
            });
    });

    server.get('/api/customer/:id/purchases', (req, res) => {

    const {id} = req.params;
    const options = {
        method: 'GET',
        url: `${global.basePrimaveraUrl}/accountsReceivable/receipts`
    };

    return global.request(options, function (error, response, body) {
        if (error) res.json(error);
        res.json(processCostumerPurchases(JSON.parse(body), id));
    });
    
   });


   server.get('/api/customer/:id/topPurchases', (req, res) => {
        
    const {id} = req.params;
    const options = {
        method: 'GET',
        url: `${global.basePrimaveraUrl}/accountsReceivable/receipts`
    };

    return global.request(options, function (error, response, body) {
        if (error) res.json(error);
        res.json(processTopPurchases(JSON.parse(body), id));
    });
   });

}