'use strict';


const Users = require('../../database').users;

//------------------ /!\ ------------------//
// N'oubliez pas de rajouter la méthode pour chaque route.
// ----------------------------------------//
const users  = {

  // Find a user by name
  find : (req, res) => {
    Users.find({mail: req.params.mail})
    .then( data => {
      res.send('Operation completed ' + data);
    })
    .catch( err => {
      res.send('Operation failed :: ' + err)
    });
  },

  restricted : (req, res) => {
    console.log('Accessed the restricted area');
    res.send('Access authorized');
  }

}

module.exports = users;