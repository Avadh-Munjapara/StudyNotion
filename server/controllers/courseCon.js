const Course = require("../models/Course");

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