const express=require("express");
const{validateSignUpData}=require("../utils/validation");
const authRouter=express.Router();
const User=require("../models/user");
const bcrypt = require('bcrypt');


authRouter.post("/signup",async (req, res) => {
    try{
    // Validation of Data
    validateSignUpData(req);

    const{firstName,lastName,emailId,password}=req.body;

    // Encrypt the password
        const passwordHash=await bcrypt.hash(password,10);
        console.log(passwordHash);


    // Creating new Instance of User Module
    const user=new User({
        firstName,
        lastName,
        emailId,
        password:passwordHash,
    });
    
        await user.save();
    res.send("User Added Successfully ");
    }catch(err){
        res.status(400).send("Error saving the user" + err.message);
    }
});

authRouter.post("/login",async(req,res)=>{
    try{
        const {emailId,password}=req.body;
        const user=await User.findOne({emailId:emailId});
        if(!user){
            throw new Error("Invalid Credentials");
        }
        const ispasswordValid=await user.validatePassword(password);
        if(ispasswordValid){

            
            const token=await user.getJWT();
            
            res.cookie("token",token,{
                expires:new Date(Date.now()+8 *3600000),
            });

            res.send("Login Successfull");
        }
        else{
            throw new Error("Invalid Credentials");
        }
    }
    catch(err){
        res.status(400).send("Something Went Wrong" + err.message);
    }
});

authRouter.post("/logout",async(req,res)=>{
    try{
        res.cookie("token",null,{
            expires:new Date(Date.now()),
        });
        res.send("Logout Successful");
    }
    catch(err){
        res.status(400).send("Something Went Wrong" + err.message);
    }
});


module.exports=authRouter;