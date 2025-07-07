const mongoose = require('mongoose');

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
        trim:true
    },
    password: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        min: 18
    },
    gender: {
        type: String,
        validate(value){
            if(value !== "male" && value !== "female" && value !== "other"){
                throw new Error("Gender is not valid");
            }
        },
    },
    photoUrl:{
        type: String,
        default:"https://t4.ftcdn.net/jpg/02/44/43/69/240_F_244436923_vkMe10KKKiw5bjhZeRDT05moxWcPpdmb.jpg"
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

module.exports = mongoose.model('User', userSchema);

