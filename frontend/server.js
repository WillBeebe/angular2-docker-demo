var SERVER_PORT = 4000;

// call the packages we need
var express    = require('express');
var app = express();
var path    = require('path');
var morgan = require('morgan');

// ROUTES
app.use(morgan('dev'));

app.route('/')
    .get(function(req, res) {
        res.sendFile(path.join(__dirname+'/dist/index.html'));
    });

app.route('/vendor.js')
  .get(function(req, res) {
    res.sendFile(path.join(__dirname+'/dist/vendor.js'));
  });

app.route('/common.js')
  .get(function(req, res) {
    res.sendFile(path.join(__dirname+'/dist/common.js'));
  });

app.route('/app.js')
  .get(function(req, res) {
    res.sendFile(path.join(__dirname+'/dist/app.js'));
  });

app.route('/app.css')
  .get(function(req, res) {
    res.sendFile(path.join(__dirname+'/src/app/app.css'));
  });

app.route('/favicon.png')
  .get(function(req, res) {
    res.sendFile(path.join(__dirname+'/dist/favicon.png'));
  });

app.route('/dist/logo.png')
  .get(function(req, res) {
    res.sendFile(path.join(__dirname+'/dist/logo.png'));
  });

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname+'/dist/index.html'));
});

// START THE SERVER
// =============================================================================
app.listen(SERVER_PORT, function() {
  console.log('Example app listening at port %s', SERVER_PORT);
});
module.exports.server = app;
