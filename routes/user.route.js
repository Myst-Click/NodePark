'use strict'
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
const jwt = require('jsonwebtoken')
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
var User = require('../models/User');

router.use(function(req, res, next) {
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  if (token) {
    jwt.verify(token, 'RESTFULAPIs', function(err, decoded) {       if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });       }
        else {
        req.decoded = decoded;         next();
        }
    });
  } else {
    return res.status(403).send({ 
        success: false, 
        message: 'No token provided.' 
    });

  }
});




  module.exports = router;