'use strict'
var fs = require('file-system');
var jwt = require('jsonwebtoken');
const Attraction = require('../models').Attraction;
const User = require('../models').User;

class AttractionController{

        async listOpenAttraction(){

          await Attraction.find({
            maintenance : false
     }, function(err,result){
        return result;
         
     })}
    
        // var query = Attraction.findOne({
         
        //     maintenance : false
            
        // })
        // query.exec(function(err,result){
        //     return result;
        // })}
        
        

    async createAttraction(name,description,image,type,capacite,duree,horaire,acces_handicape,acces_w_adultes,maintenance){
        var newAttraction = new Attraction({
            name:name,
            description: description,
            images: image,
            type: type,
            capacite: capacite,
            duree: duree,
            horaire: horaire,
            acces_handicape: acces_handicape,
            acces_w_adultes: acces_w_adultes,
            maintenance: maintenance
        });

        newAttraction.save(function(err){
            if(err) throw err;
        });

        return newAttraction;
    }
}
module.exports = new AttractionController();