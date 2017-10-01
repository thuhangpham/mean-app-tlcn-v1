'use strict';
const mongoose = require('mongoose');
const objectId = mongoose.Schema.Types.ObjectId;
const schema = mongoose.Schema;
const comment = require('./comment.js');

var postSchema = new schema({
    owner       : {type : objectId, ref : 'users'},
    title       : {type : String, required : 'Title is required!'},
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
    comments    : [comment.schema],
    Areas_expertise_id : {type : objectId}

});
postSchema.pre('save', (next)=>{
    if(!this.create_at)
        this.create_at = new Date();
    next();
});

module.exports = mongoose.model('post', postSchema);