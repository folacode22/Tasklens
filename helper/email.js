const nodemailer = require('nodemailer');

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

 module.exports = sendEmail