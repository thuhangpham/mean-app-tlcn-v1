const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var country = mongoose.Schema({
    code        : {type : String, unique : true, required : 'code is required!'},
    url         : {type : String},
    name        : {type : String},
    latitude    : {type : String},
    longtitude  : {type : String},
    region      : {type : Number},
    last_update : {type : Date, default : Date.now()}
});
module.exports = mongoose.model('countries', country);