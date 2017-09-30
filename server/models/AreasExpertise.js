'use strict';
const mongoose = require('mongoose');
const schema = mongoose.Schema;

var etSchema = new schema({
    name                : {type : String, unique : true, required : true },
    description         : {type : String},
    create_at           : {type : Date},
    last_update         : {type : Date, default : Date.now() },
    areas_ex_details    :
    [   
        {
            name        : {type : String, unique : true},
            description : {type : String},
            create_at   : {type : Date},
            last_update : {type : Date, default : Date.now()}
        }
    ]
});
etSchema.pre('save', (next)=>{
    if(!this.create_at)
        this.create_at = new Date();
    next();
});

module.exports = mongoose.model('areas_expertise', etSchema);