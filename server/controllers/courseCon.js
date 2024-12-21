const Course = require("../models/Course");
const User=require("../models/User");
const category=require("../models/Category");
const { imageUpload } = require("../utils/cloudinaryUpload");
exports.createCourse=async(req,res)=>{
    try {
        const{name,description,whatYouWillLearn,price,category}=req.body;
        const {thumbnail}=req.files;
        if(!name||!description||!whatYouWillLearn||!price||!category||!image){
             return res.status(400).json({
                 success:false,
                 message:"all fields are required, somthing is missing"
            });
        }
        const instructor=await User.findById(req.user.id);
        if(!instructor){
             return res.status(404).json({
                 success:false,
                 message:"instructor is not in our database"
            });
        }
        const categoryDoc=await Category.findById(category);
        if(!categoryDoc){
             return res.status(400).json({
                 success:false,
                 message:"no category found"
            });
        }
        const thumbUpload=await imageUpload(thumbnail,process.env.FOLDERNAME)
        const course=await Course.create({
            name,
            description,
            whatYouWillLearn,
            price,
            category:categoryDoc._id,
            instructor:instructor._id,
            thumbnail:thumbUpload.secure_url
        });
        const updatedCategory=await Category.findByIdAndUpdate(category,{$push:{course:categoryDoc._id}},{new:true});
        const updatedInstructor=await User.findByIdAndUpdate(instructor._id,{$push:{courses:course._id}},{new:true});
        return res.status(201).json({
             success:true,
             message:"the course created successfully"
        });
    } catch (error) {
        console.log('error while creating course', error);
        return res.status(500).json({
            success: false,
            message: 'something went wrong while creating course'
        });
    }
}

exports.getCourseDetails=async (req,res)=>{
    const courseId=req.body.courseId;
    if(!courseId){
         return res.status(400).json({
             success:false,
             message:"courseId not found"
        });
    }
    try {
        const course=await Course.find({_id:courseId}).populate("ratingAndReviews").populate({
                                                                                    path:"instructor",
                                                                                    populate:{
                                                                                        path:"additinoalDetails",
                                                                                    }}).populate({
                                                                                        path:"courseContent",
                                                                                        populate:{
                                                                                            path:"subSections"
                                                                                        }
                                                                                    }).populate("Category");
        if(!course){
             return res.status(400).json({
                 success:false,
                 message:"no course found with that courseid"
            });
        }
        return res.status(200).json({
             success:true,
             course
        });
    } catch (error) {
        console.log('error while fetching details of course', error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

exports.getAllCourses=async (req,res)=>{
    try {
        const allCourses=await Course.find({});
         return res.status(200).json({
             success:true,
             message:"query successfull",
             allCourses
        });
    } catch (error) {
        console.log('error while fetching all courses', error);
        return res.status(500).json({
            success: false,
            message: 'something went wrong while fetching courses'
        });
    }
}