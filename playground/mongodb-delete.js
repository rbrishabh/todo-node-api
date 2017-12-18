// const MongoClient = require('mongodb');
const {MongoClient, ObjectID} = require('mongodb');




MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if(err){
        return console.log('Could not connect to MongoDB server');
    }
    console.log('Connected to mongoDB server.');

    //
    // db.collection('Todos').deleteMany({text:'Eat Lunch'}).then((result)=>{
    //     console.log(result);
    // });

// db.collection('Todos').deleteOne({text:'Eat Lunch'}).then((result)=>{
//     console.log(result);
// });
// db.collection('Todos').findOneAndDelete({text:'Something to do'}).then((result)=>{
//     console.log(result);
// });
// db.collection('Users').deleteMany({name:'Rishabh'}).then((result)=>{
//     console.log(result);
// });

db.collection('Users').findOneAndDelete({
    _id : new ObjectID('5a1d87075bcdab34746d6d3f')
}).then((result)=> {
    console.log(JSON.stringify(result,undefined,2));
});

// db.close();
});