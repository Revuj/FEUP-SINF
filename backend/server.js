const { create, router, defaults, bodyParser } = require('json-server');
const cors = require('cors');
const { join } = require('path');
const request = require('request');
require('dotenv').config();

const server = create();
const _router = router('db.json');
const middlewares = defaults({ noCors: false });
const db = _router.db.__wrapped__;

server.use(cors());
server.use(middlewares);
server.use(bodyParser);

global.basePrimaveraUrl = `https://my.jasminsoftware.com/api/${process.env.TENANT}/${process.env.ORGANIZATION}`;

const FinancialController = require('./modules/financial');
const purchasesAPI = require('./api/purchases');
const suppliersAPI = require('./api/suppliers');
const inventoryAPI = require('./api/inventory');
const salesAPI = require('./api/sales');
const productAPI = require("./api/product");


FinancialController(server, db);
salesAPI(server, db);
purchasesAPI(server);
suppliersAPI(server);
inventoryAPI(server);
productAPI(server, db);

server.use(_router);

const getAccessToken = () => {
  const options = {
    method: 'POST',
    url: 'https://identity.primaverabss.com/connect/token',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    formData: {
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      scope: 'application',
      grant_type: 'client_credentials',
    },
  };
  request(options, function (error, response, body) {
    if (error) console.error('error:', error);

    const jsonF = JSON.parse(response.body);
    global.request = request.defaults({
      headers: {
        Authorization: `Bearer ${jsonF.access_token}`,
        'Content-Type': 'application/json',
      },
    });
  });
};

getAccessToken();

server.get('*', (req, res) => {
  res.sendFile(join(__dirname, 'frontend', 'build', 'index.html'));
});

server.listen(8080, () => console.log('Server listening on port 8080!'));

module.exports = server;
