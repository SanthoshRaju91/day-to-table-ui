/**
* Routes file includes all the routes for the applications
* configuring express router
*/
var express = require('express');
var router = express.Router();

/**
* Routes mock data config imports
*/

var login = require('./mock/common/login.js');

router.post('/login', function(req, res) {
  res.json(login);
});

router.delete('/logoff', function(req, res) {
  res.json({success: true});
});

module.exports = router;
