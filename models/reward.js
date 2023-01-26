const mongoose = require('mongoose');

const wardSchema = new mongoose.Schema({
   userId:{
      type: mongoose.Schema.Types.ObjectId,
      ref:'user',
      required:true,
   },
   reward:{
      type:String,
      required:true,
   }
})
const Ward = mongoose.model('token',wardSchema);
module.exports = Ward;