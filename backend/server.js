const express = require('express');
const cors = require('cors');
const path = require('path');
const request = require('request');
require('dotenv').config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.post('/api/getAccessToken', (req, res) => {
  console.log(req.body);
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
    console.log(jsonF);
    res.json(jsonF);
  });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'));
});

app.listen(8080, () => console.log('Server listening on port 8080!'));
