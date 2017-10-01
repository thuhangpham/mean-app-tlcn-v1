'use strict';
const mongoose = require('mongoose');
const schema = mongoose.Schema;

var cmtSchema = new schema({
    owner               : {type : mongoose.Schema.Types.ObjectId, ref : 'users'},
    content             : {type : String, trim : true},
    create_at           : {type : Date},
    last_update         : {type : Date, default : Date.now() },
    reply               : [
        {
            owner               : {type : mongoose.Schema.Types.ObjectId, ref : 'users'},
            content             : {type : String, trim : true},
            create_at           : {type : Date},
            last_update         : {type : Date, default : Date.now() }
        }
    ]
});
cmtSchema.pre('save', (next)=>{
    if(!this.create_at)
        this.create_at = new Date();
    next();
});

module.exports = mongoose.model('comment', cmtSchema);