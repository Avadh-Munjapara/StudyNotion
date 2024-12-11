const { default: mongoose } = require("mongoose");

const courseProgressSchema=mongoose.Schema({
    courseId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course",
        required:true,
    },
    completedVideos:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"SubSection",
    }]
})

exports.module=mongoose.model("CourseProgress",courseProgressSchema);