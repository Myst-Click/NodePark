'use strict'
// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('StatByDay', new Schema({ 
  date:{ type : String,
         required : true,
        },
  attraction: { type : String,
           required : true,
        },
  nb_use:{ type : "Number",
             required : true,
        }
}));