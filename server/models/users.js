const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');
require('./../config/config');


var userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim:true,
        unique:true,
        validate:{
            validator:validator.isEmail,
            message: '{VALUE} is not a valid e-mail address.'
        }
    },
    password:{
        type: String,
        minlength:6,
        required:true
    },
    tokens:[{
        access:{
            type: String,
            required: true
        },
        token:{
            type:String,
            required:true
        }
    }]
});


userSchema.methods.toJSON = function () {
    var user = this;
    var userObject = user.toObject();
    return _.pick(userObject, ['_id', 'email']);
};

userSchema.methods.generateAuthToken = function () {
    var user = this;
    var access = 'auth';
    var token = jwt.sign({_id: user._id.toHexString(), access}, process.env.JWT_SECRET).toString();
    user.tokens.push({access, token});
    return user.save().then(()=>{
        return token;
});
};

userSchema.methods.deleteToken = function (token) {
    var user = this;
    return user.update({
        $pull:{
            tokens:{token}
        }
    });

};


userSchema.statics.findByCredentials = function (email , password) {
    var Users = this;
    return Users.findOne({email}).then((user)=>{
        if(!user){
        return Promise.reject();
    }
    return new Promise((resolve,reject)=>{
        var hashedPass = user.password;
    bcrypt.compare(password,hashedPass,(err,res)=>{
        if(!res){
        reject();
    }
else {
        resolve(user);
    }
});
});
});
};

userSchema.statics.findByToken = function (token) {
    var Users = this;
    var decoded;

    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (e) {
        return Promise.reject();

    }
    return Users.findOne({
        '_id' : decoded._id,
        'tokens.token' : token,
        'tokens.access' : 'auth'
    });
};

userSchema.pre('save', function (next) {
    var user = this;
    if(user.isModified('password')){
        bcrypt.genSalt(10, (err,salt)=>{
            bcrypt.hash(user.password, salt, (err,hash)=>{
            user.password = hash;
        next();
    });
    });
    } else {
        next();
    }

});

//
// var user1= new user({
//     email: "       ok  "
// });
//
// user1.save().then((dat)=>{
//     console.log(dat);
// },(e)=>{
//     console.log("cannot save user",e);
// });
var Users = mongoose.model('Users', userSchema);

module.exports = {Users};