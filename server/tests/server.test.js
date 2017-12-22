const request = require('supertest');
const expect = require('expect');

var {Todo} = require('./../models/todo');
var {app} = require("./../server");

const text1 = [{text: "Test1 todo"}, {text: "test2 todo"}];

beforeEach((done)=>{
    Todo.remove({}).then(()=>{
        Todo.insertMany(text1).then(()=>done());
});
});

describe('POST /todos', ()=> {
   it('should create a new todo', (done)=>{
   var text = "Testing todo post";


   request(app)
       .post('/todos')
           .send({text})
           .expect(200)
           .expect((res)=>{
               expect(res.body.text).toBe(text);
               })
           .end((err,res)=>{
               if(err){
                   return done(err)
               }
              Todo.find({text}).then((obj)=>{
                   expect(obj.length).toBe(1);
                   expect(obj[0].text).toBe(text);
                   done();
    }).catch((e)=>done(e));
    });



});

   it('should not add todo with invalid body data', (done)=>{
        request(app)
       .post('/todos')
       .send({})
       .expect(400)
       .end((err,res)=>{
           if(err){
               return done(err);
           }
           Todo.find().then((obj)=>{
               expect(obj.length).toBe(2);
               done();
   }).catch((e)=>done(e));
   });
   });
});

describe('GET /todo tests', ()=>{
    it('should get all todos', (done)=>{
        request(app)
            .get('/todos')
            .expect(200)
            .expect((res)=>{
                expect(res.body.todos.length).toBe(2);
        }).end(done);
});
});