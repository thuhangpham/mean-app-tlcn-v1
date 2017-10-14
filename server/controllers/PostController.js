'use strict';
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Post = require('../models/Post.js');

var posts = {

    getAllPost  :   (req,res)=>{
        Post.find({})
        .then((data)=>{ res.json({ result : 1, msg : "", data : data||{}}); })
        .catch((err)=>{ res.json({ result : 0, msg : `Server error`, data:{}}); })
    },

    getPostById :   (req,res)=>{
        Post.findById(req.params.id)
        .then((data)=>{ res.json({ result : 1, msg : "", data : data||{}}); })
        .catch((err)=>{ res.json({ result : 0, msg : `Server error`, data:{}}); })
    },

    insertPost  :   (req,res)=>{
        Post.create(req.body)
        .then((data)=>{ res.json({ result : 1, msg : "", data : data||{}}); })
        .catch((err)=>{ res.json({ result : 0, msg : `Server error`, data:{}}); })
    },

    updatePost  : (req,res)=>{
        req.body.last_update = new Date();
        Post.findByIdAndUpdate(req.params.id, req.body, (err, data)=>{
            if(err) {
                res.json({result : 0, msg : `Server error`, data:{}});
            }else res.json({ result : 1, msg:"", data : data||{}});
        })
    },

    deletePost  : (req,res)=>{
        Post.findByIdAndRemove(req.params.id, req.body, (err, data)=>{
            if(err) {
                res.json({result : 0, msg : `Server error`, data:{}});
            }else res.json({ result : 1, msg:"", data : data||{}});
        })
    },
};
module.exports = posts;