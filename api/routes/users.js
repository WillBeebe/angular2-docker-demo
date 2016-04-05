var express = require('express');
var router = express.Router();
var User = require('../models/user');

var crud = require('./crud');
crud.attach('user', router, User);

// More methods here

module.exports = router;
