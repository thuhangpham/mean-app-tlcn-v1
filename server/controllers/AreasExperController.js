'use strict';
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const AreaEx = require('../models/AreasExpertise');

var areaEx = {

    getAllAreaEx  :   (req,res)=>{
        AreaEx.find({})
        .then((data)=>{res.json({ result : 1, msg:'', data : data||{}});})
        .catch((err)=>{res.json({ result : 0, msg:'Server error', data : data||{}}); console.log(err);})
    },

    getAreaExById :   (req,res)=>{
        AreaEx.findById(req.params.id)
        .then((data)=>{ res.json({ result : 1, msg:"", data : data||{}}); })
        .catch((err)=>{ res.status(400).json({ result : 0,msg : "Server error", data:{}}); })
    },

    insertAreaEx  :   (req,res)=>{
        console.log(req.body);
        AreaEx.create(req.body)
        .then((data)=>{ res.json({ result : 1, msg:"",data : data||{}}); })
        .catch((err)=>{
            res.status(400)
            .json({ result : 0, msg : `Error: ${err}`, data:{}}); 
        })
    },

    updateAreaEx  : (req,res)=>{
        req.body.last_update = new Date();
        AreaEx.findByIdAndUpdate(req.params.id, req.body, (err, data)=>{
            if(err) {
                console.log(`Update AreaEx error ${err}`);
                res.status(400).json({result : 0, msg : `Error: ${err}`, data:{}});
            }else res.json({ result : 1, msg:"",data : data||{}});
        })
    },

    deleteAreaEx  : (req,res)=>{
        AreaEx.findByIdAndRemove(req.params.id, req.body, (err, data)=>{
            if(err) {
                console.log(`Update AreaEx error ${err}`);
                res.status(400).json({result : 0, msg : `Error: ${err}`, data:{}});
            }else res.json({ result : 1, msg:'', data : req.body||{}});
        })
    },
};
module.exports = areaEx;
