var mongoose = require('mongoose');
var Schema = mongoose.Schema;



var Event = new Schema({
  name_event:    { type: String, require: true },
  user_id:     { type: Number, 
              require: true 
            },
  location_lat:   { type: String },
  location_long:   { type: String },
  costs :   { type: String },
  activity:   { type: Number }, // It will be in  other "table" the name of the activity
  date: { type: String},
  date_limit: { type: Date },
  extra_info : {type: String},
  accecibility_tag : {type: String},
  number_people_needed : {type: Number},
  image_url : {type: String},
  number_people_in_event : {type: String}


});



module.exports = mongoose.model('Event', Event);