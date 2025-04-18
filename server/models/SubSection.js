const { default: mongoose } = require("mongoose");

const subSectionSchema=mongoose.Schema({
    title:{
        type:String
    },
    timeDuration:{
        type:Number
    },
    description:{
        type:String
    },
    videoUrl:{
        type:String
    }
}
);

module.exports=mongoose.model("SubSection",subSectionSchema);