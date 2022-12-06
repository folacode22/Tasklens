const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
   userId:{
      type: mongoose.Schema.Types.ObjectId,
      ref:'user',
      required:true,
   },
   title:{
      type:String,
         required: true,
      trim: true,
   },
   description:{
type:String,
required:true
   },
   completed:{
type:Boolean,
default:false,
required:true
   },

   taskList:{
       type:String,
      enum:["Default","Personal","Shopping","Wishlist","Work"] ,
default:"Default",
trim: true
   },
  
}, {
   capped: {
     size: 1024 * 1024 * 1024, // 1GB Maximum size
     autoIndexId: true,
   },
   collection: "task-info",
   timestamps: true,
   versionKey: false,
 })
const Task = mongoose.model('task',taskSchema);
module.exports = Task;