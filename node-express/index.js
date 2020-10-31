const express = require('express');
const http = require('http');
const morgan = require("morgan");
const dishesRouter= require('./Routes/dishesRouter');
const promoRouter = require("./Routes/promoRouter");
const leaderRouter =require("./Routes/leaderRouter")

const hostname ='localhost';
const port = 3000;

const app= express();
app.use(morgan('dev'));
app.use("/dishes",dishesRouter);
app.use("/promotions",promoRouter);
app.use("/leaders",leaderRouter);

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