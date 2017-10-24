const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var ward = mongoose.Schema({
    WardId     : {type : String},
    WardName   : String,
    create_at  : { type: Date},
    last_update : {type : Date, default : Date.now()}
});
ward.pre('save', (next)=>{
    console.log("create");
    var currentDate = new Date();
    if(!this.create_at)
        this.create_at = currentDate;
    next();
});
module.exports = mongoose.model('wards', ward);