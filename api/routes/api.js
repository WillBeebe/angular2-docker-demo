var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var api = express.Router();
var jwt = require('jsonwebtoken');

var User = require('../models/user');

api.use(bodyParser.urlencoded({ extended: true }));
api.use(bodyParser.json());
api.use(morgan('dev'));

api.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
  next();
});

// route middleware to verify a token
api.use(function(req, res, next) {

  // console.log(req.headers);
  // console.log(req.body);

  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  // decode token
  if (token) {
    // verifies secret and checks exp
    jwt.verify(token, req.app.get('superSecret'), function(err, decoded) {
      if (err) {
        return res.status(403).send({
            success: false,
            message: 'Failed to authenticate token.'
        });
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        User.findOne({_id: decoded._doc._id}, function(err, user) {
          if (err) {
            return res.send(err);
          }
          req.user = user;
          next();
        });
      }
    });
  } else {
    return res.status(403).send({
        success: false,
        message: 'No token provided.'
    });
  }
});

module.exports = api;
