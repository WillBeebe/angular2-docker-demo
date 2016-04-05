var SERVER_PORT = 8080;
var MONGO_IP = process.env.MONGO_PORT_27017_TCP_ADDR;
var MONGO_PORT = process.env.MONGO_PORT_27017_TCP_PORT;

var express    = require('express');
var mongoose   = require('mongoose');
var app = express();
var config = require('./config');
var jwt    = require('jsonwebtoken');
var connectionString = 'mongodb://' + MONGO_IP + ':' + MONGO_PORT + '/production';

console.log('connecting to database');
console.log(connectionString);
mongoose.connect(connectionString);

app.set('superSecret', config.secret);

// ROUTES
app.route('/')
    .get(function(req, res) {
        res.json({ message: 'hooray! welcome to our api!' });
    });

app.use('/api', require('./routes/api'));
app.use('/api/users', require('./routes/users'));
app.use('/auth', require('./routes/auth'));

// START THE SERVER
// =============================================================================
app.listen(SERVER_PORT, function() {
  console.log('Example app listening at port %s', SERVER_PORT);
});
module.exports.server = app;
