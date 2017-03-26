'use strict';

const {Schema} = require('mongoose');
var bcrypt = require("bcrypt");

const Users = new Schema({
  mail: {
    type: String,
    unique: true,
    required: true
  },
  hash: {
    type: String,
    unique: true,
    required: true
  }
});

module.exports = Users;