const express = require('express');
const bodyParse= require('body-parser');

const {mongoose} = require('./db/mongoose');
const{Todo}= require('./models/todo');
const{users}= require('./models/users');

var app = express();

app.use(bodyParse.json());

app.post("/todos", (req,res)=>{
  var Todo1 = new Todo({
      text: req.body.text
  });
  Todo1.save().then((doc)=>{
      res.send(doc);
  },(e)=>{
      res.status(400).send(e);
});
});

app.get("/todos", (req,res)=> {
    Todo.find().then((todos)=>{
        res.send({todos});
},(e)=>{
        res.status(400).send(e);
});
});


app.listen(3000, ()=>{
    console.log("server is up on port 3000");
});

module.exports= {app};


