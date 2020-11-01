const express = require('express');
const bodyParser =require('body-parser');

const leaderRouter = express.Router();
leaderRouter.use(bodyParser.json());

leaderRouter.route("/")
.all((req,res,next)=>{
    res.statusCode=200;
    res.setHeader("Content-Type","text/plain");
    next();
})
.get((req,res,next)=>{
    res.end("We will get all the leaders details for you :)");
})
.post((req,res,next)=>{
    res.end("We will add "+req.body.name+" with the details "+req.body.description);
})
.put((req,res,next)=>{
    res.statusCode = 403
    res.end("Put is not supported for /leaders");
})
.delete((req,res,next)=>{
    res.end("We will delete all the leaders details for you :)");
});

leaderRouter.route("/:leaderId")
.all((req,res,next)=>{
    res.statusCode=200;
    res.setHeader("Content-Type","text/plain");
    next();
})
.get((req,res,next)=>{
    res.end("We will get the leaders details of id "+req.params.leaderId+" for you :)");
})
.post((req,res,next)=>{
    res.end("Post is not supported for leaders/:leaderId");
})
.put((req,res,next)=>{
    res.write("Updating "+ req.params.leaderId+"\n")
    res.end("We will update "+ req.body.name+" with details "+req.body.description);
})
.delete((req,res,next)=>{
    res.end("We will delete details of id "+req.params.leaderId+ " for you :)");
});

module.exports =leaderRouter;
 