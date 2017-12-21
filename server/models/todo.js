const mongoose = require('mongoose');

var Todo = mongoose.model('Todo', {
    text : {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    },
    completed : {
        type: Boolean,
        default: false
    },
    completedOn : {
        type : Number,
        default: null
    }
});

// var newTodo= new Todo({
//     text: 'Cook dinner'
// });
//
// newTodo.save().then((doc) => {
//    console.log(doc);
// }, (e)=> {
//     console.log('Cannot save todo');
// });
//
// var newTodo1 = new Todo({
//     text: '  oh yeh  ',
//
// });

// newTodo1.save().then((doc)=>{
//     console.log(doc);
// }, (e)=> {
//     console.log('Cannot save todo', e);
// });


module.exports = {Todo};