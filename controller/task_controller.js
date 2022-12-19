const schedule = require('node-schedule');
//const pushNotification = require("../utils/notification");
const User = require('../models/user');
const Task = require('../models/task');
const Dash = require('../models/dashboard');


exports.newTask = async (req, res)=> {
  const id = req.user._id;
   // check if user exist in database
  const user = await User.findOne({ userId: id });
   const {
    userId,title,description,completed,taskList
} =req.body;
const {taskId,due_Date,notification,upcoming,priority} = req.body;
try {
 
   const task = await Task.create({
    userId:user,
       title,
       description,
       taskList,
       completed:false,

   });
   
   const dashboard = await new Dash({
    userId:user,
    taskId: task._id,
    due_Date,
    notification,
    upcoming:false,
    priority:false,
   }).save()
   let someDate = new Date(due_Date)
      const jobs =  schedule.scheduleJob(someDate, function() {
       res.json({message:"TimeDue for notification"})
      
     });
   return res.status(201).json({
       message:'new note added successfully',
       task,dashboard
   })
} catch (error) {
  return res.status(500).json({ message: error.message })
};
}



exports.updateTask = async (req, res) => {
   try {
       const id = req.params.id;
       const change = await
       Task.findOneAndUpdate(
           {_id:id},
           
           {new : true}
       );
       return res.status(200).json(change);
   } catch (error) {
       console.log(error);
       return res.status(500).json({ error: error.message });
   }
};


exports.isCompleted = async (req, res) => {
  try {
      const id = req.params.id;
      const change = await
      Task.findOneAndUpdate(
          {_id:id},
          {completed:true},
          {new:true}
      );
      return res.status(200).json(change);
  } catch (error) {
      console.log(error);
      return res.status(500).json({ error: error.message });
  }
};




//VIEWS CATEGORIES ***
// get single Task by Id
exports.viewTask = async (req,res)=>{
  const id = req.user._id;
  // check if user exist in database
 const user = await User.findOne({ userId: id });

   try {
    const id = req.params.id;
      const task = await Task.findOne({_id:id});
      return res.status(200).json(task); 
   } catch (error) {
      return res.status(500).json({
         message: 'Internal Server error',
       })
   }
 
}











// get all Task by SORTING ****
exports.viewAll = async (req,res,next)=>{
  const id = req.user._id;
   // check if user exist in database
  const user = await User.findOne({ userId: id });
   try {
  
      const q = req.query.name;

      //destructured req.query
      const { page, limit } = req.query; // const page = req.query.page or const limit = req.query.limit
      const tasks = await Task.find({user})
        .sort({ createdAt: 1 })
        .skip((page - 1) * limit) // 0 * 5 // skip 0
        .limit(limit * 5);
      return res.status(200).json({ count: tasks.length, data: tasks });


  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


//todo
exports.getByTab = async (req, res) => {
   try {
    const q = req.query.price;
    const { page, limit } = req.query;
    const tabs = await Task.find()
      .sort({ taskList: 1 })
      .skip((page - 1) * limit)
      .limit(limit * 3);
    return res.status(200).json({ count: tabs.length, data: tabs });
   } catch (error) {
     console.log(error.message);
   }
 };







//DELETE TASKS CATEGORIES ****
// delete single Task by Id
exports.deleteTask  = async  (req, res) => {
  const id = req.user._id;
   // check if user exist in database
  const user = await User.findOne({ userId: id });
   try {
       const id = req.params.id;
       const del_task =await Task.findOneAndDelete(
         { _id: id },
       
         { new: true }
       );
       return res.status(200).json(del_task);
   } catch (error) {
       console.log(error);
       return res.status(500).json({ error: error.message });
   }
};




// delete all Task ****
exports.removeAllTask = async (req,res,)=>{
  const id = req.user._id;
   // check if user exist in database
  const user = await User.findOne({ userId: id });
try{
const data = await Task.deleteMany({});
return res.status(200).json({data,message:" all task as been delete"})
}catch(error){
  console.log(error);
  return res.status(500).json({ error: error.message });
}
};




