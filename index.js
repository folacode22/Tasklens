require('dotenv').config();
const express = require('express');
const passport = require('passport');
const cors = require('cors')
const cookieSession = require("cookie-session");
const connectDB = require('./database/db');
const authRoutes = require("./routes/auth_router");
const profileRoutes = require("./routes/profile_routes");
const userRoutes = require('./routes/user_router');
const taskRoutes = require('./routes/task_router');

//google user content
require("./config/google");
const keys = require("./config/key");

const app = express();
const bodyParser = require('express').json
app.use(bodyParser());
app.use(cors());
// set view engine
app.set("view engine", "ejs");

// set session cookies
app.use(
   cookieSession({
     maxAge: 24 * 60 * 60 * 1000,
     keys: [keys.session.cookieKey],
   })
 );
connectDB()
port = process.env.PORT;

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRoutes);
app.use("/profile", profileRoutes);
app.use("/api/user",userRoutes);
app.use("/api/task",taskRoutes);

app.get('/',(req,res)=>{
  return res.status(200).json({ message: 'home page ' });
})
// create home route
// app.get("/", (req, res) => {
//    res.render("home", { user: req.user });
//  });
 //404 page
app.all('*', (req, res) => {
   res.status(404).json({ message: '👋🤚👋👋👋🤚oops page not found' });
 });
 
app.listen(port,()=>{
   console.log(`server is now listening for request on port ${port}`)
})