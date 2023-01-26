const mongoose = require("mongoose");

const scheduleSchema = new mongoose.Schema({
 
   taskId: {
      type: mongoose.Schema.Types.ObjectId,
      ref:"task",
   },
   DashId: {
      type: mongoose.Schema.Types.ObjectId,
      ref:"dash",
   },
   Date:{
      type:String
         },
         time:{
            type:String
               },    
  
},{
   collection: 'schedule',
   timestamps: true,
   versionKey: false,});

   const Schedule = mongoose.model('schedule', scheduleSchema );
module.exports = Schedule  ; 