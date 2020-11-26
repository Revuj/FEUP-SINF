const express = require('express');
const cors = require('cors');
const path = require('path');
const request = require('request');
const app = express();
require('dotenv').config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

const basePrimaveraUrl = `https://my.jasminsoftware.com/api/${process.env.TENANT}/${process.env.ORGANIZATION}`;

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
    request.defaults({
      headers: {
        Authorization: `Bearer ${jsonF.accessToken}`,
        'Content-Type': 'application/json',
      },
    });
  });
};

getAccessToken();

const purchasesAPI = require('./api/purchases');
purchasesAPI(app);

app.post('/api/getAccessToken', (req, res) => {
  const options = {
    method: 'POST',
    url: 'https://identity.primaverabss.com/connect/token',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    formData: req.body,
  };
  request(options, function (error, response, body) {
    if (error) throw new Error(error);

    const jsonF = JSON.parse(response.body);
    res.json(jsonF);
  });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'));
});

app.listen(8080, () => console.log('Server listening on port 8080!'));
