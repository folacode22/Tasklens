const express = require('express');
const router = express.Router();
const { Auth } = require("../middleware/auth");

const{newTask,
    getAllTask,
   // viewAllBySort,
    tasksByCategory,
   viewTask,
    updateTask,
   isCompleted,
    priority,
   upComing,
    deleteTask,
    removeAllTask,
}= require('../controller/task_controller')

//Post
router.post('/',Auth,newTask);

//Get
//  router.get('/:id',Auth,newTask);
 router.get('/',Auth,getAllTask );
// router.get('/sort',viewAllBySort );
 router.get('/category',Auth,tasksByCategory );

// //Put
 router.put('/update/:id',updateTask);
 router.put('/completed/:id',isCompleted);
 router.put('/priority/:id',priority);
 router.put('/upcoming/:id',upComing);

// //delete
 router.delete('/delete/:id',Auth,deleteTask);
 router.delete('/delete',Auth,removeAllTask);


 


module.exports = router;