const { default: mongoose } = require("mongoose");

const sectionSchema=mongoose.Schema({
    name:{
        type:String,
        subSections:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:"SubSection"
        }]
    }
})

exports.module=mongoose.model("Section",sectionSchema);