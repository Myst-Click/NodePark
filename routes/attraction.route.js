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
          return res.json({ success: false, message: 'Veuillez entrer un token valable' });       }
          else {
          req.decoded = decoded;
          next();
          }
      });
    } else {
      return res.status(403).send({ 
          success: false, 
          message: 'Aucun token envoyé' 
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
    const horaireDebut = req.body.horaireDebut;
    const horaireFin = req.body.horaireFin
    const acces_handicape = req.body.acces_handicape;
    const acces_w_adultes = req.body.acces_w_adultes;
    const maintenance = req.body.maintenance;
   
    const result = verifyValueController.availableValueForAttraction(name,description,images,type,duree,
                                                        capacite, horaireDebut,horaireFin, acces_handicape,acces_w_adultes,maintenance)
    if(!result){ res.sendStatus(415);
                 res.json({
                    success : false,
                    message : "Erreur de syntaxe"
                  });
              }


    const p = await AttractionController.createAttraction(name,description,images,type,capacite,duree,horaireDebut,horaireFin,acces_handicape,acces_w_adultes,maintenance);
    if(p === undefined){
      res.send(400);
      res.json({
        success : false,
        message : "Impossible de creer cet utilisateur"
      });
    } 
    else{
      res.sendStatus(201).end;
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
       res.json({
        success : false,
        message : "Erreur de listage"
      });
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
      res.json({
        success : false,
        message : "Erreur de listage"
      });
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
       res.json({
        success : false,
        message : "Vous ne possédez les droits administrateur"
      });
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
       res.json({
        success : false,
        message : "Vous ne possédez pas les droits administrateur"
      });
     }
   })


   module.exports = router;