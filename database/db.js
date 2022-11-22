const mongoose = require('mongoose');
const connectDB = async ()=>{
   try{
      mongoose.connect(process.env.MONGODB_URI);
      console.log('connected to database');
   
   }catch(error){
      console.log({errorMessage:'database server error'})
   }
  
}

module.exports = connectDB