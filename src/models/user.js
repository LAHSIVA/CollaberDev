const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minlength: 4,
        maxLength: 20
    },
    lastName: {
        type: String,
    },
    emailId: {
        type: String,
        lowercase:true,
        required: true,
        unique: true,
        trim:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid email address" + value);
            }
        },
    },
    password: {
        type: String,
        required: true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Enter a Strong Password" + value);
            }
        },
    },
    age: {
        type: Number,
        min: 18
    },
    gender: {
        type: String,
        enum:{
            values: ["male","female","others"],
            message: "{VALUE} is incorrect Gender Type",
        },
        // validate(value){
        //     if(!["male","female","others"].includes(value)){
        //         throw new Error("Gender is not valid");
        //     }
        // },
    },
    photoUrl:{
        type: String,
        default:"https://t4.ftcdn.net/jpg/02/44/43/69/240_F_244436923_vkMe10KKKiw5bjhZeRDT05moxWcPpdmb.jpg",
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("Invalid PhotoURL" + value);
            }
        },
    },
    about:{
        type: String,
        default: "This is default about of the user"
    },
    skills:{
        type: [String]
    }
},{
    timestamps:true,
});

userSchema.methods.getJWT = async function(){
    const user=this;
    const token=await jwt.sign({_id:user._id},"secret@2003",{
        expiresIn:"1d",
    });
    return token;
}

userSchema.methods.validatePassword=async function(passwordInputByUser){
    const user=this;
    const passwordHash=user.password;
    const ispasswordValid=await bcrypt.compare(
        passwordInputByUser,
        passwordHash
    );
    return ispasswordValid;
};

module.exports = mongoose.model('User', userSchema);

