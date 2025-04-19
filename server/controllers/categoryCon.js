const Category=require('../models/Category');
const Course = require('../models/Course');
const mongoose = require('mongoose');

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
            message:"category created successfully",
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
            message:"all categories retrieved successfully",
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

exports.getCategoryPageDetails=async (req,res)=>{
    try {
        const {categoryId}=req.params;
        const categoryCourses=await Category.findById(categoryId).populate("courses").select("courses");
        if(!categoryCourses){
             return res.status(400).json({
                 success:false,
                 message:"no category found"
            });
        }
        if(categoryCourses.courses.length==0){
             return res.status(404).json({
                 success:false,
                 message:"no courses found for the selected category"
        })
    }
    const diffCategoryCourses=await Category.find({_id:{
        $ne:categoryId 
    }}).select("courses").populate("courses");
    const topSellingCourses=await Course.find({}).sort({studentsEnrolled:"desc"}).limit(10);
     return res.status(200).json({
         success:true,
         categoryCourses,
         diffCategoryCourses,
         topSellingCourses
    }); 
 } catch (error) {
        console.log('error while fetching category page details', error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}