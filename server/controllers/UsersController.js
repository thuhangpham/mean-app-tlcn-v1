'use strict';
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Users = require('../models/Users.js');

var users = {

    getAllUser  :   (req,res)=>{
        Users.find({})
        .then((data)=>{res.json({ result : 1, msg : data||{}});})
        .catch((err)=>{res.json({ result : 0, msg : data||{}}); console.log(err);})
    },

    getUserById :   (req,res)=>{
        Users.findById(req.params.id)
        .then((data)=>{ res.json({ result : 1, msg : data||{}}); })
        .catch((err)=>{ res.json({ result : 0, msg : `Error: ${err}`}); })
    },

    insertUser  :   (req,res)=>{
        Users.create(req.body)
        .then((data)=>{ res.json({ result : 1, msg : data||{}}); })
        .catch((err)=>{ res.json({ result : 0, msg : `Error: ${err}`}); })
    },

    updateUser  : (req,res)=>{
        req.body.last_update = new Date();
        Users.findByIdAndUpdate(req.params.id, req.body, (err, data)=>{
            if(err) {
                console.log(`Update user error ${err}`);
                res.json({result : 0, msg : `Error: ${err}`});
            }else res.json({ result : 1, msg : data||{}});
        })
    },

    deleteUser  : (req,res)=>{
        Users.findByIdAndRemove(req.params.id, req.body, (err, data)=>{
            if(err) {
                console.log(`Update user error ${err}`);
                res.json({result : 0, msg : `Error: ${err}`});
            }else res.json({ result : 1, msg : req.body||{}});
        })
    },
};
module.exports = users;