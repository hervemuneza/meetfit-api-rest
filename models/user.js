var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var User = new Schema({
  name:    { type: String, require: true },
  gender:    { type: String, 
              enum:  ['male', 'female'],
              require: true 
            },
  age:     { type: Number, 
              require: true 
            },
  role:     { type: String, 
  			  enum:  ['admin', 'premium'],
              require: true 
            },
  location_lat:   { type: String },
  location_long:   { type: String },
  location_name:   { type: String }
});



module.exports = mongoose.model('User', User);