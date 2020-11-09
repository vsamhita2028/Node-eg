const express = require('express');
const bodyParser =require('body-parser');
const Leaders = require('../models/Leaders');
const leaderRouter = express.Router();
leaderRouter.use(bodyParser.json());
var authenticate = require('../authenticate');
leaderRouter.route("/")
.get((req,res,next)=>{
    Leaders.find({})
    .then((leader)=>{
        res.statusCode=200;
        res.setHeader("Content-Type","application/json");
        res.json(leader)
    },(err)=>next(err))
    .catch((err)=>next(err))
})
.post(authenticate.verifyUser,(req,res,next)=>{
    Leaders.create(req.body)
    .then((leader)=>{
        res.statusCode=200;
        res.setHeader("Content-Type","application/json");
        res.json(leader)
    },(err)=>next(err))
    .catch((err)=>next(err))
})
.put(authenticate.verifyUser,(req,res,next)=>{
    res.statusCode = 403
    res.end("Put is not supported for /leaders");
})
.delete(authenticate.verifyUser,(req,res,next)=>{
    Leaders.remove({})
    .then((leader)=>{
        res.statusCode=200;
        res.setHeader("Content-Type","application/json");
        res.json(leader)
    },(err)=>next(err))
    .catch((err)=>next(err))
});

leaderRouter.route("/:leaderId")
.get((req,res,next)=>{
    Leaders.findById(req.params.leaderId)
    .then((leader)=>{
        res.statusCode=200;
        res.setHeader("Content-Type","application/json");
        res.json(leader)
    },(err)=>next(err))
    .catch((err)=>next(err))
})
.post(authenticate.verifyUser,(req,res,next)=>{
    res.end("Post is not supported for leaders/:leaderId");
})
.put(authenticate.verifyUser,(req,res,next)=>{
    Leaders.findByIdAndUpdate(req.params.leaderId,{
        $set : req.body
    },{ new : true})
    .then((leader)=>{
        res.statusCode=200;
        res.setHeader("Content-Type","application/json");
        res.json(leader)
    },(err)=>next(err))
    .catch((err)=>next(err))
})
.delete(authenticate.verifyUser,(req,res,next)=>{
    Leaders.findByIdAndRemove(req.params.leaderId)
    .then((leader)=>{
        res.statusCode=200;
        res.setHeader("Content-Type","application/json");
        res.json(leader)
    },(err)=>next(err))
    .catch((err)=>next(err))
});

module.exports =leaderRouter;
 