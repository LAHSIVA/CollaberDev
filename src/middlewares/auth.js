const jwt=require("jsonwebtoken");
const User=require("../models/user");
const userAuth= async(req,res,next)=>{
       //Read the token from the cookies
       try {
       const {token}=req.cookies;
       if(!token){
        throw new Error("Token is Not valid");
       }
       const decodedObj=await jwt.verify(token,"secret@2003");

        const {_id}=decodedObj;
        const user=await User.findById(_id);
        if(!user){
            throw new Error("User Not Found");
        }

        req.user=user;
        next();
       } catch (error) {
        res.status(400).send("ERROR" + error.message);
       }
       
       //Validate the token
       //Find the user
};

module.exports={
    userAuth,
};