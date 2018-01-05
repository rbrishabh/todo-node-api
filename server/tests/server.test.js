const request = require('supertest');
const expect = require('expect');
const {ObjectID} = require('mongodb')
var {Todo} = require('./../models/todo');
const {text1, populateTodos, users, populateUsers} = require('./seed/seed');
var {app} = require("./../server");
const{Users}= require('./../models/users');


beforeEach(populateUsers);
beforeEach(populateTodos);

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
describe('DELETE /todos/id',()=>{
    it('should remove the todo',(done)=>{
    var id = text1[1]._id.toHexString();

    request(app)
        .delete(`/todos/${id}`)
        .expect(200)
        .expect((res)=>{
        expect(res.body.todo._id).toBe(id);
})
.end((err,res)=>{
        if(err){
            return done(err);
        }
        Todo.findById(id).then((todo)=>{
        expect(todo).toNotExist();
    done();
}).catch((e)=>done(e));
});
});


it('should return 404 cuz of invalid id', (done)=>{
    request(app)
    .delete("/todos/123")
    .expect(404)
    .end(done)
});

it('should return 404 cuz todo with that id does not exist', (done)=>{
    var id = new ObjectID;
request(app)
    .delete(`/todos/${id}`)
    .expect(404)

    .end(done);
})

});

describe('PATCH /todos/:id', ()=>{
    it('should update the todo', (done)=>{
        var id = text1[0]._id.toHexString();
        request(app)
            .patch(`/todos/${id}`)
            .send({text:"oh yeah number", completed:true})
            .expect(200)
            .expect((res)=>{
                expect(res.body.todo.text).toBe("oh yeah number");
                expect(res.body.todo.completed).toBe(true);
                expect(res.body.todo.completedOn).toBeA('number');
                })
            .end(done);
});

    it('should make todo incompleted and also update it and all', (done)=>{
        var id = text1[1]._id.toHexString();
        request(app)
            .patch(`/todos/${id}`)
            .send({text:'yo', completed:false})
            .expect(200)
            .expect((res)=>{
                expect(res.body.todo.text).toBe('yo');
                expect(res.body.todo.completed).toBe(false);
                expect(res.body.todo.completedOn).toNotExist();
        }).end(done);
    });
});

describe('GET /users/me', ()=>{
   it('should return the user object when auth token sent', (done)=>{
       request(app)
           .get('/users/me')
           .set('x-auth', users[0].tokens[0].token)
           .expect(200)
           .expect((res)=>{
               expect(res.body._id).toBe(users[0]._id.toString());
               expect(res.body.email).toBe(users[0].email);
       }).end(done);
});

   it('should return no user when auth id token not sent', (done)=>{
       request(app)
       .get('/users/me')
       .expect(401)
       .expect((res)=>{
           expect(res.body).toEqual({});
   }).end(done);
   });
});

describe('POST /users', ()=>{
   it('should add a new user', (done)=>{
       var email = 'a@b.com';
       var password = 'qwewqwe';

       request(app)
           .post('/users')
           .send({email, password})
           .expect(200)
           .expect((res)=>{
               expect(res.header['x-auth']).toExist();
               expect(res.body._id).toExist();
               expect(res.body.email).toBe(email);
       }).end((err)=>{
           if(err){
               return done(err);
           }
           Users.findOne({email}).then((user)=>{
               expect(user).toExist();
               expect(user.password).toNotBe(password);
               done();
    });
    });

   });

   it('shouldnt add user as data invalid', (done)=>{
       var email = "1";
       var password = "1";
       request(app)
           .post('/users')
           .send({email, password})
           .expect(400)
           .end(done);
   });

   it('shouldnt add user as email same', (done)=>{
       var email = "oho@oho.com"
       var password = 'sadasda';
       request(app)
           .post('/users')
           .send({email, password})
           .expect(400)
           .end(done);


   });
});