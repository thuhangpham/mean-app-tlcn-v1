'use strict';
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const City = require('../models/City.js');

var users = {
    getCityById :   (req,res)=>{
        City.findById(req.params.id)
        .then((data)=>{ res.json({ result : 1, msg : data||{}}); })
        .catch((err)=>{ res.json({ result : 0, msg : `Error: ${err}`}); })
    },

    insertCity  :   (req,res)=>{
        console.log(req.body);
        City.create(req.body)
        .then((data)=>{ res.json({ result : 1}); })
        .catch((err)=>{
            res.status(400)
            .json({ result : 0, msg : `Error: ${err}`}); 
        })
    }
};
module.exports = users;
