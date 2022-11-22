const mongoose = require("mongoose");
const User = require("./user")
const dashBoardSchema = new mongoose.Schema({
   userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref:"User",
   },
   picture:{
      type:String,
      required:true,
   }
},{
   collection: 'profile',
   timestamps: true,
   versionKey: false,});

   const DashBoard = mongoose.model('Verification', dashBoardSchema);
module.exports = DashBoard; 