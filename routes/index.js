'use strict';

class RouterBuilder {
    build(app) {  
        app.use('/user',require('./user.route'));  
        app.use('/auth',require('./auth.route'));
        app.use('/attraction',require('./attraction.route'));  
        app.use('/admin',require('./admin.route'));
    }
}

module.exports = new RouterBuilder();