const request = require('supertest');
const expect = require('expect');
const {ObjectID} = require('mongodb')
var {Todo} = require('./../models/todo');
var {app} = require("./../server");

const text1 = [{_id: new ObjectID, text: "Test1 todo"}, {_id:new ObjectID, text: "test2 todo"}];

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

describe('GET /todos/id', ()=>{
it('should return 200 and find the todo of given id', (done)=>{
    request(app)
        .get(`/todos/${text1[0]._id}`)
        .expect(200)
        .expect((res)=>{
            expect(res.body.todo.text).toBe(text1[0].text);
    })
  .end(done);
});

it('should return 404 when id is not found ', (done)=>{
    request(app)
    .get(`/todos/${new ObjectID}`)
    .expect(404)
    .end(done);
});

it('should return 404 when invalid id is entered',(done)=>{
    request(app)
    .get('/todos/123')
    .expect(404)
    .end(done);
});
});