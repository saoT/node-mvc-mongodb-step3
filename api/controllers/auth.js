'use strict';

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const moment = require('moment');
const Users = require('../../database').users;

// Create a token for the user
function generate_token (user) {
  const payload = {
      exp: moment().add(14, 'days').unix(),
      iat: moment().unix(),
      iss: user.mail,
      sub : user.hash
  }
  return jwt.sign(payload, 'rhododendron');
}

// Create a hash for the user
function format (user) {
  const salt = bcrypt.genSaltSync(10);
  return {
    mail: user.mail,
    hash: bcrypt.hashSync(user.mail + user.pwd, salt)
  }
}

const auth =  {

  register : (req, res) => {
    const newUser = new Users(format(req.body));
    newUser.save()
    .then ( user => {
      const token = generate_token(user);
      res.send(token);
    })
    .catch ( err => {
      // Handle "Missing paramater" or "User already exists" or "Server error" here
      // depending on the error code.
      res.send('Operation failed : \n' + err);
    }); 
  },

  login : (req, res) => {
    Users.find({mail: req.body.mail})
    .then( users => {
      if ( users.length > 0 && bcrypt.compareSync(req.body.mail + req.body.pwd, users[0].hash)) {
        const token = generate_token(users[0]);
        res.send('Operation succeeded : \n' + token);
      }
    })
    .catch( err => {
      res.send('Operation failed : \n' + err);
    });
  },

  require_token : (req, res, next) => {
    const token = req.query.token;
    //const token  = req.get('Authorization');
    
    if (!token) res.send('Authorization Required');
    else {
      jwt.verify(token, 'rhododendron', (err, decoded) => {
        if (err || decoded.exp < moment().unix()) res.send('Token expired');
        else next();
      });
    }
  }
}

module.exports = auth;