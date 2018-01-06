const {Todo} = require('./../../models/todo');
const {ObjectID} = require('mongodb');
const{Users}= require('./../../models/users');
const jwt = require('jsonwebtoken');
const {ok} = require('./../../config/config.js');
const {app} = require('./../../server');

console.log(process.env.JWT_SECRET);


const populateTodos = (done)=>{
    Todo.remove({}).then(()=>{
        Todo.insertMany(text1).then(()=>done());
});
};

var userOneId= new ObjectID;
var userTwoId = new ObjectID;

const text1 = [
    {_id: new ObjectID,
        text: "Test1 todo",
    _creator: userOneId},
    {_id:new ObjectID,
        text: "test2 todo",
        completed:true,
        completedOn: 333,
    _creator: userTwoId}
];

const users = [{
    _id : userOneId,
   email:'oho@oho.com',
   password:'userOnePass',
   tokens : [{
       access: 'auth',
       token: jwt.sign({_id:userOneId, access: 'auth'}, process.env.JWT_SECRET).toString()
   }]
}, {
    _id: userTwoId,
    email:'aha@aha.com',
    password: 'userTwoPass',
    tokens : [{
        access: 'auth',
        token: jwt.sign({_id:userTwoId, access: 'auth'}, process.env.JWT_SECRET).toString()
    }]
}];

const populateUsers = (done)=> {
    Users.remove({}).then(()=>{
       var userOne = new Users(users[0]).save();
       var userTwo = new Users(users[1]).save();

        return Promise.all([userOne, userTwo]);
    }).then(()=>done());
};

module.exports = {text1, populateTodos, users, populateUsers};
