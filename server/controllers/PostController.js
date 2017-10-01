'use strict';
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Post = require('../models/Post.js');

var posts = {

    getAllPost  :   (req,res)=>{
        Post.find({})
        .then((data)=>{res.json({ result : 1, msg : data||{}});})
        .catch((err)=>{res.json({ result : 0, msg : data||{}}); console.log(err);})
    },

    getPostById :   (req,res)=>{
        Post.findById(req.params.id)
        .then((data)=>{ res.json({ result : 1, msg : data||{}}); })
        .catch((err)=>{ res.json({ result : 0, msg : `Error: ${err}`}); })
    },

    insertPost  :   (req,res)=>{
        Post.create(req.body)
        .then((data)=>{ res.json({ result : 1, msg : data||{}}); })
        .catch((err)=>{ res.json({ result : 0, msg : `Error: ${err}`}); })
    },

    updatePost  : (req,res)=>{
        req.body.last_update = new Date();
        Post.findByIdAndUpdate(req.params.id, req.body, (err, data)=>{
            if(err) {
                res.json({result : 0, msg : `Error: ${err}`});
            }else res.json({ result : 1, msg : data||{}});
        })
    },

    deletePost  : (req,res)=>{
        Post.findByIdAndRemove(req.params.id, req.body, (err, data)=>{
            if(err) {
                res.json({result : 0, msg : `Error: ${err}`});
            }else res.json({ result : 1, msg : req.body||{}});
        })
    },
};
module.exports = posts;