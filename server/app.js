var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');

var app = express();

app.use(bodyParser.urlencoded({ extended: false}));
app.use(morgan());

//"http://localhost:3000", "http://localhost:3001", "http://127.0.0.1:3000", "http://127.0.0.1:3001"
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  next();
})
app.use('/api/v1', require('./routes.js'));

app.listen('8080', function(err) {
  if(err) {
    console.log('Error listening on port 8080');
  } else {
    console.log('Listening on port 8080');
  }
});
