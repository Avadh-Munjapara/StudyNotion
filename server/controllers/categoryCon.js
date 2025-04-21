const Category = require("../models/Category");
const Course = require("../models/Course");
const mongoose = require("mongoose");

exports.createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name || !description) {
      return res.status(400).json({
        success: false,
        message: "all fields are required",
      });
    }
    const category = await Category.create({
      name,
      description,
    });
    return res.status(201).json({
      success: true,
      message: "category created successfully",
      category,
    });
  } catch (error) {
    console.log("error while creating category", error);
    return res.status(500).json({
      success: false,
      message: "something went wrong while creating category",
    });
  }
};

exports.getAllCategory = async (req, res) => {
  try {
    const categories = await Category.find(
      {},
      { name: true, description: true }
    );
    if (!categories) {
      return res.status(404).json({
        success: false,
        message: "no category found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "all categories retrieved successfully",
      categories,
    });
  } catch (error) {
    console.log("error while fetching all categories", error);
    return res.status(500).json({
      success: false,
      message: "something went wrong while fetching categories",
    });
  }
};

exports.getCategoryPageDetails = async (req, res) => {
  try {
    const { categoryId } = req.params;
    // const categoryCourses = await Category.findById(categoryId)
    //   .select("courses")
    //   .populate("courses");
    const categoryCourses = await Category.aggregate([
      {
        $match:{_id:new mongoose.Types.ObjectId(categoryId)}
      },
      {
        $lookup:{
          from:'courses',
          localField:'courses',
          foreignField:'_id',
          as:'courses'
        }
      },
      {
        $project:{
          courses:{
            $filter:{
              input:'$courses',
              as:'course',
              cond:{$eq:["$$course.status",'published']},
            }
          },
        }
      },
      {
        $project:{
          _id:0,
          courses:1
        }
      }
    ]);
    console.log('categorydata',categoryCourses);
    if (!categoryCourses) {
      return res.status(400).json({
        success: false,
        message: "no category found",
      });
    }
    if (categoryCourses?.courses?.length == 0) {
      return res.status(404).json({
        success: false,
        message: "no courses found for the selected category",
      });
    }
    // console.log("category corusees",categoryCourses.courses);
    const diffCategoryCourses = await Category.aggregate([
      {
        $match: {
          _id: {
            $ne: new mongoose.Types.ObjectId(`${categoryId}`),
          },
        },
      },
      {
        $lookup: {
          from: "courses",
          localField: "courses",
          foreignField: "_id",
          as: "courses",
        },
      },
      {
        $project: {
          courses: 1,
          _id: 0,
        },
      },
    //   {
    //     $limit:5
    //   }
    ]);
    let crs=[];
    diffCategoryCourses.map((item,index)=>item.courses.map((item,index)=>crs.push(item)))
    const crs2= crs.slice(0,4);

    const topSellingCourses = await Course.find({})
      .sort({ studentsEnrolled: "desc" })
      .limit(10);
      // console.log("top corusees",topSellingCourses);

    return res.status(200).json({
      success: true,
      categoryCourses: categoryCourses[0]?.courses,
      diffCategoryCourses: crs2,
      topSellingCourses,
    });
  } catch (error) {
    console.log("error while fetching category page details", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
