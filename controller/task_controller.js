
const User = require('../models/user');
const Task = require('../models/task');



exports.newTask = async (req, res)=> {
  const id = req.user._id;
   // check if user exist in database
  const user = await User.findOne({ userId: id });
  if(!user){
    return res.status(404).json({message:"user does not exist in the database"})
  }
   const {
    userId,Title,Description,subTask,completed,purpose,upcoming,priority,startDate,endDate
} =req.body;

try {
 
   const task = await Task.create({
    userId:user,
    Title,
    Description,
    subTask,
    completed,
    purpose,
    upcoming,
    priority,
    startDate,
    endDate
   });
   return res.status(201).json({
       message:'new note added successfully',
       task
   })
} catch (error) {
  return res.status(500).json({ message: error.message })
};
}


exports.updateTask = async (req, res) => {
   try {
       const id = req.params.id;
       const{ title,
        description,
        purpose,
        completed,
        upcoming,
        priority} = req.body;
       const change = await
       Task.findOneAndUpdate(
           {_id:id},
           { title,
            description,
            purpose,
            completed,
            upcoming,
            priority},
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


exports.priority = async (req,res)=>{
  const id  = req.params.id;
  try{
  const make = await Task.findOneAndUpdate(
    {_id:id},
  
    {new:true}
  );
  return res.status(200).json(make);
  }catch(error){
    return res.status(500).json({
      message: 'Internal Server error',
    })
  }
  };
 
 
exports.upComing = async (req,res)=>{
  const id  = req.params.id;
  try{
  const mark = await Task.findOneAndUpdate(
    {_id:id},
    {upcoming:true},
    {new:true}
  );
  return res.status(200).json(mark);
  }catch(error){
    return res.status(500).json({
      message: 'Internal Server error',
    })
}};

 

//VIEWS CATEGORIES ***
// get single Task by Id
exports.viewTask = async (req,res)=>{
  const id = req.user._id;
  const Id = req.params.id;

   try {   
  // check if user exist in database
 const user = await User.findOne({ userId: id });
 if(!user){
  return res.status(404).json({message:"user does not exist in the database"})
};
      const task = await Task.findOne({_id:Id});
      return res.status(200).json(task); 
   } catch (error) {
      return res.status(500).json({
         message: 'Internal Server error',
       })
   }
 
}


// get all Task
exports.getAllTask = async (req,res)=>{
  const id = req.user._id;
  try {
     // check if user exist in database
 const user = await User.findOne({ userId: id });
    const tasks = await Task.find({user});
    return res.status(200).json({message:"All task available", tasks})
  } catch (error) {
    
  }
}








// get all Task by SORTING ****
exports.viewAllBySort = async (req,res,next)=>{
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


 
 exports.tasksByCategory = 
  async(req,res)=>{
    try {
      const { purpose } = req.params;
     const tasks = await Task.find({
      purpose: purpose,
     });
     return res.status(200).json({
         message: "task by category",
         tasks,
     });
    } catch (error) {
      console.log(error.message);
    }
     
  }



  //todo
exports.getBySearch = async (req, res) => {
  const {title, description, purpose} = req.body;
   try {
  
  const tasks = await Task.find({
    title:{
      $regex: title,
      $options: "i"
    },
    description:{
      $regex: description,
      $options: "i"
    },
    taskList:{
      $regex: purpose,
      $options: "i"
    },
  });
  return res.status(200).json({
    message:"Advance search",
    tasks
  });
   } catch (error) {
     console.log({message:"search function not working"});
   }
 };


 //todo
exports.getFilter = async (req,res) =>{
  const q = req.query.taskList;
  try{
    const filters = req.query;
const filterTask = await Task.filter(taskList =>{
  let isValid = true;
  for(key in filters){
    console.log(key, taskList[key], filters[key])
    isValid = isValid && taskList[key] == filters[key]
  }
return isValid;
})
return res.status(200).json({filterTask})
  }
  catch(error){
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
}




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
const data = await Task.deleteMany({user});
return res.status(200).json({data,message:" all task as been delete"})
}catch(error){
  console.log(error);
  return res.status(500).json({ error: error.message });
}
};




