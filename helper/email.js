 const nodemailer = require('nodemailer');



//  const sendEmail = async (email, subject, html) => {
//   try {
//     // const transporter = nodemailer.createTransport({
//     //   host: process.env.HOST,
//     //   service: process.env.SERVICE,
//     //   port: 465,
//     //   secure: true,
//     //   auth: {
//     //     user: process.env.Admin,
//     //     pass: process.env.PASS,
//     //   },
//     // });
//     var smtpTransport = nodemailer.createTransport({
//       host: 'smtp.gmail.com',
//       port: 465,
//       secure: true, // use SSL
//       auth: {
//           user:process.env.Admin,
//           pass: process.env.PASS
//       }
//     })
//     await smtpTransport.sendMail({
//       from: process.env.Admin,
//       to: email,
//       subject: subject,
//       html: html,
//     });
//     console.log("email sent sucessfully");
//   } catch (error) {
//     console.log("email not sent");
//     console.log(error);
//   }
// };


//  module.exports = sendEmail;

 const sendEmail = async (email, subject, html) => {
try{
  var smtpTransport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use SSL
    auth: {
        user:process.env.Admin ,
        pass:process.env.PASS
    }
  })
  
  await smtpTransport.sendMail({
     from:process.env.Admin , // verified sender email
     to:email, // recipient email
     subject:subject , // Subject line
     text: "Hello world!", // plain text body
     html: html , // html body
   }, function(error, info){
     if (error) {
       console.log(error);
     } else {
       console.log('Email sent: ' + info.response);
     }
   });
} catch(error){
  console.log("email not sent");
  console.log(error);
}

 
}

  module.exports = sendEmail;
