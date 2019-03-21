'use strict';

const express = require('express');
const models = require('./models');
const RouteBuilder = require('./routes');

models.sequelize.authenticate().then(() => {
    return models.sequelize.sync();
});

const app = express();

RouteBuilder.build(app);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening ${port}...`));