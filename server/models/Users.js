'use strict';
const mongoose = require('mongoose');
const objectId = mongoose.Schema.Types.ObjectId;
const schema = mongoose.Schema;
mongoose.Promise = global.Promise;

var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

var userSchema = new schema({
    info                :
    {
        first_name      : {type : String,  trim: true,},
        last_name       : {type : String,  trim: true,},
        gender          : {type : String},
        dob             : {type : String},
        employment_sitution : {type : objectId, ref : 'employment_sitution'},
        areas_expertise : {type : objectId, ref : 'areas_expertise'}
    },
    address_residence   :
    {
        city            : {type : String},
        district        : {type : String},
        street          : {type : String},
        suite           : {type : String}
    },
    contact             : 
    {
        email           : {
                            type : String, 
                            trim: true,
                            lowercase: true,
                            unique: true,
                            required: 'Email address is required',
                            validate: [validateEmail, 'Please fill a valid email address'],
                            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
                        },
        phone           : {type : String},
        web_page        : {type : String}
    },
    password            : {type : String,  trim: true,},
    image               : {type : String},
    create_at           : {type : Date, default : Date.now()},
    last_update         : {type : Date, default : Date.now()}
});
userSchema.virtual('fullname').get(function () {
    return this.first_name + ' ' + this.last_name;
});
userSchema.pre('create', (next)=>{
    console.log("create");
    var currentDate = new Date();
    if(!this.create_at)
        this.create_at = currentDate;
    next();
});

module.exports = mongoose.model('users', userSchema);