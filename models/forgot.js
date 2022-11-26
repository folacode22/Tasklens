const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
   userId:{
      type: mongoose.Schema.Types.ObjectId,
      ref:'user',
      required:true,
   },
   uniqueString :{
      type:String,
      required:true,
   }
})
const Token = mongoose.model('token',tokenSchema);
module.exports = Token;