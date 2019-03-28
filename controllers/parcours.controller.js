'use strict'

const Parcours = require('../models').Parcours;
const StatByDayController = require('../controllers/StatByDay.controller')

class ParcoursController{

    async getById(id){
        return  Parcours.findOne({
            _id : id
        });
    };
    async create(name,att1,att2,att3){
        var newParcours = new Parcours({
            name:name,
            attraction1:att1,
            attraction2:att2,
            attraction3:att3
        })
        newParcours.save(function(err){
            if(err) throw err;
        });

        return newParcours;
    }
    async play(parcours){
        StatByDayController.addStat(parcours.attraction1);
        StatByDayController.addStat(parcours.attraction2);
        StatByDayController.addStat(parcours.attraction3);
    }

}
module.exports= new ParcoursController()