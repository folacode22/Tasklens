require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const crypto = require("crypto");
const User = require('../models/user')
// const cloudinary = require('../utils/cloudinary');

const nodemailer = require('nodemailer');
const sendEmail = require("../helper/email.js");
const Verify = require("../models/verify");
const Token = require("../models/forgot");



exports.Register = async(req,res)=>{
   const {email,password,image,verified} =req.body;
   try{
      if(name==null || email == null || password == null){
         res.status(400).json({
       status:"FAILED",
       message:"Empty input fields"
         })
         
        }
      //  const result = await cloudinary.uploader.upload(req.file.path);
      

        const userExist = await User.findOne({ email:email });
         if (userExist)
             return res.status(400).send("user with given email already exist");
        const salt = await bcrypt.genSalt(10);
        const hashPass = await bcrypt.hash(password, salt);
        const client  = await User.create({
         
         email,
         password:hashPass,
         image,
        // image:result.secure_url,

         verified:false,
        })
        const token = await new Verify({
          userId: client._id,
          token: crypto.randomBytes(32).toString('hex')
        }).save()
       
        const message = {
        subject:`Hi ${client.email}, please verify your Tasklens account`,
        html:`<h2>Account Verification</h2> </br>

        <p>Thank you for choosing Tasklens! Please confirm your email address by clicking the link below. We'll communicate important update to you from time to time via email, so it's essential that we have an up-to-date email address</p></br></h3><a href=${process.env.BASIC_URL}/user/verify/${client._id}/${token.token}>Click here</a></h3>` };
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

    //TODO
    // res.redirect("/");
    res.send("email verified successfully");

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
 
     //if user doesn't exist throw error
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
 
     //store token in cookies ===> web browser local storage
 
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

     const user = await User.findOne({ email: req.body.email });
     if (!user)
         return res.status(400).json("user with given email doesn't exist");

     let token = await Token.findOne({ userId: user._id });
     if (!token) {
         token = await new Token({
             userId: user._id,
             token: crypto.randomBytes(32).toString("hex"),
         }).save();
     }

     const link = `<p>click <a href="${process.env.BASIC_URL}/user/password-reset/${user.userId}/${token.token}">here</a> to reset your password</p>`;

     const mailer = await sendEmail(user.email, "Password reset", link);

     return res.status(201).json({user,token ,mailer, message:"password reset link sent to your email account"})
     
 } catch (error) {
  return res
  .status(500)
  .json({ error: error.message, message: "internal server error" });
 }
}

exports.NewPassword = async (req,res)=>{
  try {

    const user = await User.findById(req.params.userId);
    if (!user) return res.status(400).json("invalid link or expired");

    const token = await Token.findOne({
        userId: req.params.userId,
        token: req.params.token,
    });
    if (!token) return res.status(400).json("Invalid link or expired");

    user.password = req.body.password;
    await user.save();
    await token.delete();

//TODO
    // res.redirect("/");
    res.status(204).json("password reset successfully.");
} catch (error) {
    res.send("An error occurred");
    console.log(error)}
}


//user should state purpose for using the app

exports.taskFunction = async (req,res)=>{
try{
  const user = await User.findByIdAndUpdate(req.user._id,{
    form:req.body.form,
  },{new : true})
  if(!user){
    return res.status(404).json({message:"user not found"});
};
return res.status(202).json({message:"User credentials updated successfully"})
}

 catch (error){
  return res
  .status(500)
  .json({ error: error.message, message: "internal server error" });
}
}



// uploading the user profile image
exports.uploadImage = async (req,res)=>{
  try{

const user = await User.findByIdAndUpdate(req.user._id,{
  image:req.body.image,
},{new: true})
if(!user){
  return res.status(404),json({message:"user not found"})
}
return res.status(202).json({message:"User credentials updated successfully"})
  } catch (error){
  
    return res
    .status(500)
    .json({ error: error.message, message: "internal server error" });
   }
}


exports.viewProfile = async (req,res)=>{
  try{
const user = await User.findById(req.user._id);
return res.status(200).json({message:"user profile", user})
  }catch(error){

    return res
    .status(500)
    .json({ error: error.message, message: "internal server error" });
  }
}