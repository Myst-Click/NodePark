'use strict'
var express = require('express');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
var router = express.Router();
const app = express();
var bodyParser = require('body-parser');
const mongoose = require('mongoose')
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
const User = require('../models').User
const UserController = require('../controllers/user.controller')
const AttractionController = require('../controllers/attraction.controller')
const Attraction = require('../models').Attraction

//verify user
router.use(function(req, res, next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (token) {
      jwt.verify(token, 'RESTFULAPIs', function(err, decoded) {       
          if (err) {
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
// new Application
router.post('/new', async(req, res)=>{
    const name = req.body.name;
    const typeName = typeof name;
    const description = req.body.description;
    const typeDescription = typeof description;
    const images = req.body.images;
    const typeImage = typeof images;
    const type = req.body.type;
    const typeType = typeof type;
    const duree = req.body.duree;
    const typeDuree = typeof duree;
    const capacite = req.body.capacite;
    const typeCapacite = typeof capacite;
    const horaire = req.body.horaire;
    const typeHoraire = typeof horaire;
    const acces_handicape = req.body.acces_handicape;
    const typeHandicap = typeof acces_handicape;
    const acces_w_adultes = req.body.acces_w_adultes;
    const typeAdultes = typeof acces_w_adultes;
    const maintenance = req.body.maintenance;
    const typeMaintenance = typeof maintenance;

    if (typeName !== "string" 
        ||typeDescription !== "string"
        ||typeImage !== "string"
        ||typeType !== "string"
        ||typeDuree !== "string"
        ||typeCapacite !== "number"
        ||typeHoraire !== "string"
        ||typeHandicap !== "boolean"
        ||typeAdultes !== "boolean"
        ||typeMaintenance !== "boolean")return res.sendStatus(415).end();
    if(name === undefined 
        || description === undefined 
        || images === undefined 
        || type === undefined 
        || capacite === undefined 
        || horaire === undefined 
        || duree === undefined 
        || acces_handicape === undefined 
        || acces_w_adultes === undefined 
        || maintenance === undefined ) return res.sendStatus(400).end();
    
    const p = await AttractionController.createAttraction(name,description,images,type,capacite,duree,horaire,acces_handicape,acces_w_adultes,maintenance);
    if(p === undefined) res.send(400).end();
    else res.sendStatus(201).end();
  
   });

   router.get('/available',async(req,res)=>{
     const p =  await AttractionController.listOpenAttraction();
     res.json(Promise.resolve(p));
     AttractionController.listOpenAttraction().then(console.log);
   })

   module.exports = router;