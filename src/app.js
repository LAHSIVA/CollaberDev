const express=require('express');
const app=express(); // instance of express
const { adminAuth } = require('./middlewares/auth');

app.use("/admin",adminAuth);

app.get("/user",(req,res)=>{
    res.send("user Data Sent");
});

app.get("/admin/getAllData ",(req,res)=>{
    res.send("All Data Sent");
});

app.get("/admin/deleteUser ",(req,res)=>{
    res.send("User Deleted");
    
});
app.listen(3000);