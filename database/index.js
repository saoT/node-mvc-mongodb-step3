'use strict';


const mongoose = require('mongoose');

const users = require('./models/users');
const products = require('./models/products');
// STEP 2 
// Dans mongoose require mon shéma topmodel.js sous le nom topModel

mongoose.connect('mongodb://localhost:27017/test');

mongoose.connection.on('error', err => {
  console.log('ERROR close MongoDB process', err);
});

mongoose.connection.on('connnected', function () {
  console.log('MongoDb connection success on  port 27017')
});

mongoose.connection.on('disconnected', function () {
  console.log('MongoDB process disconnected');
});

process.on('SIGINT', function () {
  mongoose.connection.close(function () {
    console.log('Server process terminated. Closing MongoDB');
    process.exit(0);
  });
});

// STEP 3 :
// créer et exporter mon model sous le nom topModel et 'TopModel'
// qui permettra d'avoir accés à mon model TopModel en utilisant db.topModel
const db = {
  users: mongoose.model('Users', users),
  products: mongoose.model('Products', products)
}


// db.users, db.products
module.exports = db;