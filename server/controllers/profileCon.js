const Profile=require('../models/Profile');
const User=require('../models/User');
const { imageUpload } = require('../utils/cloudinaryUpload');
require('dotenv').config();
exports.updateProfile=async(req,res)=>{
    try {
       const{dob="",about="",phoneNumber,gender}=req.body; 
       if(!gender||!phoneNumber){
         return res.status(400).json({
             success:false,
             message:"gender and phoneNumber fields are required"
        });
       }
       const userId=req.user.id;
       const user=await User.findById(userId);
       const profileId=user.additionalDetails;
       const profile=await Profile.findByIdAndUpdate(profileId,{
        gender,
        dob,
        about,
        phoneNumber
       });
        return res.status(200).json({
            success:true,
            message:"profile updated successfully",
            profile
       });
    } catch (error) {
        console.log('error while updating profile', error);
        return res.status(500).json({
            success: false,
            message: 'failure in updating profile'
        });
    }
}

exports.deleteAccount=async(req,res)=>{
    try {
       const userId=req.user.id;
       const account=await User.findByIdAndDelete(userId);
       if(!account){
         return res.status(404).json({
             success:false,
             message:"no account found"
        });
       }
       //do i need to remove user from other documetns entries?
        return res.status(200).json({
            success:true,
            message:"account deleted successfully"
       });
    } catch (error) {
        console.log('error while deleting profile', error);
        return res.status(500).json({
            success: false,
            message: 'failure in deleting profile'
        });
    }
}
 
exports.getUserDetails=async(req,res)=>{
    try {
        const userId=req.user.id;
        const user=await User.findById(userId).populate('additionalDetails').exec();
        return res.status(200).json({
            success:true,
            user    
        })
    } catch (error) {
        console.log('error while getting user details', error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

exports.updateDisplayPicture=async(req,res)=>{
    try {
        const{displayPicture}=req.files;
        const userId=req.user.id;
        const dpCloudinary=await imageUpload(displayPicture,process.env.FOLDERNAME);
        const updatedProfile=await User.findByIdAndUpdate(userId,{image:dpCloudinary.secure_url},{new:true});
         return res.status(200).json({
             success:true,
             message:"display picture is updated successfully",
             url:dpCloudinary.secure_url
        });
    } catch (error) {
        console.log('error while updating the dp', error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

exports.getEnrolledCourses=async (req,res)=>{
    try {
        const userId=req.user.id;
        const enrolledCourses=await User.findById(userId).populate("courses").select("courses");   
        if(!enrolledCourses){
             return res.status(404).json({
                 success:false,
                 message:"no user with that user id"
            });
        }
        if(enrolledCourses.length==0){
             return res.status(404).json({
                 success:fasle,
                 message:"you have not enrolled in any courses"
            });
        }
         return res.status(200).json({
             success:true,
             message:"enrolled courses fetched successfully",
             enrolledCourses
        });
    } catch (error) {
        console.log('error while fetching enrolled courses data', error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}