var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var authSchema = new Schema({
   token : String,
   nsid : String
});

module.exports = mongoose.model('Auth', authSchema);