'use strict';
const mongoose = require('mongoose');
const schema = mongoose.Schema;

var esSchema = new schema({
    name                : {type : String, unique : true, required : true },
    description         : {type : String},
    create_at           : {type : Date},
    last_update         : {type : Date, default : Date.now() }
});
esSchema.pre('save', (next)=>{
    if(!this.create_at)
        this.create_at = new Date();
    next();
});

module.exports = mongoose.model('employment_situation', esSchema);