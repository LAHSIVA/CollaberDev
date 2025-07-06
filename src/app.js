const express=require('express');
const connectDB=require("./config/database");
const app = express(); // instance of express
const User=require("./models/user");

app.post("/signup",async (req, res) => {
    const userObj={
        firstName: "Vishal",
        lastName: "V",
        emailId: "vishalvenkat2019@gmail.com",
        password: "Vishal@123",
        age: 22,
        gender: "Male"
    }

    // Creating new Instance of User Module
    const user=new User(userObj);
    try{
        await user.save();
    res.send("User Added Successfully ");
    }catch(err){
        res.sendStatus(400).send("Error saving the user" + err.message);
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
