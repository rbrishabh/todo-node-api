const mongoose = require('mongoose');
const validator = require('validator');

var Users = mongoose.model('Users', {
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

module.exports = {Users};