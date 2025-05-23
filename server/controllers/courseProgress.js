const  CourseProgress = require("../models/CourseProgress");

exports.markComplete= async (req, res) =>{
  const { courseId, subSectionId} = req.body;
  const userId=req.user.id;
  if (!courseId || !subSectionId || !userId) {
    return res.status(400).json({
      success: false,
      message: "all fields are required",
    });
  }
   var progressObject =await CourseProgress.findOne({courseId,userId});
   console.log(progressObject);
    if (!progressObject) {
      progressObject = CourseProgress.create({
        courseId,
        completedVideos:[subSectionId],
        userId
      })
      return res.status(200).json({
        success:true,
        message:'lecture marked as completed',
        progressObject
      })
    }
    const progressResponse=await CourseProgress.findByIdAndUpdate(progressObject._id,{$push:{completedVideos:subSectionId}},{new:true});
    return res.status(200).json({
        success:true,
        message:'lecture marked as completed',
        progressResponse
    })
}
