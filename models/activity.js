var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var Activity = new Schema({
  type:    { type: String, require: true },
  frequency:    { type: Number
            },
  description:    { type: String },

});


module.exports = mongoose.model('Activity', Activity);