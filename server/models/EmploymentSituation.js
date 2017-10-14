'use strict';
const mongoose = require('mongoose');
const schema = mongoose.Schema;

var esSchema = new schema({
    name                : {type : String, unique : true, trim: true, required: 'Name is required' },
    description         : {type : String, trim: true},
    create_at           : {type : Date},
    last_update         : {type : Date, default : Date.now() }
});
esSchema.pre('create', (next)=>{
    console.log("create");
    var currentDate = new Date();
    if(!this.create_at)
        this.create_at = currentDate;
    next();
});
module.exports = mongoose.model('employment_situation', esSchema);