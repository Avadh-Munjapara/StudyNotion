const { default: mongoose } = require("mongoose");

const ratingAndReviewSchema=mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    rating:{
        type:Number,
        required:true,
    },
    review:{
        type:String,
        required:true
    },
    course:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course",
        required:true,
        index:true
    }
})

exports.module=mongoose.model("RatingAndReview",ratingAndReviewSchema);