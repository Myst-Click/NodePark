'use strict'

const datetime = require('node-datetime')
const StatByDay = require('../models').StatByDay
const StatByWeekController = require('../controllers/StatByWeek.controller')

const date =  Date.now();
var dateNow = datetime.create(date)
const formatedDate = dateNow.format('d/m/Y');

class StatByDayController{
    async addStat(attraction)
    {
        var result =  await StatByDay.findOne({
                date : formatedDate,
                attraction: attraction
        });
        if(result){
            result.nb_use += 1;
            result.save(function(err){
                if(err) throw err;
            });
            StatByWeekController.addStatOnWeek(attraction);
            return true;
        }
        else{
            var newStat = new StatByDay({
                date : formatedDate,
                attraction : attraction,
                nb_use : 1
            });
            newStat.save(function(err){
                if(err) throw err;
            })
            StatByWeekController.addStatOnWeek(attraction);
            return true;
        }
    }
}
module.exports = new StatByDayController();