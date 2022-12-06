const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
 
   task: {
      type: mongoose.Schema.Types.ObjectId,
      ref:"task",
   },
  upcoming:{
   type:Boolean
  },
  priority:{
   type:Boolean
  },
},{
   collection: 'profile',
   timestamps: true,
   versionKey: false,});

   const Profile = mongoose.model('profile', profileSchema );
module.exports = Profile; 