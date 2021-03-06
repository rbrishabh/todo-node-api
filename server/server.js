require('./config/config');


const express = require('express');
const bodyParse= require('body-parser');
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const {mongoose} = require('./db/mongoose');
const{Todo}= require('./models/todo');
const{Users}= require('./models/users');
const {authenticate} = require('./middleware/authenticate');
const{ObjectID}= require('mongodb');
const time = new Date().getTime();

const port =  process.env.PORT;

var app = express();
app.use(bodyParse.json());

app.post("/todos", authenticate, (req,res)=>{
  var Todo1 = new Todo({
      text: req.body.text,
      _creator: req.user._id
  });
  Todo1.save().then((doc)=>{
      res.send(doc);
  },(e)=>{
      res.status(400).send(e);
});
});

app.get("/todos", authenticate, (req,res)=> {
    Todo.find({
    _creator: req.user._id
}).then((todos)=>{
        res.send({todos});
},(e)=>{
        res.status(400).send(e);
});
});

app.get('/todos/:id', authenticate, (req,res)=>{
    var id = req.params.id;
    if(!ObjectID.isValid(id)){
     return res.status(404).send('Invalid ID');
    }
    Todo.findOne({
            _id:id,
           _creator: req.user._id
        }).then((todo)=>{
        if(!todo){
            res.status(404).send('Cannot find a todo with that ID');
} else {
            res.status(200).send({todo});
}
    },(e)=>{
    res.status(400).send();
}).catch((e)=>{
    res.status(400).send();
});
});

app.delete('/todos/:id', authenticate, (req,res)=>{
    var id = req.params.id;
if(!ObjectID.isValid(id)){
    return res.status(404).send('Invalid ID');
}
Todo.findOneAndRemove({
    _id:id,
    _creator:req.user._id
}).then((todo)=>{
    if(!todo){
    res.status(404).send('Cannot find a todo with that ID');
} else {
    res.status(200).send({todo});
}
},(e)=>{
    res.status(400).send();
}).catch((e)=>{
    res.status(400).send();
});
});

app.patch('/todos/:id', authenticate, (req,res)=>{
    var id = req.params.id;
    var body = _.pick(req.body, ['text','completed']);
if(!ObjectID.isValid(id)){
    return res.status(404).send('Invalid ID');
}
 if(_.isBoolean(body.completed) && body.completed){
  body.completedOn = time;

}
else{

    body.completed = false;
     body.completedOn = null;
}

 Todo.findOneAndUpdate({
     _id:id,
     _creator:req.user._id
 }, {$set: body}, {new: true}).then((todo)=>{
     if(!todo){
         return res.staus(404).send('No todo with that ID found');
}
res.status(200).send({todo});
 }).catch((e)=>{
     res.status(400).send();
});
});


app.post('/users', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);
var user = new Users(body);

user.save().then(() => {
    return user.generateAuthToken();
}).then((token) => {
    res.header('x-auth', token).send(user);
}).catch((e) => {
    res.status(400).send(e);
})
});


app.get('/users/me', authenticate, (req,res)=>{
  res.send(req.user);
});


app.post('/users/login',(req,response)=> {
    var body = _.pick(req.body, ['email', 'password']);
var email = body.email;
var password = body.password;
Users.findByCredentials(email, password).then((user) => {
    return user.generateAuthToken().then((token) => {
    response.status(200).header('x-auth', token).send(user);
});
}).catch((e) => {
    response.status(400).send();
});

});

app.delete('/users/me/token', authenticate, (req,res)=>{
    req.user.deleteToken(req.token).then(()=>{
        res.status(200).send();
},()=>{
        res.status(400).send();
});
});





app.listen(port, ()=>{
    console.log(`server is up on ${port}`);
});


module.exports= {app};


