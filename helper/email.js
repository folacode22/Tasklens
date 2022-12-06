const nodemailer = require('nodemailer');
require('dotenv').config();


const sendEmail = async (email, subject, html) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.HOST,
      service: process.env.SERVICE,
      port: 587,
      secure: true,
      auth: {
        user: process.env.ADMIN,
        pass: process.env.PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.USER,
      to: email,
      subject: subject,
      html: html,
    });
    console.log("email sent sucessfully");
  } catch (error) {
    console.log("email not sent");
    console.log(error);
  }
};




// sendgrid for emailverification
// const GsendGridMail = require("@sendgrid/mail");
// const sgMail = sendGridMail.setApiKey(process.env.SENDGRID_API_KEY);

// const sendEmail = async (email, subject, html) => {
//   try{
//     const mail = await sgMail.send({
//       from: process.env.USER,
//       to: email,
//       subject: subject,
//       html: html,
//     });
//     console.log("email sent sucessfully");
//   }catch(error){
//     console.log("email not sent");
//     console.log(error);
//   }
  
// }











// email verification using mailgun
// const mg = require('nodemailer-mailgun-transport');

// const auth ={
//   auth:{
//     api_key:process.env.PUBLIC_KEY,
//     domain:process.env.DOMAIN_NAME,
//   }
// }

// const sendEmail = async (email, subject, html) => {
// try {
//   let transporter = nodemailer.createTransport(mg(auth));

//   await transporter.sendMail({
//     from: process.env.USER,
//     to: email,
//     subject: subject,
//     html: html,
//   });
//   console.log("email sent sucessfully");
// } catch (error) {
//   console.log("email not sent");
//   console.log(error);
// }
// }

 module.exports = sendEmail;










