const {ObjectID} = require('mongodb');

const {mongoose} = require("./../server/db/mongoose");
const {Todo} = require("./../server/models/todo");
const {Users} = require("./../server/models/users")

// Todo.remove({}).then((res)=>{console.log(res);});

// Todo.findByIdAndRemove('5a433438e858420014bfab31').then((todo)=>{console.log(todo);});