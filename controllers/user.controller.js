'use strict'
var fs = require('file-system');
var jwt = require('jsonwebtoken');
const User = require('../models/User');

class UserController{

    async createUser(name,password,email,level){
        var newUser = new User({
            name:name,
            password: password,
            email: email,
            level: level
        });

        newUser.save(function(err){
            if(err) throw err;
        });

        return newUser;
    }

    async availableValues(name,mail,password,level){
    const typeName = typeof name;
    const typePass = typeof password;
    const typeMail = typeof mail;
    const typeLevel = typeof level;

    if (typePass !== "string" 
        ||typeName !== "string"
        ||typeMail !== "string"
        ||typeLevel !== "number") return false;

    if(mail === undefined 
        || name === undefined 
        || password === undefined 
        || level === undefined 
        || level > 2) return false;

    return true;
    }
    async getById(id){
        return  User.findOne({
            _id : id
        });
    };
}
module.exports = new UserController();