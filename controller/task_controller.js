const User = require('../models/user');
const Task = require('../models/task');
const Profile = require('../models/dashboard');

exports.newTask = async (req, res)=> {
  const id = req.user._id;
   // check if user exist in database
  const user = await User.findOne({ userId: id });
   const {
    userId,title,description,completed,taskList
} =req.body;
try {
 
   const task = await Task.create({
    userId:user,
       title,
       description,
       taskList,
       completed,
       
       
      

   });
   const addTask = await task.save();
   return res.status(201).json({
       message:'new note added successfully',
       addTask,
   })
} catch (error) {
  return res.status(500).json({ message: error.message })
};
}

// exports.bulkTask = async (req,res,next)=>{

// };


exports.updateTask = async (req, res) => {
   try {
       const id = req.params._id;
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







//VIEWS CATEGORIES
// get single Task by Id
exports.viewTask = async (req,res)=>{


   try {
    const id = req.params.id;
      const task = await Task.findOne({id});
      return res.status(200).json(task); 
   } catch (error) {
      return res.status(500).json({
         message: 'Internal Server error',
       })
   }
 
}











// get all Task by SORTING
exports.viewAll = async (req,res,next)=>{
   try {
  
      const q = req.query.name;

      //destructured req.query
      const { page, limit } = req.query; // const page = req.query.page or const limit = req.query.limit
      const tasks = await Task.find()
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







//DELETE TASKS CATEGORIES 
// delete single Task by Id
exports.deleteTask  = async  (req, res) => {
   try {
       const id = req.params._id;
       const del_task =await Task.findOneAndDelete(
         { Id: id },
       
         { new: true }
       );
       return res.status(200).json(del_note);
   } catch (error) {
       console.log(error);
       return res.status(500).json({ error: error.message });
   }
};




// delete all Task
exports.removeAllTask = async (req,res,)=>{
try{
const data = await Task.deleteMany()
return res.status(200).json({message:" all task as been delete"})
}catch(error){
  console.log(error);
  return res.status(500).json({ error: error.message });
}
};



// upcoming
exports.dashboard = async (req,res)=>{
  const id =  req.task._id;
  const task = await Task.findOne({taskId: id});
  const {taskId,upcoming,priority} = req.body;
  try{
    const dash = await Profile.create({
      taskId:task,
      upcoming,
      priority
    });
    const addDash = await dash.save();
   return res.status(201).json({
       message:'new profile added successfully',
       addDash ,})
  }catch(error){
    return res.status(500).json({ message: error.message })
  }
}

exports.upComing = async (req,res)=>{
  const id  = req.params._id;
  try{
  const make = await Profile.findOneAndUpdate(
    {_id:id},
    {upComing:true},
    {new:true}
  );
  return res.status(200).json(make);
  }catch(error){
    return res.status(500).json({
      message: 'Internal Server error',
    })
}};

exports.priority = async (req,res)=>{
const id  = req.params._id;
try{
const make = await Profile.findOneAndUpdate(
  {_id:id},
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

