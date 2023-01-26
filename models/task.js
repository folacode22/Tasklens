const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
   userId:{
      type: mongoose.Schema.Types.ObjectId,
      ref:'user',
      required:true,
   },
    Title:{
         type:String,
            required: true,
         trim: true,
      },
      Description:{
   type:String,
   required:true
      },
   
   subTask:{
      title:{
         type:String,

      },
      description:{
         type:Array,
      }
   },
   startDate:{
type:Date
   },
   endDate:{
      type:Date
         },
   priority:{
      type:String,
      enum:["High","Medium","Low","No"] ,
     },

   purpose:{
       type:String,
      enum:["Personal","Education","Work"] ,
   },
   upcoming:{
      type:Boolean,
      default:false,

     },
     
     completed:{
      type:Boolean,
      default:false,
      
         }
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