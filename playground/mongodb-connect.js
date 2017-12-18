// const MongoClient = require('mongodb');
const {MongoClient, ObjectID} = require('mongodb');

//    var obj = ObjectID();
// console.log(obj);

// var obj = {
//     name: 'Rishabh',
//     age: 19
// };
//
// var {age} = obj;
// console.log(age);



MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if(err){
        return console.log('Could not connect to MongoDB server');
    }
    console.log('Connected to mongoDB server.');
// db.collection('Todos').insertOne({
//     text : 'Something to do',
//     completed : false
// }, (err,result)=> {
//     if(err){
//     return console.log('Unable to insert todo -', err);
//     }
//     console.log(JSON.stringify(result.ops, undefined, 2));
//
// });

// db.collection('Users').insertOne({
//     name: 'Rishabh',
//     age : 19,
//     location: 'New Delhi',
// }, (err,result)=> {
//     if(err) {
//      return console.log("Cannot add user to database - ", err);
//     }
//     console.log(JSON.stringify(result.ops, undefined, 2));
// });
db.close();
});