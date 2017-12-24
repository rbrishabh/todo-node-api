const express = require('express');
const bodyParse= require('body-parser');

const {mongoose} = require('./db/mongoose');
const{Todo}= require('./models/todo');
const{users}= require('./models/users');
const{ObjectID}= require('mongodb');

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

app.get('/todos/:id', (req,res)=>{
    var id = req.params.id;
    if(!ObjectID.isValid(id)){
     return res.status(404).send('Invalid ID');
    }
    Todo.findById(id).then((todo)=>{
        if(!todo){
            res.status(404).send('Cannot find a todo with that ID');
} else {
            res.status(200).send(todo);
}
    }).catch((e)=>{
    res.status(400).send();
});
});


app.listen(3000, ()=>{
    console.log("server is up on port 3000");
});

module.exports= {app};


