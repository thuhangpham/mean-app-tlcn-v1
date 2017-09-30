'use strict';
const mongoose = require('mongoose');
const objectId = mongoose.Schema.Types.ObjectId;
const schema = mongoose.Schema;

var postSchema = new schema({
    owner       : {type : objectId, ref : 'users'},
    title       : {type : String, required : true},
    desciption  : {type : String},
    start_date  : Date,
    end_date    : Date,
    number      : Number,
    content     :
    {
        tasks   : String,
        objective: String,
        requirement: String,
        comment : String
    },
    location    :
    {
        lat    : String,
        long   : String,
        city   : String,
        district : String,
        street : String,
        house_number : Number
    },

});
postSchema.pre('save', (next)=>{
    if(!this.create_at)
        this.create_at = new Date();
    next();
});

module.exports = mongoose.model('post', postSchema);