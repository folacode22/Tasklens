const express = require('express');
const router = express.Router();
const { Auth } = require("../middleware/auth");
const{Register,Verification,LogIn,ForgotPassword,NewPassword}= require('../controller/user_controller')
router.post('/signup',Register);
router.get('/verify/:userId/:token',Verification);
router.post('/login',LogIn);
router.post('/password-reset',ForgotPassword )
router.post('/password-reset/:id/:token',NewPassword )


module.exports = router