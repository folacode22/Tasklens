const mongoose = require('mongoose');

const verifySchema = new mongoose.Schema({
   userId:{
      type: mongoose.Schema.Types.ObjectId,
      ref:'user',
      required:true,
   },
   token:{
      type:String,
      required:true,
      expires:'2s',
   }
})
const Verify = mongoose.model('verify',verifySchema);
module.exports = Verify;