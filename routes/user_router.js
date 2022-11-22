const express = require('express');
const router = express.Router();
const { Auth } = require("../middleware/auth");
const{Register,Verification,LogIn}= require('../controller/user_controller')
router.post('/signup',Register);
router.get('/verify/:id/:token',Verification);
router.post('/login',Auth,LogIn);



module.exports = router