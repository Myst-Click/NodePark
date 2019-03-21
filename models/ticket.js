'use strict';
module.exports = (sequelize, DataTypes) => {
  const Ticket = sequelize.define('Ticket', {
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    level: DataTypes.INTEGER  
  }, {
    freezeTableName: true,
    paranoid: true,
    underscored: true
  });
  
  return Ticket;
};