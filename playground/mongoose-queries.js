const {ObjectID} = require('mongodb');

const {mongoose} = require("./../server/db/mongoose");
const {Todo} = require("./../server/models/todo");
const {Users} = require("./../server/models/users")

var id = '5a3cf0519190d83e30b67cf1';
var userid = '5a3b3bae03693943d0680b32';

if(!ObjectID.isValid(userid)){
   console.log("Id entered is invalid id");
}

//
// Todo.find({
//     _id: id
// }).then((todos)=>{
//     console.log('Todos:', todos);
// });
//
// Todo.findOne({
//     _id: id
// }).then((todo)=>{
//     console.log('Todo:', todo);
// });

// Todo.findById(id).then((todo)=>{
//   if(!todo){
//       return console.log('ID does not exist');
// }
//     console.log('Todo by ID:', todo);
// }).catch((e)=>{console.log(e)});
//

Users.findById(userid).then((users)=>{
   if(!users){
       return console.log('Id not found');
}
    console.log('User by ID:', JSON.stringify(users, undefined, 2));
}, (e)=>{
    console.log(e);
});