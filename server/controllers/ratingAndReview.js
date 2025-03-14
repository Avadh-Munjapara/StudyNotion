const { default: mongoose } = require('mongoose');
const Course = require('../models/Course');
const RAR=require('../models/RatingAndReview');
exports.createRating=async(req,res)=>{
    try {
        const {rating,review,courseId}=req.body;
        if(!rating||!review){
            return res.status(400).json({message:'Please fill all fields'});
        }
        const userId=req.user.id;
        //if user has enrolled in course
        const isEnrolled=await Course.findOne({_id:courseId,studentsEnrolled:{$elemMatch:{$eq:userId}}});
        if(!isEnrolled){
             return res.status(400).json({
                 success:false,
                 message:"student is not enrolled in course"
            });
        }
        //check is student has already rated course
        const isRated=await RAR.findOne({course:courseId,user:userId});
        if(!isRated){
            return res.status(400).json({
                success:false,
                message:"student is already rated course"
           });
       }
        const newRating=await RAR.create({
            rating,
            review,
            user:userId
        })
        const ratedCourse=await Course.findByIdAndUpdate(courseId,{$push:{ratingAndReviews:newRating._id}},{new:true});
         return res.status(201).json({
             success:true,
             message:"rating created successfully",
             ratingAndReview:newRating
        });
    } catch (error) {
        console.log('errpr while creating rating', error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}
exports.getAverageRating=async(req,res)=>{
    try {
        const {courseId}=req.body;
    const result=await RAR.aggregate([{$match:{
        course:new mongoose.Schema.Types.ObjectId(courseId),
    }},{
        $group:{
        _id:null,
        avgRating:{
            $avg:"$rating"
        }
    }}])
    if(result.length>0){

        return res.status(200).json({
            success:true,
            avgRating:result[0].avgRating
       });
    }
    return res.status(200).json({
        success:true,
        message:"average rating is zero,no ratings are given till now"
   });

    } catch (error) {
        console.log('error while fetching avg rating', error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

exports.getAllReviews=async(req,res)=>{
    try {
        const allRatings=RAR.find({}).sort({rating:"desc"}).populate({
            path:"user",
            select:"firstName lastName image email"
        }).pouplate({
            path:"course",
            select:"name"
        });
         return res.status(200).json({
             success:true,
             message:"all reviews fetched successfully",
             data:allRatings
        });
    } catch (error) {
        console.log('error while getting all ratings', error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

exports.getCourseReviews=async(req,res)=>{
    try {
        const{courseId}=req.body;
        const cid=new mongoose.Schema.Types.ObjectId(courseId);
        const courseReviews=await RAR.find({course:cid});
        if(!courseReviews){
             return res.status(200).json({
                 success:true,
                 message:"no reviews given to course till now"
            });
        }
         return res.status(200).json({
             success:true,
             data:courseReviews
        });
    } catch (error) {
        console.log('error while fetching course reviews', error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
 
}