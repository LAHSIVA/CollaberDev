const express=require('express');
const app=express(); // instance of express

//This will only handle GET call to /user
app.get("/user",(req,res)=>{
    res.send({firstName:"Vishal",lastName:"V"});
})

//This will only handle POST call to /user
app.post("/user",(req,res)=>{
    console.log("Saving Data to the database");
    res.send("Data Successfully saved to the database");
})

//This will only handle DELETE call to /user
app.delete("/user",(req,res)=>{
    console.log("Deleting Data from the database");
    res.send("Data Successfully deleted from the database");
})

// This will match all the HTTP method API calls to /test
app.use("/test",(req,res)=>{
    res.send('Hello from the server!');
}); // server is responding to the request

app.listen(3000,()=>{
    console.log('Listening to port 3000...')
}); // listening to port 3000 [Server]
