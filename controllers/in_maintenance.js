'use strict';

const models = require('../models');
const sequelize = models.sequelize;
const Project = models.Project;

class ProjectController {

    async addProject(name, date, owner) {
        return Project.create({
           name,
           date,
           owner
        });
    }

    async getProject(id) {
        return Project.findOne({
            where: {
                id: id
            }
        });
    }

}

module.exports = new ProjectController();