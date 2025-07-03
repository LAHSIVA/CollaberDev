const express=require('express');
const app=express(); // instance of express

app.use("/test",(req,res)=>{
    res.send('Hello from the server!');
}); // server is responding to the request

app.listen(3000,()=>{
    console.log('Listening to port 3000...')
}); // listening to port 3000 [Server]
