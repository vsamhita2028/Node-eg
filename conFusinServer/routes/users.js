var express = require('express');
var router = express.Router();
var User = require('../models/user');
var passport = require('passport');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/signup',(req,res,next)=>{
  User.register(new User({username : req.body.username}),req.body.password,(err,user)=>{
    if(err){
      res.statusCode = 500;
      res.setHeader("ContentType","application/json")
      res.json({err : err});
    }else{
      passport.authenticate('local')(req,res,()=>{
        res.statusCode = 200;
        res.setHeader("ContentType","application/json")
        res.json({success : true,status : "You are signed up successfully!"});
      })
    }
  })
});

router.post('/signin',passport.authenticate('local'),(req,res)=>{
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.json({success : true, status : "You are logged in successfully!"});
});

router.get('/logout',(req,res,next)=>{
  if(req.session){
    req.session.destroy();
    res.clearCookie("sessionId");
    res.redirect('/');
  }else{
    var err = new Error('You are not logged in');
    res.statusCode = 403;
    next(err);
  }
})

module.exports = router;
