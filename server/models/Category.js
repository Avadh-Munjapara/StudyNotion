const { default: mongoose } = require("mongoose");

const categorySchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
    },
    courses:[{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    }]
})

exports.module=mongoose.model("Category",categorySchema);