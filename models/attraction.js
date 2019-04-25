'use strict'
// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('Attraction', new Schema({ 
  name:{ type : String,
         required : true,
        },
  description: { type : String,
           required : true,
        },
  images:{ type : String,
             required : true,
        },
  type:{ type : String,
      required : true,
        },
  capacite:{ type : "Number",
      required : true,
        },
  duree:{ type : String,
      required : true,
        },
  horaireDebut:{ type : String,
      required : true,
        },
  horaireFin:{ type : String,
      required :true
  },
  acces_handicape:{ type : Boolean,
      required : true,
        },
  acces_w_adultes:{ type : Boolean,
      required : true,
        },
  maintenance:{ type : Boolean,
      required : true
      },
  last_maintenance:{ type : String,
      required : true}


}));