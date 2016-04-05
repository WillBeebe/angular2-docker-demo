var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var auth = express.Router();
var jwt = require('jsonwebtoken');

var User = require('../models/user');

auth.use(bodyParser.urlencoded({ extended: true }));
auth.use(bodyParser.json());
auth.use(morgan('dev'));

auth.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
  next();
});

// a hook to add one user to the db
auth.get('/setup', function(req, res) {
    User.findOne({name: 'will'}, function(err, user) {
        if (err) throw err;

        if(user) {
          return res.send({message: 'user already exists'});
        }

        var admin = new User({
          name: 'will',
          password: 'demoApp',
          admin: true
        });

        admin.save(function(err) {
          if (err) throw err;

          console.log('User saved successfully');
          res.json({ success: true });
        });
    });
});

auth.post('/', function(req, res) {
  User.findOne({
    name: req.body.name
  }, function(err, user) {
    if (err) throw err;

    if (!user) {
      return res.status(403).send({
          success: false,
          message: 'Authentication failed. User not found.'
      });
    }

    user.comparePassword(req.body.password, function(err, isMatch) {
      if (err) throw err;

      // if user is found and password is right
      // create a token
      var token = jwt.sign(user, req.app.get('superSecret'), {
        expiresIn: 86400 // expires in 24 hours
      });

      // return the information including token as JSON
      res.json({
        success: true,
        message: 'Enjoy your token!',
        token: token
      });
    });
  });
});

module.exports = auth;
