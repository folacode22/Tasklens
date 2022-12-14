const express = require('express');
const router = express.Router();
const { Auth } = require("../middleware/auth");

const{
   getDash,
   upComing,
   priority}= require('../controller/Dashboard')


   
router.get('/view',getDash)
router.put('/upcoming/:id',upComing);
router.put('/priority/:id',priority);
 


module.exports = router;