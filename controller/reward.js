const User = require('../models/user');
const Task = require('../models/task');
const Ward  = require('../models/reward');


exports. createReward = async (req,res)=>{
const id = req.user._id;
const Id  = req.task._id;
const user = await User.findOne({userId: id});
if(!user){
   return res.status(404).json({message:"user does not exist in the database"})
}
const {reward}=req.body;

   try{
const task = await Task.findById({_id:Id});
const raw = await Ward.create({
   reward
});
return res.status(200).json({task,raw})

   }catch(error){
      return res
      .status(500)
      .json({ error: error.message, message: "internal server error" });
   }
};

// exports.viewReward = async(req,res)=>{
// const id = req.params.id;

//    try{
// const ward  = await  Ward.findone({_id:Id});
// return.res.status(200).json(ward)
//    }catch(error){
//       return res
//       .status(500)
//       .json({ error: error.message, message: "internal server error" });
//    }
// }