'use strict';
const bcrypt = require('bcrypt');
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
        first_name      : {type : String,  trim: true, required: 'Firs name is required'},
        last_name       : {type : String,  trim: true, required: 'Last name is required'},
        gender          : {type : String},
        dob             : {type : Date},
        employment_sitution : {type : objectId, ref : 'employment_sitution'},
        areas_expertise : {type : objectId, ref : 'areas_expertise'}
    },
    address_residence   :
    {
        city            : {type : String},
        district        : {type : String},
        ward            : {type : String},
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
        phone           : {type : String, trim: true, required: 'Phone is required'},
        web_page        : {type : String}
    },
    password            : {type : String,  trim: true, required: 'Password is required'},
    image               : {type : String},
    create_at           : {type : Date},
    last_update         : {type : Date, default : Date.now()}
});
userSchema.virtual('fullname').get(function () {
    return this.first_name + ' ' + this.last_name;
});
userSchema.pre('save', (next)=>{
    console.log("create");
    var currentDate = new Date();
    if(!this.create_at)
        this.create_at = currentDate;
    next();
});
userSchema.methods.comparePassword = function(candidatePassword,pwd, callback) {
  console.log(this.password);
    bcrypt.compare(candidatePassword, pwd, function(err, isMatch) {
        if (err) return callback(err, false);
        callback(null, isMatch);
    });
};
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};
module.exports = mongoose.model('users', userSchema);
