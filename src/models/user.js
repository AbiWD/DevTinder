const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required:true,
        minlength:3,
    },
    lastName:{
        type:String 
    },
    emailId:{
        type:String,
        required: true,
        unique: true,
        lowercase: true,
        trim:true,
    },
    password:{
        type: String,
        required:true,
    },
    age:{
        type:Number,
        min: 18,
    },
    gender:{
        type:String,
        validate(value){
            if(!["male","female","others"].includes(value)){
                throw new Error("Gender is not valid");
            }
        }
    },
    photoUrl:{
        type:String,
    },
    about:{
        type: String,
        default:"This is a defalut about the user!"
    },
    skills:{
        type: [String],
    }
}, 
{
    timestamps: true,
});

const userModel = mongoose.model("User",userSchema);

module.exports = userModel;
