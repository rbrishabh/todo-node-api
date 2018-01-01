const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');

var data = {
    id:7
};
var token = jwt.sign(data, 'ohyeah');
console.log(token);

var decoded = jwt.verify(token, 'ohyeah');
console.log('decoded', decoded);

// // var message = 'Hello user 4';
// // var hash = SHA256(message).toString();
// //
// // console.log("message:", message);
// // console.log(hash);
//
// var data = {
//     id:5,
// };
// var yoo= JSON.stringify(data);
// var token = {
//     data,
//     token: SHA256(yoo + 'mausaji').toString()
// }
// //
// // data.id=6;
// // token.token = SHA256(yoo).toString();
// //
// // console.log(token);
// token.data.id = 7;
// token.token = SHA256(JSON.stringify(token.data)).toString();
//
// console.log(token);
//
// var result = SHA256(JSON.stringify(token.data) + 'mausaji').toString();
// console.log(result)
// if(result === token.token)
// {
//     console.log('No data changed');
// }
// else console.log('data changed');

