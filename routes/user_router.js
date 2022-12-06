const express = require('express');
const router = express.Router();
const { Auth } = require("../middleware/auth");
const{Register,Verification,LogIn,ForgotPassword,NewPassword}= require('../controller/user_controller')
router.post('/signup',Register);
router.get('/verify/:userId/:token',Verification);
router.post('/login',LogIn);

router.get("/logout", (req, res) => {
   req.logIn= false;
   res.redirect("/");
 });

router.post('/password-reset',ForgotPassword )
router.post('/password-reset/:userId/:token',NewPassword )


module.exports = router