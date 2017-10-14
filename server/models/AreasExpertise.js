'use strict';
const mongoose = require('mongoose');
const schema = mongoose.Schema;
const areaaExDetail = require('./AreasExpertiseDetail');

var etSchema = new schema({
    name                : {type : String, unique : true, required : 'Name is required!' },
    description         : {type : String},
    create_at           : {type : Date},
    last_update         : {type : Date, default : Date.now() },
    areas_ex_details    : [ areaaExDetail.schema ]
});
etSchema.pre('save', (next)=>{
    console.log("save");
    var currentDate = new Date();
    if(!this.create_at)
        this.create_at = currentDate;
    console.log(this.create_at);
    next();
});
module.exports = mongoose.model('areas_expertise', etSchema);
