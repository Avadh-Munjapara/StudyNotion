const { default: mongoose } = require("mongoose");
const mailSender = require("../utils/mailSender");
const SendmailTransport = require("nodemailer/lib/sendmail-transport");

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

const sendVerificationEmail=async (email,otp)=>{
    try {
        const sentMail=await mailSender(email,"otp verification mail from StudyNotion",otp);
        console.log("email for verification sent successfully",sentMail);
    } catch (error) {
        console.log("error while sending mail",error);
    }
}

OTPSchema.pre('save',async(next)=>{
       await sendVerificationEmail(this.email,this.otp);
       next();
})





exports.module=mongoose.model("OTP",OTPSchema);