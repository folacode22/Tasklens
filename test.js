const bcrypt = require('bcrypt');
const  {v4: uuidv4} = require('uuid');

const userId = "eed292914edm3034034";
console.log(userId)
const hashPass =  bcrypt.hash(userId, uuidv4());

console.log(hashPass)