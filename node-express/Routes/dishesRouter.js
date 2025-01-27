const express = require('express');
const bodyParser = require('body-parser');

const dishRouter = express.Router();
dishRouter.use(bodyParser.json());
dishRouter.route('/')
.all( (req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
  })
.get((req,res,next)=>{
      res.end("We will get all the dishes");
  })
  .post((req, res, next) => {
    res.end('Will add the dish: ' + req.body.name + ' with details: ' + req.body.description);
})
  .put((req,res,next)=>{
      req.statusCode= 403;
      res.end("Put is not supported on /dishes");
  })
  .delete((req,res,next)=>{
      res.end("We will delete all the dishes");
  });

  dishRouter.route('/:dishId')
  .all( (req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
  })
 .get((req,res,next)=>{
    res.end("We will get the dish with id "+ req.params.dishId);
})
.post((req,res,next)=>{
    res.statusCode=403;
    res.end("Post is not supported for dishes/:dishId");
})
.put((req,res,next)=>{
    res.write("Updating "+ req.params.dishId+"\n")
    res.end("We will update the dish "+ req.body.name+" with details "+req.body.description);
})
.delete((req,res,next)=>{
    res.end("We will delete the dish with id "+ req.params.dishId);
});
  module.exports = dishRouter;