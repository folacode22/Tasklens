### task
router.post('/create',Auth,newTask);
router.get('/view/:id',viewTask);
router.get('/tabs',getByTab );
router.get('/views',Auth,viewAll);
router.put('/update/:id',updateTask);
router.put('/completed/:id',isCompleted);
router.delete('/delete/:id',Auth,deleteTask);
router.delete('/delete/all',Auth,removeAllTask);


### user
router.post('/signup',Register);
router.get('/verify/:userId/:token',Verification);
router.post('/login',LogIn);

router.get("/logout", (req, res) => {
   req.logIn= false;
   res.redirect("/");
 });

router.post('/password-reset',ForgotPassword )
router.post('/password-reset/:userId/:token',NewPassword )



### dashboard
router.get('/view',getDash)
router.put('/upcoming/:id',upComing);
router.put('/priority/:id',priority);
router.put('/date/:id',setSchedule);
 
