// exports.createDashboard = async (req,res)=>{
//   //  const id =  req.task._id;
//   //  const task = await Task.findOne({taskId: id});
//     const {upcoming,priority, due_Date,notification} = req.body;
//    try{
     
//      const dash_create = await Dash.create({
//       //  taskId:task,
//       due_Date,
//        notification,
//        upcoming,
//        priority
//      });
    
 
//     //  const someDate = new Date(due_Date)
//     //  const jobs =  schedule.scheduleJob(someDate, function() {
//     //   res.json({message:"TimeDue for notification"})
      
//     // })
//     const addDash = await dash_create.save();
//      // const notification = await schedule.scheduleJob( ScheduleDate, async ()=>{
//      //   await pushNotification.payload({
//      //     body:"Time to attend task overDue"
 
//      //   })
//      // })
//     return res.status(201).json({
//         message:'new profile added successfully',
//         addDash })
//    }catch(error){
//      return res.status(500).json({ message: error.message })
//    }
//  }





//  exports.setSchedule = async (req,res)=>{
//   const id  = req.params._id;
//   try{
//   const make = await Dash.findOneAndUpdate(
//     {id:id},
//     {due_Date},
//     {new:true}
//   );
//    let someDate = new Date(due_Date)
//       const jobs =  schedule.scheduleJob(someDate, function() {
//        res.json({message:"TimeDue for notification"})
      
//      });
//   return res.status(200).json({make,jobs});
//   }catch(error){
//     return res.status(500).json({
//       message: 'Internal Server error',
//     })
//   }
//   }
 
const now  = new Date()
console.log(now)