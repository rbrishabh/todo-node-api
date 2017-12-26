const mongoose = require('mongoose');

mongoose.Promise = global.Promise;


mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/TodoApp',(err)=>{
    console.log('could not connect to mongoose database');
});

module.exports = {mongoose};

