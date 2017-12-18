// const MongoClient = require('mongodb');
const {MongoClient, ObjectID} = require('mongodb');




MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if(err){
        return console.log('Could not connect to MongoDB server');
    }
    console.log('Connected to mongoDB server.');

//     db.collection('Todos').find({
//         _id : new ObjectID('5a375d31370de8f612dfa10d')
//     }).toArray().then((docs)=>{
//         console.log('Todos');
//         console.log(JSON.stringify(docs, undefined, 2));
//     }, (err)=>{
//         console.log("Cannot fetch data");
// });
// db.collection('Todos').find({completed:true}).count().then((count)=>{
//     console.log(`Todos count ${count}`);
//     }, (err)=>{
//     console.log("Cannot fetch data");
// });

db.collection('Users').find({name:'Rishabh'}).toArray().then((docs)=>{
    console.log(JSON.stringify(docs, undefined, 2));
}, (err)=>{
 console.log("Cannot fetch data");
})

// db.close();
});