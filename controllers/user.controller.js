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
}
module.exports = new UserController();