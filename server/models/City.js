const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var city = mongoose.Schema({
    city     : {type : String},
    province      : {type : String},
    area         : {type : String},
    name        : {type : Number},
    population    : {type : String},
    longtitude  : {type : String},
    last_update : {type : Date, default : Date.now()}
});
module.exports = mongoose.model('cities', city);