'use strict'

const datetime =require('node-datetime')
const User = require('../models/User');
const nameDay = require('../models/nameDay');

class UserController{

    async createUser(name,password,email,level,pass){
        var newUser = new User({
            name:name,
            password: password,
            email: email,
            level: level,
            pass: pass,
            lastUsePass: "null"
        });

        newUser.save(function(err){
            if(err) throw err;
        });

        return newUser;
    }

   
    async getById(id){
        return  User.findOne({
            _id : id
        });
    };
    async isAccess(user){
        if(user.level === 1)return true;
        if(user.lastUsePass === "null"){
            const date =  Date.now();
            var dateNow = datetime.create(date)
            const formatedDate = dateNow.format('d/m/Y');
            user.lastUsePass = formatedDate;
            user.save(function(err){
              if(err) throw err;
          });
          return true;
          }
          else{
            if(user.pass ==="escape_game")return false;
            if(user.pass === "journee"){
                    const date =  Date.now();
                    var dateNow = datetime.create(date)
                    const formatedDate = dateNow.format('d/m/Y');
                    if(formatedDate != user.lastUsePass){
                      return false;
                    } 
                    return true ;
            }
            if(user.pass ==="1daymonth"){
                    const lastusepass = user.lastUsePass;
                    const lastMonthUse = lastusepass.substr(3,2);
                    const date =  Date.now();
                    var dateNow = datetime.create(date)
                    const formatedDate = dateNow.format('d/m/Y');
                    const MonthDate = dateNow.format('m');
                    if(MonthDate == lastMonthUse){
                      return false;
                    }
                    else{
                      user.lastUsePass = formatedDate;
                      user.save(function(err){
                       if(err) throw err;
                      });
                      return true;
                    }
            }
            if(user.pass === "week-end"){
                    var datenow = new Date(Date.now());
                    var actualDay = datenow.getDay();
                    const actualNameDay = nameDay[actualDay];
                    if(actualNameDay == "Samedi" || actualNameDay == "Dimanche"){
                      const date =  Date.now();
                      var dateNow = datetime.create(date)
                      const formatedDate = dateNow.format('d/m/Y');
                      user.lastUsePass = formatedDate;
                      user.save(function(err){
                        if(err) throw err;
                      });
                      return true;   
                    }
                    else{
                      return false;
                    }
            }
        }
    }
}
module.exports = new UserController();