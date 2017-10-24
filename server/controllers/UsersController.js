'use strict';
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Users = require('../models/Users.js');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const gravatar = require('gravatar');

var users = {

    getAllUser: (req, res) => {
        Users.find({})
            .then((data) => { res.json({ result: 1, msg: "", data: data || {} }); })
            .catch((err) => { res.json({ result: 0, msg: 'Server error', data: {} }); console.log(err); })
    },

    getUserById: (req, res) => {
        Users.findById(req.params.id)
            .then((data) => { res.json({ result: 1, msg: "", data: data || {} }); })
            .catch((err) => { res.json({ result: 0, msg: `Server error`, data: {} }); })
    },

    insertUser: (req, res) => {
        Users.findOne({'contact.email':req.body.contact.email})
        .then(user=>{
            if(user){
                res.json({ result: 0, msg: "User already exists!", data: {} });
            }else{
                console.log(req.body);
                var hash = Users.schema.methods.generateHash(req.body.password);
                req.body.password = hash;
                req.body.image = gravatar.url(req.body.contact.email, {s: '100'}, false) || '';
                console.log(req.body.password);
                Users.create(req.body)
                    .then((data) => { res.json({ result: 1, msg: "", data: data || {} }); })
                    .catch((err) => {
                        console.log(err);
                        res.json({ result: 0, msg: `${err}`, data: {} });
                    })
            }
        }).catch(err=>{res.json({ result: 0, msg: `${err}`, data: {} });})
    },

    updateUser: (req, res) => {
        req.body.last_update = new Date();
        Users.findByIdAndUpdate(req.params.id, req.body, (err, data) => {
            if (err) {
                console.log(`Update user error ${err}`);
                res.json({ result: 0, msg: `Error: ${err}` });
            } else res.json({ result: 1, msg: data || {} });
        })
    },

    deleteUser: (req, res) => {
        Users.findByIdAndRemove(req.params.id, req.body, (err, data) => {
            if (err) {
                console.log(`Update user error ${err}`);
                res.json({ result: 0, msg: `Error: ${err}`, data: {} });
            } else res.json({ result: 1, msg: "", data: req.body || {} });
        })
    },
    authentication: (req, res) => {
        console.log("body: " + JSON.stringify(req.body));
        if(req.body)
        Users.findOne({ "contact.email": req.body.email }, (err, user) => {
            if (err) {
                console.log(err);
                res.json({ result: 0, msg: 'Email or Password incorrect!', data: {} });
            }
            if (user){
                Users.schema.methods.comparePassword(req.body.password, user.password, function (err, isMatch) {
                    if (err) {
                        console.log(err);
                        res.json({ result: 0, msg: 'Server error!', data: {} });
                    }
                    else
                        if (isMatch) {
                            
                            let token = jwt.sign({data: user}, config.JWT_SECRET, {
                                expiresIn: 600 // expires in *1 min
                            });
                            res.json({ result: 1, msg: 'Login successful!', data: user, token:token });
                        }
                        else res.json({ result: 0, msg: 'Password incorrect!', data: {} });
                    console.log("Password " + req.body.password, isMatch); //
                });
            }
            else {
                res.json({ result: 0, msg: 'Account not exist! Please try again!', data: {} });
            }
            console.log(user);
        })
        else res.json({ result: 0, msg: 'Request error', data: {} });
    },
    verify      :(req,res)=>{
        let content = {
            result: 1,
            msg: "Successfully logged in."
          }
          console.log(content);
          res.json(content);
    }
};
module.exports = users;
