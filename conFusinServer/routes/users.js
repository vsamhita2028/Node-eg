var express = require('express');
var router = express.Router();
var User = require('../models/user');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/signup',(req,res,next)=>{
  User.findOne({username : req.body.username})
  .then((user)=>{
    if(user!=null){
      var err = new Error('User '+ user.username +' already exists :(');
      res.statusCode = 403;
      next(err);
    }else{
      return User.create({username : req.body.username, password : req.body.password})
    }
  })
  .then((user)=>{
    res.statusCode = 200;
    res.setHeader("ContentType","application/json")
    res.json({status : "You are signed up successfully!", user : user});
  }, (err)=>next(err))
  .catch((err)=>next(err))
});

router.get('/signin',(req,res,next)=>{
  if (!req.session.user) {
    var authHeader = req.headers.authorization;
    if (!authHeader) {
      var err = new Error('You are not authenticated!');
      res.setHeader('WWW-Authenticate', 'Basic');              
      err.status = 401;
      return next(err);
    }
    var auth = new Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
    var username = auth[0];
    var password = auth[1];
    User.findOne({username : req.body.username})
    .then((user)=>{
      if(user == null){
        var err = new Error('User ' + username + ' does not exists :( ');
        res.statusCode = 403;
        return next(err);
      }
      else if(user.password != password){
        var err = new Error('Your password is incorrect :(');
        res.statusCode = 403;
        return next(err);
      }else if (username == user.username && password == user.password) {
        req.session.user='authenticated';
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end('You are authenticated!'); 
      }
    }).catch((err)=>next(err))
  }  else {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('You are already authenticated!');
  }
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
