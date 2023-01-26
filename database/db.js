// const mongoose = require('mongoose');

// const connectDB = async () => {
//     try {
//          const db = await mongoose.connect(process.env.MONGODB_URI, {
//            useNewUrlParser: true,
//            useUnifiedTopology: true,
//          });
//          console.log(`MongoDB connected:${db.connection.host}`);
//     } catch (error) {
//         console.log(error);
//     }
   
// };

const mongoose = require('mongoose');
mongoose.set('strictQuery', false)
const connectDB =  function(){
   mongoose.connect(process.env.MONGODB_URI);
   console.log("database connected")
}

module.exports = connectDB