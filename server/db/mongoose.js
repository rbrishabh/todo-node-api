const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

var uri = 'mongodb+srv://rishabh:rishabh@todoapp-y3yok.mongodb.net/test';
mongoose.connect(uri || 'mongodb://localhost:27017/ToDoApp');

module.exports = {mongoose};

