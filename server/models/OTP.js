const { default: mongoose } = require("mongoose");

const OTPSchema=mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        expires:5*60
    },
    otp:{
        type:String,
        required:true
    }
})

exports.module=mongoose.model("OTP",OTPSchema);