const User = require("../models/User");
const crypto=require('crypto');
const mailSender = require("../utils/mailSender");
exports.resetPassword=async(req,res)=>{
    try {
                //fetch email
                const{email}=req.body;    
                //check user
                if(!email){
                     return res.status(400).json({
                         success:false,
                         message:"email not provided"
                    });
                }
                const user=await User.findOne({email});
                if(!user){
                     return res.status(404).json({
                         success:fasle,
                         message:"user is not registered"
                    });
                }
                //create token and insert it into the user model
                const resetToken=crypto.randomUUID();
                const updatedUser=await User.findOneAndUpdate({email},
                    {   
                        resetToken:resetToken,
                        tokenExpires:Date.now()+5*60*1000
                    },
                    {new:true})
        
                //create link
                const url=`http://localhost:3000/reset-password/${resetToken}`;
        
                //send link to email
                const resetPasswordMail=await mailSender(email,"link for reseting password",
                    `click on this link to reset your password ${url}`);
                //return response
                 return res.status(200).json({
                     success:true,
                     message:"mail for reseting password is sent successfully"
                });
    } catch (error) {
        console.log('Error in reset password', error); 
        return res.status(500).json({
            success: false,
            message: 'failure in reseting password'
        });
    }
}