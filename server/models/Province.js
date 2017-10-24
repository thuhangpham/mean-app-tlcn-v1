const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const ward = require('../models/Ward');

var province = mongoose.Schema({
    ProvinceId     : {type : String},
    ProvinceName   : String,
    create_at  : { type: Date},
    last_update : {type : Date, default : Date.now()}
});
province.pre('save', (next)=>{
    console.log("create");
    var currentDate = new Date();
    if(!this.create_at)
        this.create_at = currentDate;
    next();
});
module.exports = mongoose.model('provinces', province);