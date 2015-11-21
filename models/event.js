var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Image = new Schema({
    kind: {
        type: String
    },
    url: { type: String, required: true }
});


var Event = new Schema({
  Name:    { type: String, require: true },
  status:    { type: String, 
              enum:  ['readed', 'unreaded'],
              require: true 
            },
  user_id:     { type: Number, 
              require: true 
            },
  tag:   { type: String },
  location:   { lat : {type: String }, log: {type: String} } ,
  costs :   { type: String },
  activity:   { type: Number }, // It will be in  other "table" the name of the activity
  date: { type: Date},
  date_limit: { type: Date },
  extra_info : {type: String},
  accecibility_tag : {type: String},
  number_people_needed : {type: Number},
  image : [Image]


});



module.exports = mongoose.model('Event', Event);