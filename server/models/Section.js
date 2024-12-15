const { default: mongoose } = require("mongoose");

const sectionSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    subSections:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"SubSection"
    }]
})

exports.module=mongoose.model("Section",sectionSchema);