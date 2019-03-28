'use strict'
const Attraction = require('../models').Attraction
const Parcours = require('../models').Parcours
class verifyValueController{

    availableValueForAttraction(name,description,images,type,duree,capacite,horaire,
        acces_handicape,acces_w_adultes,maintenance){
            const typeName = typeof name;
            const typeDescription = typeof description;
            const typeImage = typeof images;
            const typeType = typeof type;
            const typeDuree = typeof duree;
            const typeCapacite = typeof capacite;
            const typeHoraire = typeof horaire;
            const typeHandicap = typeof acces_handicape;
            const typeAdultes = typeof acces_w_adultes;
            const typeMaintenance = typeof maintenance;

            if (typeName !== "string" 
            ||typeDescription !== "string"
            ||typeImage !== "string"
            ||typeType !== "string"
            ||typeDuree !== "string"
            ||typeCapacite !== "number"
            ||typeHoraire !== "string"
            ||typeHandicap !== "boolean"
            ||typeAdultes !== "boolean"
            ||typeMaintenance !== "boolean") return false;

            if(name === undefined 
                || description === undefined 
                || images === undefined 
                || type === undefined 
                || capacite === undefined 
                || horaire === undefined 
                || duree === undefined 
                || acces_handicape === undefined 
                || acces_w_adultes === undefined 
                || maintenance === undefined ) return false
    return true;
    }
    async availableValueForUser(name,email,password,level,pass){
        const typeName = typeof name;
        const typePass = typeof password;
        const typeMail = typeof email;
        const typeLevel = typeof level;
    
        if (typePass !== "string" 
            ||typeName !== "string"
            ||typeMail !== "string"
            ||typeLevel !== "number") return false;
    
        if(email === undefined 
            || name === undefined 
            || password === undefined 
            || level === undefined 
            || level > 2) return false;
    
        if(pass != undefined){
            if(pass != "journee" && pass !="week-end" && pass !="1daymonth" && pass != "annuel" && pass != "escape_game") return false;
        }
    
        return true;
    }
    async availableValueForPacours(name,attraction1,attraction2,attraction3){
        const result1 = await Attraction.findOne({
            name : attraction1
        })
        const result2 = await Attraction.findOne({
            name : attraction2
        })
        const result3 = await Attraction.findOne({
            name : attraction3
        })
        const parcours = await Parcours.findOne({
            name : name
        })
        if(result1 === undefined || result2 === undefined || result3 === undefined || parcours != undefined) return false;
        const typeName = typeof name;
        const typeA1 = typeof attraction1;
        const typeA2 = typeof attraction2;
        const typeA3 = typeof attraction3;

        if(typeName != "string" ||
        typeA1 != "string" ||
        typeA2 != "string" ||
        typeA3 != "string" ) return false;
        return true;
    }
}
module.exports = new verifyValueController()