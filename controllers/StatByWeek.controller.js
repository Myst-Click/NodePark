'use strict'

const datetime = require('node-datetime')
const StatByWeek = require('../models').StatByWeek

class StatByWeekController{
    async addStatOnWeek(attraction){
        var dateToday = new Date(Date.now());
            var diff = dateToday.getDate() - dateToday.getDay() + (dateToday.getDay() === 0 ? -6 : 1);
            var weekDay = new Date(dateToday.setDate(diff));
            const newweekDay = datetime.create(weekDay);
            const weekDayFormat = newweekDay.format('d/m/y');
            var statWeek = await StatByWeek.findOne({
                date : weekDayFormat,
                attraction : attraction
            });
            if(statWeek){
                statWeek.nb_use += 1;
                statWeek.save(function(err){
                    if(err) throw err;
                });
            }
            else{
                var newStatWeek = new StatByWeek({
                    date : weekDayFormat,
                    attraction : attraction,
                    nb_use : 1
                });
                newStatWeek.save(function(err){
                    if(err) throw err;
                })
            }
    }
}
module.exports = new StatByWeekController();
