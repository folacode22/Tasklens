const mongoose = require("mongoose");

const dashSchema = new mongoose.Schema({
 
   taskId: {
      type: mongoose.Schema.Types.ObjectId,
      ref:"task",
   },
   due_Date:{
      type:String
         },
         notification:{
            type:String,
         },
  upcoming:{
   type:Boolean
  },
  priority:{
   type:Boolean
  },
},{
   collection: 'dash',
   timestamps: true,
   versionKey: false,});

   const Dash = mongoose.model('dash', dashSchema );
module.exports = Dash ; 