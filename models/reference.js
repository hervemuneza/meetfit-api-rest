var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var Reference = new Schema({
  type:    { type: String, require: true },
  text:    { type: String }
});


module.exports = mongoose.model('Reference', Reference);