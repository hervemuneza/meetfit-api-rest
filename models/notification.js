var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var Notification = new Schema({
  text:    { type: String, require: true },
  status:    { type: String, 
              enum:  ['readed', 'unreaded'],
              require: true 
            },
  user_id:     { type: Number, 
              require: true 
            },
  tag:   { type: String },
  date: { type: Date, default: Date.now }    
});


module.exports = mongoose.model('Notification', Notification);