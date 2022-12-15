
//const nodemailer = require('nodemailer');
const schedule = require('node-schedule');
//const pushNotification = require("../utils/notification");
const User = require('../models/user');
const Task = require('../models/task');
const Dash = require('../models/dashboard');


// upcoming
exports.createDashboard = async (req,res)=>{
  //  const id =  req.task._id;
  //  const task = await Task.findOne({taskId: id});
    const {upcoming,priority, due_Date,notification} = req.body;
   try{
     
     const dash_create = await Dash.create({
      //  taskId:task,
      due_Date,
       notification,
       upcoming,
       priority
     });
    
 
    //  const someDate = new Date(due_Date)
    //  const jobs =  schedule.scheduleJob(someDate, function() {
    //   res.json({message:"TimeDue for notification"})
      
    // })
    const addDash = await dash_create.save();
     // const notification = await schedule.scheduleJob( ScheduleDate, async ()=>{
     //   await pushNotification.payload({
     //     body:"Time to attend task overDue"
 
     //   })
     // })
    return res.status(201).json({
        message:'new profile added successfully',
        addDash })
   }catch(error){
     return res.status(500).json({ message: error.message })
   }
 }

 exports.getDash = async (req, res) => {
  try {
   const q = req.query.price;
   const { page, limit } = req.query;
   const tabs = await Dash.find()
     .sort({ taskList: 1 })
     .skip((page - 1) * limit)
     .limit(limit * 5);
   return res.status(200).json({ count: tabs.length, data: tabs });
  } catch (error) {
    console.log(error.message);
  }
};

 
 exports.upComing = async (req,res)=>{
   const id  = req.params._id;
   try{
   const mark = await Dash.findOneAndUpdate(
     {id:id},
     {upcoming:true},
     {new:true}
   );
   return res.status(200).json(mark);
   }catch(error){
     return res.status(500).json({
       message: 'Internal Server error',
     })
 }};
 
 exports.priority = async (req,res)=>{
 const id  = req.params._id;
 try{
 const make = await Dash.findOneAndUpdate(
   {id:id},
   {priority:true},
   {new:true}
 );
 return res.status(200).json(make);
 }catch(error){
   return res.status(500).json({
     message: 'Internal Server error',
   })
 }
 }
 
 