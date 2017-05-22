'use strict';

const {Schema} = require('mongoose');

const Products = new Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  something: Array
});

module.exports = Products;