const express=require('express');
const connectDB=require("./config/database");
const app = express(); // instance of express
const User=require("./models/user");

app.use(express.json()); // middleware to parse json

app.post("/signup",async (req, res) => {
    // Creating new Instance of User Module
    const user=new User(req.body);
    try{
        await user.save();
    res.send("User Added Successfully ");
    }catch(err){
        res.status(400).send("Error saving the user" + err.message);
    }
});


connectDB()
.then(()=>{
    console.log("Database Connected");
    app.listen(3000,()=>{
    console.log("Server is running on port 3000");
});
})
.catch(err=>{
    console.log("Database Not Connected");
});
