const Tag=require('../models/Tag')

exports.createTag=async (req,res)=>{
    try {
        const {name,description}=req.body;
        if(!name||!description){
             return res.status(400).json({
                 success:false,
                 message:"all fields are required"
            });
        }
        const tag=await Tag.create({
            name,
            description
        });
        return res.status(201).json({
            success:true,
            message:"tag created successfully",
            tag
        })

    } catch (error) {
        console.log('error while creating tag', error);
        return res.status(500).json({
            success: false,
            message: 'something went wrong while creating tag'
        });
    }
}

exports.getAllTags=async(req,res)=>{
    try {
        const tags=await Tag.find({},{name:true,description:true});
        if(!tags){
             return res.status(404).json({
                 success:false,
                 message:"no tags found"
            });
        }
        return res.status(200).json({
            success:true,
            message:"all tags retrieved successfully",
            tags
        });
    } catch (error) {
        console.log('error while fetching all tags', error);
        return res.status(500).json({
            success: false,
            message: 'something went wrong while fetching tags'
        });
    }
}