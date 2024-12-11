const { default: mongoose } = require("mongoose");

const subSectionSchema=mongoose.Schema({
    title:{
        type:String
    },
    timeDuration:{
        type:String
    },
    description:{
        type:String
    },
    videoUrl:{
        type:String
    }
}
);

exports.module=mongoose.model("SubSection",subSectionSchema);