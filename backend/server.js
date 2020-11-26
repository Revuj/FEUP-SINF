const express = require('express');
const cors = require('cors');
const path = require('path');
const Request = require('request');
const app = express();
require('dotenv').config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

global.basePrimaveraUrl = `https://my.jasminsoftware.com/api/${process.env.TENANT}/${process.env.ORGANIZATION}`;
const purchasesAPI = require('./api/purchases');

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
  Request(options, function (error, response, body) {
    if (error) console.error('error:', error);

    const jsonF = JSON.parse(response.body);
    global.request = Request.defaults({
      headers: {
        Authorization: `Bearer ${jsonF.access_token}`,
        'Content-Type': 'application/json',
      },
    });
  });
};

getAccessToken();

purchasesAPI(app);

// Set static folder in production
if (process.env.NODE_ENV === 'production') {
  server.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}
app.listen(8080, () => console.log('Server listening on port 8080!'));

module.exports = app;
