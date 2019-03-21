'use strict';

class RouterBuilder {
    build(app) {
        app.use('/tickets', require('./ticket'));
        app.use('/attraction',require('./attraction'));
    }
}

module.exports = new RouterBuilder();