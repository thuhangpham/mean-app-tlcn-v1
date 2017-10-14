const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var areaExDetail = mongoose.Schema({
    name        : {type : String, unique : true, required : 'Name is required!'},
    description : {type : String},
    create_at   : {type : Date},
    last_update : {type : Date, default : Date.now()}
});
areaExDetail.pre('save', (next)=>{
    console.log("create");
    var currentDate = new Date();
    if(!this.create_at)
        this.create_at = currentDate;
    next();
});

module.exports = mongoose.model('area_ex_detail', areaExDetail);