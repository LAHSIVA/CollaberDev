const mongoose=require('mongoose');

const connectDB =async()=>{
    await mongoose.connect(
    'mongodb+srv://vishalpers2024:kErwrIr0C7oUbwlZ@namastenode.yb8cuqu.mongodb.net/'
);
    
};

connectDB().then(()=>{
    console.log("Database Connected");
})
.catch(err=>{
    console.log("Database Not Connected");
});
