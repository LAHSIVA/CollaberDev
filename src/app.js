const express=require('express');
const app=express(); // instance of express

app.get(
    '/user',
    (req,res,next)=>{
    console.log("Handling route user1");
    next();
},
(req,res,next)=>{
    console.log("Handling route user2");
    //res.send("2nd Response");
    next();
},
(req,res,next)=>{
    console.log("Handling route user3");
    //res.send("3rd Response");
    next();
},
(req,res,next)=>{
    console.log("Handling route user4");
    //res.send("4th Response");
    next();
});
app.listen(3000);