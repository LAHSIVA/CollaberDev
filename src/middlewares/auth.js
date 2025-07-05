const adminAuth=(req,res,next)=>{
    console.log("Admin Auth is getting checked!!");
    const token="xyz";
    const isAdminAuthorized=token ==="xyz";
    if(!isAdminAuthorized){
        return res.status(403).send("Unauthorized request");
    }else{
        next();
    }    
};

module.exports={adminAuth};