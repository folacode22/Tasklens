const express = require('express');
const router = express.Router();
const { Auth } = require("../middleware/auth");

const{newTask,
   viewTask,
   getByTab,
   viewAll,
   updateTask,
   deleteTask,
   removeAllTask,
   dashboard,
   upComing,
   priority}= require('../controller/task_controller')

router.post('/create',Auth,newTask);
router.get('/view/:id',viewTask);
router.get('/tabs',getByTab );
router.get('/views',viewAll);
router.put('/update/:id',updateTask);
router.delete('/delete/:id',Auth,deleteTask);
router.delete('/delete/all',Auth,removeAllTask);

router.post('/create',dashboard);
router.put('/upcoming/:id',upComing);
router.put('/priority/:id',priority);
 


module.exports = router