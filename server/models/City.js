const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const province = require('../models/Province');

var city = mongoose.Schema({
    CityId     : {type : String},
    CityName   : String,
    create_at  : { type: Date},
    last_update : {type : Date, default : Date.now()}
});
city.pre('save', (next)=>{
    console.log("create");
    var currentDate = new Date();
    if(!this.create_at)
        this.create_at = currentDate;
    next();
});
module.exports = mongoose.model('cities', city);