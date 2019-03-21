'use strict';
module.exports = (sequelize, DataTypes) => {
  const Attraction = sequelize.define('Attraction', {
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    description :{
      type:  DataTypes.STRING,
      allowNull : false
    }, 
    image : {
      type: DataTypes.STRING,
      allowNull : true 
    },
    type : {
        type: DataTypes.STRING,
        allowNull : false 
      },
    capacite : {
        type: DataTypes.INTEGER,
        allowNull : false 
      },
    duree : {
        type: DataTypes.STRING,
        allowNull : false 
      },
    horaire : {
        type: DataTypes.STRING,
        allowNull : false 
      },
    acces_handicape : {
        type: DataTypes.BOOLEAN,
        allowNull : false 
      },
    acces_adultes : {
        type: DataTypes.BOOLEAN,
        allowNull : false 
      },
    in_maintenance :{
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
  }, {
    freezeTableName: true,
    paranoid: true,
    underscored: true
  });
  
  return Attraction;
};