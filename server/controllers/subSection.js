const Section=require('../models/Section');
const SubSection=require('../models/SubSection');
const { videoUpload } = require('../utils/cloudinaryUpload');
require('dotenv').config();
exports.createSubSection=async (req,res)=>{
    try {
        const{title,timeDuration,description,sectionId}=req.body;
        if(!title || !timeDuration || !description || !sectionId){
             return res.status(400).json({
                 success:false,
                 message:"all fields are required"
            });
        }
        const{videoFile}=req.files;
        const video=await videoUpload(videoFile.tempFilePath,process.env.FOLDERNAME);
        const subSection=await SubSection.create({
            title,timeDuration,description,videoUrl:video.secure_url
        });
        const updatedSection=await Section.findByIdAndUpdate(sectionId,{
            $push:{subSections:subSection._id}
        },{new:true}).populate("subSections");

         return res.status(201).json({
             success:true,
             message:"section created successfully",
             updatedSection
        });
    
    } catch (error) {
        console.log('error while creating subSection', error);
        return res.status(500).json({
            success: false,
            message: 'something went wrong while creating subSection'
        });
    }
    
}

exports.updateSubSection=async (req,res)=>{
    try {
        const{subectionId,name,title,timeDuration}=req.body;
        if(!subectionId||(!name||!title||!timeDuration)){
            return res.status(400).json({
                success:false,
                message:"subsectionid and of the field are required"
           });
       }
       let updateObject; 
       if(name){
        updateObject.name=name
       }
       if(title){
        updateObject.title=title
       }
       if(timeDuration){
        updateObject.timeDuration=timeDuration
       }
        const updatedSubSection=await SubSection.findByIdAndUpdate(subectionId,updateObject);
        return res.status(200).json({
        success:true,
        message:"subsection updated successfully",
        updatedSubSection
    });
    } catch (error) {
        console.log('error while updating subsection', error);
        return res.status(500).json({
            success: false,
            message: 'something went wrong while updating subsection'
        });
    }
}

exports.deleteSubSection=async (req,res)=>{
    try {
        const{subSectionId}=req.params;
     
        const deletedSubSection=await SubSection.findByIdAndDelete(subSectionId);
        //should i write code delete subsection from the section?
         return res.status(200).json({
             success:true,
             message:"subsection deleted successfully",
             deletedSubSection
        });
    } catch (error) {
        console.log('error while deleting subsection', error);
        return res.status(500).json({
            success: false,
            message: 'something went wrong while deleting subsection'
        });
    }
}