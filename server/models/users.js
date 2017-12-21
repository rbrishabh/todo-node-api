const mongoose = require('mongoose');

var Users = mongoose.model('Users', {
    email: {
        type: String,
        minlength:1,
        required: true,
        trim:true
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

module.exports = {Users};