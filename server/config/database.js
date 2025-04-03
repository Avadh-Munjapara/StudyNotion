const { default: mongoose } = require("mongoose")
require('dotenv').config();
const conncetToDatabase=async ()=>{
    try{
        await mongoose.connect(process.env.DBURL,{
            dbName:'StudyNotionDB',
            useNewUrlParser:true,
            useUnifiedTopology:true,
        })
        console.log("connection to database is successful");
    }catch(error){
        console.log("error while connecting with database",error);
        process.exit(1);
    }
};

module.exports=conncetToDatabase;