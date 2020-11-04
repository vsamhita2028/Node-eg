var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var dishesRouter = require('./routes/dishesRouter');
var promoRouter = require('./routes/promoRouter');
var leaderRouter = require('./routes/leaderRouter');

var mongoose = require('mongoose');
var dishes =require('./models/dishes');
var promotions = require("./models/promotions");
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

function auth(req,res,next){
  console.log(req.headers);
  var authHeader = req.headers.authorization;

  if(!authHeader){
    console.log("You are not authenticated :(");
    var Err = new Error("You are not authenticated :(");
    res.setHeader('WWW-Authenticate', 'Basic');
    res.statusCode=401;
    next(Err);
    return;
  }
  var val = new Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
  var username = val[0];
  var password = val[1];

  if(username =='admin' && password == 'password'){
    next();
  }else{
    var Err = new Error("You are not authorizied :(");
    res.setHeader('WWW-Authenticate', 'Basic');
    res.statusCode=401;
    next(Err);
  }
}
app.use(auth);
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/dishes', dishesRouter);
app.use('/promotions', promoRouter);
app.use('/leaders', leaderRouter);

var url ='mongodb://localhost:27017/conFusion';
var connect = mongoose.connect(url);
connect.then((db)=>{
  console.log("Connected to the server correctly :))");
}).catch((err) => console.log(err));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
