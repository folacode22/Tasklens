const mongoose = require('mongoose');

const connectDB = async () => {
    try {
         const db = await mongoose.connect(process.env.MONGODB_URI, {
           useNewUrlParser: true,
           useUnifiedTopology: true,
         });
         console.log(`MongoDB connected:${db.connection.host}`);
    } catch (error) {
        console.log(error);
    }
   
};



module.exports = connectDB