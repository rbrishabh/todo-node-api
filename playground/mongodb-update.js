// const MongoClient = require('mongodb');
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if(err){
        return console.log('Could not connect to MongoDB server');
    }
    console.log('Connected to mongoDB server.');

    // db.collection('Todos').findOneAndUpdate({
    //     _id: new ObjectID('5a378626370de8f612dfa9c0')},
    //     {$set : {completed:true}},
    //     {returnOriginal: false}
    //
    //     ).then((result)=> {
    //         console.log(result);
    // });

db.collection('Users').findOneAndUpdate({
    _id: new ObjectID('5a1d61efba6c9213a870bf2a')
},
    { $set : {
        name: "Rishabh"
        }, $inc: {
        age: 1
        }},
    {returnOriginal:false}).then((result)=>{
        console.log(result);
});
// db.close();
});