'use strict'
var express = require('express');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
var router = express.Router();

var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
const User = require('../models').User;
const UserController = require('../controllers/user.controller')
const verifyValueController = require('../controllers/verifyValue')


// CREATES A NEW USER
router.post('/signin', async(req, res)=>{
    const result = await verifyValueController.availableValueForUser(req.body.name,req.body.email,req.body.password,req.body.level,req.body.pass)
    if(!result)return res.sendStatus(400).end();
    
    User.findOne({
            email : req.body.email
     },function(err,result){
        if(result) res.json({
            success : false,
            message : "Email deja utilisé"
            });
        else{
            const cryptedPassword = bcrypt.hashSync(req.body.password,5);
            const p = UserController.createUser(req.body.name,cryptedPassword,req.body.email,req.body.level,req.body.pass); 
              if(p === undefined) res.json({
                success : false,
                message : "Impossible de creer cet utilisateur, veuillez vérifier la syntaxe"
                });
              else res.sendStatus(201).end();
        }
     })
   });

//Log User
router.post('/login',async(req,res)=>{
    const mail = req.body.email;
    const mdp = req.body.password;

    User.findOne({
           email : mail
    }).then(function(user,err){
        if(err) throw err;
        if(user){
            const t = bcrypt.compareSync(mdp,user.password);
            if(!bcrypt.compareSync(mdp,user.password)){
                res.status(404);
                res.json({ success: false, message: 'Mot de passe incorrect' });
            }
            else{
                var token = jwt.sign({email:mail,password:mdp},'RESTFULAPIs');

                res.json({
                    success: true,
                    message: 'Authentification reussie',
                    token: token
                  });
            }
        } else {
            res.json({
                message: "mot de passe ou email incorrect",
                error: result
            });
        }
    }).catch(function(err){
        return undefined;
    })
});

  module.exports = router;