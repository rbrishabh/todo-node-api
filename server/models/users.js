const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');


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
var token = jwt.sign({_id: user._id.toHexString(), access}, 'ohyeah').toString();
user.tokens.push({access, token});
return user.save().then(()=>{
    return token;
});
};



userSchema.statics.findByToken = function (token) {
    var Users = this;
    var decoded;

    try {
        decoded = jwt.verify(token, 'ohyeah');
    } catch (e) {
    return Promise.reject();

    }
return Users.findOne({
    '_id' : decoded._id,
    'tokens.token' : token,
    'tokens.access' : 'auth'
});


};

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