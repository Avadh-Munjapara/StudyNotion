const OTP=require('../models/OTP');
const Profile = require('../models/Profile');
const User = require('../models/User');
const bcrypt=requrie('bcrypt');
//signup
const signup=async(req,res)=>{
    
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
        const checkUser=User.findOne({email});
        if(checkUser){
             return res.status(400).json({
                 success:false,
                 message:"the user is already registered"
            });
        }
        
    //check for otp
        const recentOTP=OTP.find({email}).sort({createdAt:-1}).limit(1);
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

    const user=User.create({
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

//otp generate

//change password