'use strict';

const Products = require('../../database').products;

//------------------ /!\ ------------------//
// N'oubliez pas de rajouter la méthode pour chaque route.
// ----------------------------------------//
const products =  {

  find : (req, res) => {
    // var yo = new Products({
    //   name: 'Yo',
    //   price: 10,
    //   something: [
    //     {
    //       else: 10
    //     }
    //   ]
    // });
    // yo.save();
    Products.find()
    .then( data => {

      data[0].something[0].else = 30;
      var instruArray = data[0].something
      data[0].something[0].else = 20;
      data[0].save()
      Products.update({ _id: data[0]._id }, { $set: { something: instruArray }}, function () {
        res.send('is all good');
      });
      res.send('Operation completed ' + data);
    })
    .catch( err => {
      res.send('Operation failed :: ' + err)
    });
  }

}

module.exports = products;