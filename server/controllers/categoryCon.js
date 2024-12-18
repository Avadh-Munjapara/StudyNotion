const Category=require('../models/Category')

exports.createCategory=async (req,res)=>{
    try {
        const {name,description}=req.body;
        if(!name||!description){
             return res.status(400).json({
                 success:false,
                 message:"all fields are required"
            });
        }
        const category=await Category.create({
            name,
            description
        });
        return res.status(201).json({
            success:true,
            message:"tag created successfully",
            category
        })

    } catch (error) {
        console.log('error while creating category', error);
        return res.status(500).json({
            success: false,
            message: 'something went wrong while creating category'
        });
    }
}

exports.getAllCategory=async(req,res)=>{
    try {
        const categories=await Category.find({},{name:true,description:true});
        if(!categories){
             return res.status(404).json({
                 success:false,
                 message:"no category found"
            });
        }
        return res.status(200).json({
            success:true,
            message:"all tags retrieved successfully",
            categories
        });
    } catch (error) {
        console.log('error while fetching all categories', error);
        return res.status(500).json({
            success: false,
            message: 'something went wrong while fetching categories'
        });
    }
}

