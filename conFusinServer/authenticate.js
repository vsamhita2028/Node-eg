var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var User = require('./models/user');
var jwtStrategy = require('passport-jwt').Strategy;
var jwt = require('jsonwebtoken')

var config = require('./config');
const { ExtractJwt } = require('passport-jwt');

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

exports.getToken = function(payload){
    return jwt.sign(payload,config.secret,{expiresIn : 3600});
}

var opts ={}
opts.jwtFromRequest= ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.secret;

exports.jwtPassport = passport.use(new jwtStrategy(opts,(jwt_payload,done)=>{
    console.log("jwt payload ",jwt_payload);

    User.findOne({_id : jwt_payload._id},(err,user)=>{
        if(err){
            return done(err,false);
        }else if(user){
            return done(null,user);
        }else{
            return done(null,false)
        }
    })
}))

exports.verifyUser = passport.authenticate('jwt', {session : false});
exports.verifyAdmin = (req,res,next)=>{
    console.log(req.user)
    if(req.user.admin==true){
      return next();
    }
    else{
        res.statusCode=403;
        var err = new Error("You are not authorized to perform this operation!");
        return next(err);
    }
}