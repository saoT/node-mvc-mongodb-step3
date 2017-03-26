'use strict';

const Products = require('../../database').products;

//------------------ /!\ ------------------//
// N'oubliez pas de rajouter la méthode pour chaque route.
// ----------------------------------------//
const products =  {

  find : (req, res) => {
    Products.find({name: req.params.name})
    .then( data => {
      res.send('Operation completed ' + data);
    })
    .catch( err => {
      res.send('Operation failed :: ' + err)
    });
  }

}

module.exports = products;