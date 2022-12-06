const express = require('express');
const router = express.Router();


const authCheck = (req, res, next) => {
   if (!req.user) {
     res.redirect("/auth/login");
     res.redirect("/api/user/login");
   } else {
     next();
   }
 };
 
 router.get("/", authCheck, (req, res) => {
   res.render("profile", { user: req.user });
 });
 
 module.exports = router;
 