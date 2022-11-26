require('dotenv').config();
const express = require('express')
const connectDB = require('./database/db');
const userRoutes = require('./routes/user_router');

const app = express();
const bodyParser = require('express').json
app.use(bodyParser());
connectDB()
port = process.env.PORT



app.use("/api/user",userRoutes);


app.get('/',(req,res)=>{
   res.send('home page')
})

 
app.listen(port,()=>{
   console.log(`server is now listening for request on port ${port}`)
})