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


// CREATES A NEW USER
router.post('/signin', async(req, res)=>{
    const name = req.body.name;
    const typeName = typeof name;
    const password = req.body.password;
    const typePass = typeof password;
    const mail = req.body.email;
    const typeMail = typeof mail;
    const level = req.body.level;
    const typeLevel = typeof level;

    if (typePass !== "string" 
        ||typeName !== "string"
        ||typeMail !== "string"
        ||typeLevel !== "number")return res.sendStatus(415).end();
    if(mail === undefined 
        || name === undefined 
        || password === undefined 
        || level === undefined 
        || level > 4) return res.sendStatus(400).end();
    
    User.findOne({
            email : mail
     },function(err,result){
        if(result) res.sendStatus(403).end();
        else{
            const cryptedPassword = bcrypt.hashSync(password,5);
            const p = UserController.createUser(name,cryptedPassword,mail,level); 
              if(p === undefined) res.send(400).end();
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
                res.json({ success: false, message: 'Authentication failed. Wrong password.' });
            }
            else{

                const payload ={admin:user.email}
                var token = jwt.sign({email:mail,password:mdp},'RESTFULAPIs');

                res.json({
                    success: true,
                    message: 'Enjoy your token!',
                    token: token
                  });
            }
        } else {
            res.json({
                message: "Error while authenticating. Maybe wrong account or password.",
                error: result
            });
        }
    }).catch(function(err){
        return undefined;
    })
});

  module.exports = router;