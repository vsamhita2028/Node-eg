const express = require('express');
const http = require('http');
const morgan = require("morgan");
const bodyParser= require('body-parser')
const hostname ='localhost';
const port = 3000;

const app= express();
app.use(morgan('dev'));
app.use(bodyParser.json());
app.all('/dishes', (req,res,next) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  next();
});

app.get("/dishes",(req,res,next)=>{
    res.end("We will get all the dishes");
});
app.post("/dishes",(req,res,next)=>{
    res.end("We will add the dish "+req.body.name+" with details "+req.body.description);
});
app.put("/dishes",(req,res,next)=>{
    req.statusCode= 403;
    res.end("Put is not supported on /dishes");
});
app.delete("/dishes",(req,res,next)=>{
    res.end("We will delete all the dishes");
});

app.get("/dishes/:dishId",(req,res,next)=>{
    res.end("We will get the dish with id "+ req.params.dishId);
});
app.post("/dishes/:dishId",(req,res,next)=>{
    res.statusCode=403;
    res.end("Post is not supported for dishes/:dishId");
});
app.put("/dishes/:dishId",(req,res,next)=>{
    res.write("We will update the dish with id "+ req.params.dishId+"\n")
    res.end("We will update the dish "+ req.body.name+" with details "+req.body.description);
});
app.delete("/dishes/:dishId",(req,res,next)=>{
    res.end("We will delete the dish with id "+ req.params.dishId);
});
//The below code is for public folder files.
app.use(express.static(__dirname+"/public"))
app.use((req,res,next)=>{
   
    res.statuscode =200;
    res.setHeader("Content-Type","text/html");

    res.end("<html><body><h1>This is an express server</h1></body></html>")
});

const server =http.createServer(app);



server.listen(port,hostname,()=>{
    console.log(`Server running at http://${hostname}:${port}/`)
})