require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const crypto = require("crypto");
const User = require('../models/user')
const nodemailer = require('nodemailer');
const sendEmail = require("../helper/email.js");
const Verify = require("../models/verify");
const Token = require("../models/forgot");



exports.Register = async(req,res)=>{
   const {name,email,password,verified} =req.body;
   try{
      if(name==null || email == null || password == null){
         res.status(400).json({
       status:"FAILED",
       message:"Empty input fields"
         })
         
        }
        const userExist = await User.findOne({ email:email });
         if (userExist)
             return res.status(400).send("user with given email already exist");
        const salt = await bcrypt.genSalt(10);
        const hashPass = await bcrypt.hash(password, salt);
        const client  = await User.create({
         name,
         email,
         password:hashPass,
         verified:false,
        })
        const token = await new Verify({
          userId: client._id,
          token: crypto.randomBytes(32).toString('hex')
        }).save()
        const message = `<p>verify your email address to complete the signup and login of this account</p></br><p>
this link b>expire in 5min</p><p>click<a href=${process.env.BASIC_URL}/user/verify/${client._id}/${token.token}>here</a></p>`;
     const mailer = await sendEmail(client.email, "Verify Email", message);
            
return res.status(201).json({client,token ,mailer, message:"user registration successful"

})
}catch(error){
      return res
      .status(500)
      .json({ error: error.message, message: "internal server error" });
   }
}

exports.Verification = async (req,res)=>{
  try {
    const user = await User.findOne({ UserId: req.params._id });
    if (!user){return res.status(400).send("user not found ")} 

    const newVer = await Verify.findOne({
      userId: req.params.userId,
      token: req.params.token,
    });
    if (!newVer) {return res.status(400).send("Invalid link")};

    await User.updateOne({ id: user._id, verified: true });
    await Verify.findByIdAndRemove(newVer.id);

    res.send("email verified sucessfully");

  }catch(error){
      return res
      .status(500)
      .json({ error: error.message, message: "internal server error" });
   }
}



exports.LogIn = async (req, res) => {
   const { password, email } = req.body;
   try {
     if (!(password && email)) {
       return res.status(400).json({ message: "please fill all fields" });
     }

     // check if user exist in database
     const existingUser = await User.findOne({ email: email });
 
     //if user doessn't exist throw error
     if (!existingUser) {
       return res.status(404).json({ message: "user not found" });
     }
     const verifiedUser = await User.findOne({verified: true})
     if(!verifiedUser){
       return res.status(300).json({message:'user is not verified'})
     };
 
     //if  user exist in database, check if user password is correct(boolean function)
     const checkPassword = await bcrypt.compare(password, existingUser.password);
 
     //if user password is not correct throw error ==> invalid credentials
     if (!checkPassword) {
       return res.status(400).json({ message: "invalid credentials" });
     }
 
     // if user password is correct tokenize the payload
     const payload = {
       _id: existingUser.UserId,
     };
 
     // tokenize your payload with a secret key to create an access token
     const token = await jwt.sign(payload, process.env.SECRET_KEY, {
       expiresIn: "2d",
     });
 
     //store token in cookies ===> web brower local storage
 
     res.cookie("accessToken", token);
     return res
       .status(202)
       .json({ message: "User login successfully", token: token });
   } catch (error) {
     return res
       .status(500)
       .json({ error: error.message, message: "internal server error" });
   }
 };
 
 

exports.ForgotPassword = async (req,res)=>{
  try {
  
     const existingUser = await User.findOne({ email:email });
     if (!existingUser)
         return res.status(400).send("user with given email doesn't exist");

     let token = await Token.findOne({ userId: existingUser.userId });
     if (!token) {
         token = await new Token({
             userId: existingUser.userId,
             token: crypto.randomBytes(32).toString("hex"),
         }).save();
     }

     const link = `<p>click <a href="${process.env.BASIC_URL}/user/password-reset/${existingUser.userId}/${token.token}">here</a> to reset your password</p>`;

     const mailer = await sendEmail(existingUser.email, "Password reset", link);

     return res.status(201).json({existingUser,token ,mailer, message:"password reset link sent to your email account"})
     
 } catch (error) {
  return res
  .status(500)
  .json({ error: error.message, message: "internal server error" });
 }
}

exports.NewPassword = async (req,res)=>{
  try {

    const user = await User.findById(req.params.userId);
    if (!user) return res.status(400).send("invalid link or expired");

    const token = await Token.findOne({
        userId: req.params.userId,
        token: req.params.token,
    });
    if (!token) return res.status(400).send("Invalid link or expired");

    user.password = req.body.password;
    await user.save();
    await token.delete();

    res.send("password reset sucessfully.");
} catch (error) {
    res.send("An error occured");
    console.log(error)}
}











