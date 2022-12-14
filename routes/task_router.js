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
}= require('../controller/task_controller')

router.post('/create',Auth,newTask);
router.get('/view/:id',viewTask);
router.get('/tabs',getByTab );
router.get('/views',viewAll);
router.put('/update/:id',updateTask);
router.delete('/delete/:id',Auth,deleteTask);
router.delete('/delete/all',Auth,removeAllTask);


 


module.exports = router;