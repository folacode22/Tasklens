const express = require('express');
const router = express.Router();
const { Auth } = require("../middleware/auth");

const{
   getDash,
   upComing,
   priority,
   setSchedule}= require('../controller/Dashboard')


   
router.get('/view',getDash)
router.put('/upcoming/:id',upComing);
router.put('/priority/:id',priority);
router.put('/date/:id',setSchedule);
 


module.exports = router;