'use strict';
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const EmploySituation = require('../models/EmploymentSituation');

var employSituation = {

    getAllEmploySituation  :   (req,res)=>{
        EmploySituation.find({})
        .then((data)=>{ res.json({ result : 1, msg : "", data : data||{}}); })
        .catch((err)=>{ res.json({ result : 0, msg : `Server error`, data:{}}); })
    },

    getEmploySituationById :   (req,res)=>{
        EmploySituation.findById(req.params.id)
        .then((data)=>{ res.json({ result : 1, msg : "", data : data||{}}); })
        .catch((err)=>{ res.json({ result : 0, msg : `Server error`, data:{}}); })
    },

    insertEmploySituation  :   (req,res)=>{
        console.log(req.body);
        EmploySituation.create(req.body)
        .then((data)=>{ res.json({ result : 1, msg:"",data : data||{}}); })
        .catch((err)=>{
            res.status(400)
            .json({ result : 0, msg : `Server error`, data:{}}); 
        })
    },

    updateEmploySituation  : (req,res)=>{
        req.body.last_update = new Date();
        EmploySituation.findByIdAndUpdate(req.params.id, req.body, (err, data)=>{
            if(err) {
                console.log(`Update EmploySituation error ${err}`);
                res.status(400).json({result : 0, msg : `Error: ${err}`, data:{}});
            }else res.json({ result : 1, msg:"",data : data||{}});
        })
    },

    deleteEmploySituation  : (req,res)=>{
        EmploySituation.findByIdAndRemove(req.params.id, req.body, (err, data)=>{
            if(err) {
                console.log(`Update EmploySituation error ${err}`);
                res.status(400).json({result : 0, msg : `Error: ${err}`, data:{}});
            }else res.json({ result : 1, msg:"", data : req.body||{}});
        })
    },
};
module.exports = employSituation;
