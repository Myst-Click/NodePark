'use strict';

const models = require('../models');
const sequelize = models.sequelize;
const Attraction = models.Attraction;

class AttractionController {

    async addAttraction(name,description,image,type,
                    capacite,duree,horaire,acces_handicape,
                acces_adultes,in_maintenance) {
        return Attraction.create({
           name,
           description,
           image,
           type,
           capacite,
           duree,
           horaire,
           acces_handicape,
           acces_adultes,
           in_maintenance
        });
    }

    async getAttractionById(id) {
        return Attraction.findOne({
            where: {
                id: id
            }
        });
    }

}

module.exports = new AttractionController();