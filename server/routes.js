/**
 * Routes file includes all the routes for the applications
 * configuring express router
 */
var express = require('express');
var router = express.Router();

/**
 * Routes mock data config imports
 */

var login = require('./mock/common/login');
var activities = require('./mock/activity/activities');
var activity = require('./mock/activity/activity');
var categories = require('./mock/common/categories');
var logout = require('./mock/common/logout');
var register = require('./mock/common/register');

router.post('/login', function(req, res) {
    res.json(login);
});

router.get('/activities', function(req, res) {
    res.json(activities);
});

router.get('/categories', function(req, res) {
    res.json(categories);
});

router.get('/activity/:id', function(req, res) {
    res.json(activity);
});

router.delete('/logoff', function(req, res) {
    res.json(logout);
});

router.post('/register', function(req, res) {
  if(req.body) {
    console.info(req.body);
    res.json(register);
  }
})
module.exports = router;
