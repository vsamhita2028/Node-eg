const express = require('express');
const bodyParser =require('body-parser');

const promoRouter = express.Router();
promoRouter.use(bodyParser.json());

promoRouter.route("/")
.all((req,res,next)=>{
    res.statusCode=200;
    res.setHeader("Content-Type","text/plain");
    next();
})
.get((req,res,next)=>{
    res.end("We will get all the promotion details for you :)");
})
.post((req,res,next)=>{
    res.end("We will add "+req.body.name+" with the details "+req.body.description);
})
.put((req,res,next)=>{
    res.statusCode = 403
    res.end("Put is not supported for /promotions");
})
.delete((req,res,next)=>{
    res.end("We will delete all the promotion details for you :)");
});

promoRouter.route("/:promoId")
.all((req,res,next)=>{
    res.statusCode=200;
    res.setHeader("Content-Type","text/plain");
    next();
})
.get((req,res,next)=>{
    res.end("We will get the promotion details of id "+req.params.promoId+" for you :)");
})
.post((req,res,next)=>{
    res.end("Post is not supported for promotions/:promoId");
})
.put((req,res,next)=>{
    res.write("Updating "+ req.params.promoId+"\n")
    res.end("We will update "+ req.body.name+" with details "+req.body.description);
})
.delete((req,res,next)=>{
    res.end("We will delete all the promotion details of id "+req.params.promoId+ " for you :)");
});

module.exports =promoRouter;