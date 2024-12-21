const { generate } = require('otp-generator');
const OTP=require('../models/OTP');
const Profile = require('../models/Profile');
const User = require('../models/User');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const mailSender = require('../utils/mailSender');
//signup
exports.signup=async(req,res)=>{
    
    try {
       //fetch detailes
    const{firstName,lastName,email,password,accountType,
        confirmPassword,otp}=req.body;
    //valdation
        if(!firstName||!lastName||!email||!password||!accountType||!confirmPassword||!otp
        ){
            return res.status(400).json({
                success:false,
                message:"one of the field is empty"
            })
        }
        const regx=/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if(!regx.test(email)){
            return res.status(400).json({
                success:false,
                message:"email is not appropriate"
            })
        }
        if(password!==confirmPassword){
            return res.status(400).json({
                success:false,
                message:"password didn't match"
            })
        }
    //check if user exist
        const checkUser=await User.findOne({email});
        if(checkUser){
             return res.status(400).json({
                 success:false,
                 message:"the user is already registered"
            });
        }
        
    //check for otp
        const recentOTP=await OTP.find({email}).sort({createdAt:-1}).limit(1);
        if(recentOtp.length == 0) {
            //OTP not found
            return res.status(400).json({
                success:false,
                message:'OTP not Found',
            });
        }
        else if(recentOTP.OTP!=otp){
             return res.status(400).json({
                 success:false,
                 message:"otp is not valid"
            });
        }
    //hash password
    const hashedPassword=await bcrypt.hash(password,10);

    //create db entry
    const pd={
        gender:null,
        phoneNumber:null,
        about:null,
        dob:null
    }
    const ProfileDetails=await Profile.create(pd);

    const user=await User.create({
        firstName,
        lastName,
        email,
        accountType,
        password:hashedPassword,
        additionDetaile:ProfileDetails._id,
        image:`https://api.dicebear.com/5.x/initials/svg?seed=${firstname} ${lastName}`
    })

     return res.status(201).json({
         success:true,
         message:"USer created successfully"
    });
 
    } catch (error) {
        console.log("error while signup",error);
         return res.status(500).json({
             success:false,
             message:""
        });
    }
}
//login
exports.login=async (req,res)=>{
    try {
    //fetch data
    const {email,password}=req.body;
    //validation
    if(!email||!password){
         return res.status(400).json({
             success:false,
             message:"email or password is missing"
        });
    }
    //check if user exist
    const checkUser=await User.findOne({email});
    if(!checkUser){
         return res.status(404).json({
             success:false,
             message:"user is not registered"
        });
    }
    //password match
    const passMatch=await bcrypt.compare(password,checkUser.password);
    if(!passMatch){
         return res.status(400).json({
             success:false,
             message:"password not matched"
        });
    }
    //create token
    checkUser.password=undefined;
    checkUser.token=token;
    const jwtPayload={
        email,
        id:checkUser._id,
        role:checkUser.accountType
    }
    const token=jwt.sign(jwtPayload,process.env.JWT_SECRET,{
        exporiesIn:'2h'
    })
    //send cookie and token
    return res.cookie('token',token,{
        expires:new Date(Date.now()+3*24*60*60*1000),
        httpOnly:true
    }).json({
        success:true,
        token,
        user:checkUser,
        message:"user logged in successfully"
    })  
    } catch (error) {
        console.log("error while login",error);
         return res.status(500).json({
             success:false,
             message:"error while login"
        });
    }
}  
//send otp
exports.sendOTP=async (req,res)=>{
    try {
     //fetch email
        const{email}=req.body;
        if(!email){
             return res.status(400).json({
                 success:false,
                 message:"email is not provided"
            });
        }
    //checkUser
        const user=await User.findOne({email});
        if(user){
             return res.status(401).json({
                 success:false,
                 message:"user is already registered"
            });
        }
    //otp create
        let otp=generate(6,{
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChar:false,
        });
        while(otp===await OTP.findOne({OTP:otp}).OTP){
            let otp=generate(6,{
                upperCaseAlphabets:false,
                lowerCaseAlphabets:false,
                specialChar:false,
            });
        }
    //create dbentry
        const otpDoc=await OTP.create({
            email,
            OTP:otp
        });
         return res.status(200).json({
             success:true,
             message:"otp set successfully"
        });
    } catch (error) {
        console.log('error while generating otp', error);
        return res.status(500).json({
            success: false,
            message: 'error while generating otp'
        });
    }
}
//change password
exports.changePassword=async(req,res)=>{
    try {
        //data fetch
        const{email,oldPassword,password,confirmPassword}=req.body;
        //validation
        if(!email||!password||!confirmPassword||!oldPassword){
             return res.status(400).json({
                 success:false,
                 message:"all fields are required"
            });
        }
        //password check
        if(password!=confirmPassword){
             return res.status(400).json({
                 success:false,
                 message:"passwords not matched"
            });
        }
        //old password check
        let user=await User.findOne({email});
        if(!user){
             return res.status(400).json({
                 success:false,
                 message:"user is not registered"
            });
        }
        const oldPassCheck=await bcrypt.compare(password,user.password);
        if(!oldPassCheck){
             return res.status(401).json({
                 success:false,
                 message:"old password is not correct"
            });
        }
        //password hash
        const hashedPassword=await bcrypt.hash(password,10);
        //update password in db
        user=await User.findOneAndUpdate({email},{password:hashedPassword},{new:true})
        //send mail to user
        const passUpdateMail=await mailSender(email,"your password has changed",
            "your password has been changed");
        //return response
        return res.status(200).json({
             success:true,
             message:"password changed successfully"
        });
    } catch (error) {
        console.log('error in changing password', error);
        return res.status(500).json({
            success: false,
            message: 'failure in changing password'
        });
    }
}

