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

// Get user by email
app.get("/user",async(req,res)=>{
    const userEmail=req.body.emailId;
    try{
        const users=await User.find({emailId:userEmail});
        if(users.length===0){
            return res.status(404).send("User Not Found");
        }
        else{
            res.send(users);
        }
    }
    catch(err){
        res.status(400).send("Something Went Wrong" + err.message);
    }
})


// Feed API --> Get all users from the database
app.get("/feed",async(req,res)=>{

    try{
        const users=await User.find({});
        res.send(users);
    }
    
    catch(err){
        res.status(400).send("Something Went Wrong" + err.message);
    }

   
    
})

// Delete the user from the Database
app.delete("/user",async(req,res)=>{
    const userId=req.body.userId;
    try{
        const users=await User.findByIdAndDelete(userId);
        if(users.length===0){
            return res.status(404).send("User Not Found");
        }
        else{
            res.send("User Deleted Successfully");
        }
    }
    catch(err){
        res.status(400).send("Something Went Wrong" + err.message);
    }
})

// Update data of the user
app.patch("/user/:userId",async(req,res)=>{
    const userId=req.params?.userId;
    const data=req.body;

    try{
        const ALLOWED_UPDATES = [
        "userId","skills","age","gender","photoUrl","about"
    ];

    const isUpdateAllowed = Object.keys(data).every((k) => 
        ALLOWED_UPDATES.includes(k)
    );
    if(!isUpdateAllowed){
         throw new Error("Update is not allowed");
    }
    if(data?.skills.length>10){
        throw new Error("You cannot add more than 10 skills");
        
    }
        const users=await User.findByIdAndUpdate({_id:userId},data);
        if(users.length===0){
            return res.status(404).send("User Not Found");
        }
        else{
            res.send("User Updated Successfully");
        }
    }
    catch(err){
        res.status(400).send("Update Failed" + err.message);
    }
    
})


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
