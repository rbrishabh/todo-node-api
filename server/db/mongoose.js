const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
var link = 'mongodb://rishabh:rishabh@ds163826.mlab.com:63826/todo-app' || 'mongodb://localhost:27017/ToDoApp'
mongoose.connect(link);

module.exports = {mongoose};