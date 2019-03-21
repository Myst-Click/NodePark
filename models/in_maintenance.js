'use strict';
module.exports = (sequelize, DataTypes) => {
  const In_maintenance = sequelize.define('In_maintenance', {
    Id_attraction: {
      type: DataTypes.INTEGER,
      unique: true,
      allowNull: false
    } 
  }, {
    freezeTableName: true,
    paranoid: true,
    underscored: true
  });
  
  return In_maintenance;
};