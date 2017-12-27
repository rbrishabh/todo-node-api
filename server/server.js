require('./config/config');


const express = require('express');
const bodyParse= require('body-parser');
const _ = require('lodash');

const {mongoose} = require('./db/mongoose');
const{Todo}= require('./models/todo');
const{users}= require('./models/users');
const{ObjectID}= require('mongodb');
const time = new Date().getTime();

const port =  process.env.PORT;

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
            res.status(200).send({todo});
}
    },(e)=>{
    res.status(400).send();
}).catch((e)=>{
    res.status(400).send();
});
});

app.delete('/todos/:id', (req,res)=>{
    var id = req.params.id;
if(!ObjectID.isValid(id)){
    return res.status(404).send('Invalid ID');
}
Todo.findByIdAndRemove(id).then((todo)=>{
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

app.patch('/todos/:id', (req,res)=>{
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

 Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo)=>{
     if(!todo){
         return res.staus(404).send('No todo with that ID found');
}
res.status(200).send({todo});
 }).catch((e)=>{
     res.status(400).send();
});
});



app.listen(port, ()=>{
    console.log(`server is up on ${port}`);
});


module.exports= {app};


