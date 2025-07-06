const mongoose=require('mongoose');

const connectDB =async()=>{
    await mongoose.connect(
    'mongodb+srv://vishalpers2024:kErwrIr0C7oUbwlZ@namastenode.yb8cuqu.mongodb.net/'
);
    
};

module.exports=connectDB;
