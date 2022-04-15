const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/customer', () => {
  console.log('Connected to Customer DB');
});

// Load out model
require('./Customer');
const Customer = mongoose.model('Customer');

app.post('/customer', (req, res) => {
  var newCustomer = {
    name: req.body.name,
    age: req.body.age,
    address: req.body.address,
  };

  var customer = new Customer(newCustomer);

  customer.save().then(() => {
    res.send('Customer created').catch((err) => {
      if (err) {
        throw err;
      }
    });
  });
});

app.listen('5555', () => {
  console.log('Up and running - Customer service');
});
