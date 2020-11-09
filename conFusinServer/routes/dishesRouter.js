const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Dishes = require('../models/dishes');
const dishRouter = express.Router();
dishRouter.use(bodyParser.json());
var authenticate = require('../authenticate')
dishRouter.route('/')
.get((req,res,next)=>{
     Dishes.find({})
     .then((dishes)=>{
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(dishes) 
     },(err)=>next(err))
     .catch((err)=>next(err))
  })
  .post(authenticate.verifyUser,(req, res, next) => {
    Dishes.create(req.body)
    .then((dishes)=>{
      console.log('Dish Created ', dishes);
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json'); 
      res.json(dishes);
     },(err)=>next(err))
     .catch((err)=>next(err))
})
  .put(authenticate.verifyUser,(req,res,next)=>{
      req.statusCode= 403;
      res.end("Put is not supported on /dishes");
  })
  .delete(authenticate.verifyUser,(req,res,next)=>{
      Dishes.remove({})
      .then((dishes)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(dishes); 
       },(err)=>next(err))
       .catch((err)=>next(err))
  });

  dishRouter.route('/:dishId')
 .get((req,res,next)=>{
  Dishes.findById(req.params.dishId)
  .then((dishes)=>{
   res.statusCode = 200;
   res.setHeader('Content-Type', 'application/json');
   res.json(dishes) 
  },(err)=>next(err))
  .catch((err)=>next(err))
})
.post(authenticate.verifyUser,(req,res,next)=>{
    res.statusCode=403;
    res.end("Post is not supported for dishes/:dishId");
})
.put(authenticate.verifyUser,(req,res,next)=>{
    Dishes.findByIdAndUpdate(req.params.dishId,{
      $set : req.body
    },{new :true})
    .then((dishes)=>{
      console.log('Dish updated ', dishes);
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json'); 
      res.json(dishes) 
     },(err)=>next(err))
     .catch((err)=>next(err))
})
.delete(authenticate.verifyUser,(req,res,next)=>{
    Dishes.findByIdAndRemove(req.params.dishId)
    .then((resp)=>{
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(resp); 
     },(err)=>next(err))
     .catch((err)=>next(err))
});
//----getting all the commenst for a perticulat dish :))
dishRouter.route('/:dishId/comments')
.get((req,res,next)=>{
Dishes.findById(req.params.dishId)
.then((dishes)=>{
  if(dishes!= null){
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(dishes.comments)  ;  
  }else{
    res.statusCode = 400;
    var err = new Error("The dish " + req.params.dishId + " not found :(");
    return next(err);
  }
},(err)=>next(err))
.catch((err)=>next(err))
})
.post(authenticate.verifyUser,(req,res,next)=>{
  Dishes.findById(req.params.dishId)
  .then((dishes)=>{
    if(dishes!= null){
      dishes.comments.push(req.body);
      dishes.save()
      .then((dishes)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(dishes);
      },(err)=>next(err))       
    }else{
      res.statusCode = 400;
      var err = new Error("The dish " + req.params.dishId + " not found :(");
      return next(err);
    }
  },(err)=>next(err))
  .catch((err)=>next(err))
})
.put(authenticate.verifyUser,(req,res,next)=>{
  req.statusCode= 403;
  res.end("Put is not supported on /dishes/comments");
})
.delete(authenticate.verifyUser,(req,res,next)=>{
  Dishes.findById(req.params.dishId)
  .then((dishes)=>{
    if(dishes!= null){
      for(var i =dishes.comments.length-1;i>=0;i--){
        dishes.comments.id(dishes.comments[i]._id).remove();
      }
      dishes.save()
      .then((dishes)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(dishes);
      },(err)=>next(err))       
    }else{
      res.statusCode = 400;
      var err = new Error("The dish " + req.params.dishId + " not found :(");
      return next(err);
    }
   },(err)=>next(err))
   .catch((err)=>next(err))
});

// This is for particular comment :)

dishRouter.route('/:dishId/comments/:commentId')
.get((req,res,next)=>{
 Dishes.findById(req.params.dishId)
 .then((dishes)=>{
   if(dishes!=null && dishes.comments.id(req.params.commentId)!=null){
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(dishes.comments.id(req.params.commentId)) 
  }
  else if (dish == null) {
    err = new Error('Dish ' + req.params.dishId + ' not found');
    err.status = 404;
    return next(err);
  }
  else {
    err = new Error('Comment ' + req.params.commentId + ' not found');
    err.status = 404;
    return next(err);            
  } 
 },(err)=>next(err))
 .catch((err)=>next(err))
})
.post(authenticate.verifyUser,(req,res,next)=>{
   res.statusCode=403;
   res.end("Post is not supported for dishes/:dishId/comments/:commentId");
})
.put(authenticate.verifyUser,(req,res,next)=>{
  Dishes.findById(req.params.dishId)
  .then((dishes)=>{
    if(dishes!=null && dishes.comments.id(req.params.commentId)!=null){
      if(req.body.rating){
        dishes.comments.id(req.params.commentId).rating = req.body.rating;
      }
      if(req.body.comment){
        dishes.comments.id(req.params.commentId).comment = req.body.comment;
      }
      dishes.save()
      .then((dishes)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(dishes.comments.id(req.params.commentId))
      },(err)=>next(err)) 
    }
    else if (dish == null) {
      err = new Error('Dish ' + req.params.dishId + ' not found');
      err.status = 404;
      return next(err);
    }
    else {
      err = new Error('Comment ' + req.params.commentId + ' not found');
      err.status = 404;
      return next(err);            
    } 
  },(err)=>next(err))
    .catch((err)=>next(err))
})
.delete(authenticate.verifyUser,(req,res,next)=>{
  Dishes.findById(req.params.dishId)
  .then((dishes)=>{
    if(dishes!=null && dishes.comments.id(req.params.commentId)!=null){
      dishes.comments.id(req.params.commentId).remove();
      dishes.save()
      .then((dishes)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(dishes.comments.id(req.params.commentId)) 
      },(err)=>next(err))
   }
   else if (dish == null) {
     err = new Error('Dish ' + req.params.dishId + ' not found');
     err.status = 404;
     return next(err);
   }
   else {
     err = new Error('Comment ' + req.params.commentId + ' not found');
     err.status = 404;
     return next(err);            
   } 
  },(err)=>next(err))
  .catch((err)=>next(err))
});
  module.exports = dishRouter;