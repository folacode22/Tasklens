require('dotenv').config();
const express = require('express')

const cookieSession = require("cookie-session");
const passport = require("passport");

const connectDB = require('./database/db');
const passportSetup = require("./config/google");
const userRoutes = require('./routes/user_router');
const authRoutes = require('./routes/google_router');
const profileRoutes  = require("./routes/dashboard");
const keys = require("./config/key");
const app = express();
const bodyParser = require('express').json
app.use(bodyParser());
connectDB()
port = process.env.PORT

// set view engine
app.set("view engine", "ejs");
app.use(
   cookieSession({
     maxAge: 24 * 60 * 60 * 1000,
      keys: [keys.session.cookieKey],
   })
 );
//const cors = require('cors')
//app.use(cors())
// initialize passport
app.use(passport.initialize());
app.use(passport.session());

app.use("api/user",userRoutes);
app.use("/auth", authRoutes);
app.use("/profile", profileRoutes);

// app.get('/',(req,res)=>{
//    res.send('home page')
// })
app.get("/", (req, res) => {
   res.render("home", { user: req.user });
 });
 
app.listen(port,()=>{
   console.log(`server is now listening for request on port ${port}`)
})