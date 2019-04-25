'use strict'

var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const datetime = require('node-datetime')
const StatByDayController = require('../controllers/StatByDay.controller')
const UserController = require('../controllers/user.controller');
const AttractionController = require('../controllers/attraction.controller');
const ParcoursController = require('../controllers/parcours.controller')

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
//faire une attraction
router.get('/:iduser/attraction/:id',async(req,res)=>{
  const user = await UserController.getById(req.params.iduser);
  const attraction = await AttractionController.getById(req.params.id);
  const horaireDebut = attraction.horaireDebut;
  const horaireFin = attraction.horaireFin;
  const horaireNow = new Date();
  const availableAttraction = await AttractionController.isAccess(horaireDebut,horaireFin,horaireNow);
  if(availableAttraction){
    const result = await UserController.isAccess(user);
  
 
    if(result){
      await StatByDayController.addStat(attraction.name);
      res.sendStatus(202);
    } 
    else res.json({
      success : false,
      message : "Votre pass ne vous permet pas d'accéder à cette attraction"
    });
  }
  else res.json({
    success : false,
    message : "L'attraction demandée n'est pas accessible"
  })
    
})
//faire un parcours
router.get('/:iduser/parcours/:id',async(req,res)=>{
  const user = await UserController.getById(req.params.iduser);
  const parcours = await ParcoursController.getById(req.params.id);
  if(user.pass === "escape_game"){
    const access = await UserController.isAccess(user);
    if(!access) return res.json({
                        success : false,
                        message : "Votre pass ne vous permet pas d'accéder à ce parcours"
                        });
    await ParcoursController.play(parcours);
    return res.sendStatus(200)
  }
  else return res.json({
              success : false,
              message : "Votre pass ne vous permet pas d'accéder à ce parcours"
              });
})
//changer ses attributs
router.post('/:id/settings',async(req,res)=>{
  const user = await UserController.getById(req.params.id);
  if(user){
    if(req.body.name != undefined)user.name = req.body.name;
    if(req.body.password != undefined){
      const cryptedPassword = bcrypt.hashSync(req.body.password,5);
      user.password = cryptedPassword;
    }
    user.save(function(err){
      if(err) throw err;
    });
    res.sendStatus(202);
  }
  else{
    res.json({
      success : false,
      message : "Email et/ou mot de passe incorrect"
      });
  }
})  



  module.exports = router;