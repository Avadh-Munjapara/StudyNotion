const { default: mongoose } = require("mongoose");

const tagSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
    },
    course:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    }
})

exports.module=mongoose.model("Tag",tagSchema);