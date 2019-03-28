'use strict'

const Attraction = require('../models').Attraction;
const datetime = require('node-datetime')

class AttractionController{

        async listOpenAttraction(){
          return await Attraction.find({
            maintenance : false
            });
        }
        async listMaintenanceAttraction(){
            return await Attraction.find({
                maintenance : true
            });
        }    
        async sendMaintenance(id){
           var attraction = await Attraction.findOne({
                _id : id
            });
            if(attraction.maintenance === true){
                const p = "Maintenance déja effective";
                return p;
            }
            else{
                attraction.maintenance = true;
                const date =  Date.now();
                var dateNow = datetime.create(date)
                const formatedDate = dateNow.format('d/m/Y');
                attraction.last_maintenance = formatedDate;
                attraction.save(function(err){
                    if(err) throw err;
                });
                const p = "Maintenance accéptée";
                return p;
            }
        }
        async sendAvailable(id){
            var attraction = await Attraction.findOne({
                 _id : id
             });
             if(attraction.maintenance === false){
                 const p = "Attraction déja opérationnelle";
                 return p;
             }
             else{
                 attraction.maintenance = false;
                 attraction.save(function(err){
                     if(err) throw err;
                 });
                 const p = "Attraction de nouveau opérationnelle";
                 return p;
             }
         }
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
            maintenance: maintenance,
            last_maintenance : "null"
        });

        newAttraction.save(function(err){
            if(err) throw err;
        });

        return newAttraction;
        }
        async getById(id){
            return  Attraction.findOne({
                _id : id
            });
        };
}
module.exports = new AttractionController();