const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

var uri = 'mongodb://rishabh:rishabh@todoapp-shard-00-00-y3yok.mongodb.net:27017,todoapp-shard-00-01-y3yok.mongodb.net:27017,todoapp-shard-00-02-y3yok.mongodb.net:27017/test?ssl=true&replicaSet=TodoApp-shard-0&authSource=admin';
mongoose.connect(uri || 'mongodb://localhost:27017/ToDoApp?ssl=true');

module.exports = {mongoose};

