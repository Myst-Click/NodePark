'use strict'
var express = require('express');
const jwt = require('jsonwebtoken')
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
const UserController = require('../controllers/user.controller')
const AttractionController = require('../controllers/attraction.controller')
const verifyValueController = require('../controllers/verifyValue')

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
// new Attraction
router.post('/new', async(req, res)=>{
    const name = req.body.name;
    const description = req.body.description;
    const images = req.body.images;
    const type = req.body.type;
    const duree = req.body.duree;
    const capacite = req.body.capacite;
    const horaire = req.body.horaire;
    const acces_handicape = req.body.acces_handicape;
    const acces_w_adultes = req.body.acces_w_adultes;
    const maintenance = req.body.maintenance;
   
    const result = verifyValueController.availableValueForAttraction(name,description,images,type,duree,
                                                        capacite, horaire, acces_handicape,acces_w_adultes,maintenance)
    if(!result)return res.sendStatus(415).end();
    

    const p = await AttractionController.createAttraction(name,description,images,type,capacite,duree,horaire,acces_handicape,acces_w_adultes,maintenance);
    if(p === undefined) res.send(400).end();
    else{
      // p.images.data = fs.readFileSync(images);
      // p.images.contentType = 'image/png';
      // p.save(function(err,a){
      //   if(err)throw err;
      // })
      res.sendStatus(201).end();
    } 
  
   });
   //LISTER LES ATTRAACTIONS OUVERTES
   router.get('/available/:id',async(req,res)=>{

     const user = await UserController.getById(req.params.id);
     if(user.level === 1){
     const p = await AttractionController.listOpenAttraction();
     res.json(p);
     }
     else{
       res.sendStatus(403);
     }
   })
   //Lister les attractions fermées
   router.get('/inmaintenance/:id',async(req,res)=>{

    const user = await UserController.getById(req.params.id);
    if(user.level === 1){
    const p = await AttractionController.listMaintenanceAttraction();
    res.json(p);
    }
    else{
      res.sendStatus(403);
    }
  })
   //METTRE EN FONCTIONNEMENT
   router.post('/available/:id/:idAttraction',async(req,res)=>{

    const user = await UserController.getById(req.params.id);
     if(user.level === 1){
     const p = await AttractionController.sendAvailable(req.params.idAttraction);
     res.json(p);
     }
     else{
       res.sendStatus(403);
     }
   })
   //METTRE EN MAINTENANCE
   router.post('/maintenance/:id/:idAttraction',async(req,res)=>{

     const user = await UserController.getById(req.params.id);
     if(user.level === 1){
     const p = await AttractionController.sendMaintenance(req.params.idAttraction);
     res.json(p);
     }
     else{
       res.sendStatus(403);
     }
   })


   module.exports = router;