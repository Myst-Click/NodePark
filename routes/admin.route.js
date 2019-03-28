'use strict'

var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
const jwt = require('jsonwebtoken')

const UserController = require('../controllers/user.controller');
const ParcoursController = require('../controllers/parcours.controller')
const verifyValueController = require('../controllers/verifyValue')

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
router.use(function(req, res, next) {
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  if (token) {
    jwt.verify(token, 'RESTFULAPIs', function(err, decoded) {       
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });       }
        else {
        req.decoded = decoded;        
        next();
        }
    });
  } else {
    return res.status(403).send({ 
        success: false, 
        message: 'No token provided.' 
    });

  }
});
//changer les attributs d'un client
router.post('/:id/settings/:idadmin',async(req,res)=>{
  const user = await UserController.getById(req.params.id);
  const admin = await UserController.getById(req.params.idadmin);
  if(admin.level === 1){
    if(user){
      const availbalevalue = await verifyValueController.availableValueForUser(user.name,
                                   user.email,
                                   user.password,
                                   user.level,
                                   req.body.pass)
      if(req.body.pass != undefined && availbalevalue === true){
        user.pass = req.body.pass;
        user.lastUsePass = "null";
        user.save(function(err){
        if(err) throw err;
      });
      res.sendStatus(202);
      }
      
    }
    else{
      res.sendStatus(400);
    }
  }
  else{
    res.sendStatus(401);
  }
})
//creer un parcours
router.post('/:id/newParcours',async(req,res)=>{
    const admin = await UserController.getById(req.params.id);
  if(admin.level === 1){
    const availablevalue = await verifyValueController.availableValueForPacours(req.body.name,
                                req.body.attraction1,
                                req.body.attraction2,
                                req.body.attraction3);
    if(!availablevalue) return res.sendStatus(400)
    const newParcours = await ParcoursController.create(req.body.name,
                                req.body.attraction1,
                                req.body.attraction2,
                                req.body.attraction3);
    if(newParcours) res.sendStatus(201);
    else res.sendStatus(400);
    
  }
  else{
    res.sendStatus(401);
  }
})

      
  module.exports = router;