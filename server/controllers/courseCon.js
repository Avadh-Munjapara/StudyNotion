const Course = require("../models/Course");
const User=require("../models/User"); 
const Category=require("../models/Category");
const { imageUpload } = require("../utils/cloudinaryUpload");
const { default: mongoose } = require("mongoose");
const {ObjectId}=mongoose.Types;    
exports.createCourse=async(req,res)=>{  
    try {
        const{name,description,whatYouWillLearn,price,category,tags,instructions}=req.body;
        const {thumbnail}=req.files;

        if(!name||!description||!whatYouWillLearn||!price||!category||!thumbnail||!tags||!instructions){
             return res.status(400).json({
                 success:false,
                 message:"all fields are required, somthing is missing"
            });
        }
        const instructor=await User.findById(req.user.id);
        if(!instructor){
             return res.status(404).json({
                 success:false,
                 message:"instructor is not in our database"
            });
        }
        const categoryId=await Category.find({name:category},'_id');
        const categoryDoc=await Category.findById(categoryId);
        if(!categoryDoc){
             return res.status(400).json({
                 success:false,
                 message:"no category found"
            });
        }
        const thumbUpload=await imageUpload(thumbnail,process.env.FOLDERNAME);
        const course=await Course.create({
            name,
            description,
            whatYouWillLearn,
            price,
            category:categoryDoc._id,
            instructor:instructor._id,
            thumbnail:thumbUpload.secure_url,
            tag:tags,
            instructions,
            status:"draft"
        });
        const updatedCategory=await Category.findByIdAndUpdate(categoryId,{$push:{courses:course._id}},{new:true});
        const updatedInstructor=await User.findByIdAndUpdate(instructor._id,{$push:{courses:course._id}},{new:true});
        return res.status(201).json({
             success:true,
             message:"the course created successfully",
             course
        });
    } catch (error) {  
        console.log('error while creating course', error);
        return res.status(500).json({
            success: false,
            message: 'something went wrong while creating course'
        });
    }
}

exports.getCourseDetails=async (req,res)=>{
    const courseId=req.params.courseId;
    if(!courseId){
         return res.status(400).json({
             success:false,
             message:"courseId not found"
        });
    }
    try {
        const course = await Course.findById(courseId)
          .populate({
              path: "instructor",
              populate: {
                path: "additionalDetails"
              },
              options: { strictPopulate: false }
          })
          .populate({
              path: "category",
              options: { strictPopulate: false }
          })
          .populate({
              path: "courseContent",
              populate: {
                path: "subSections"
              },
              options: { strictPopulate: false }
          });
        
        if(!course){
             return res.status(400).json({
                 success:false,
                 message:"no course found with that courseid"
            });
        }
        return res.status(200).json({
             success:true,
             course
        });
    } catch (error) {
        console.log('error while fetching details of course', error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

exports.getAllCourses=async (req,res)=>{
    try {
        const allCourses=await Course.find({}).populate({
            path:'instructor',
            select:'firstName lastName'
        }).populate({
            path:'category',
            select:'name description'
        });
         return res.status(200).json({
             success:true,
             message:"query successfull",
             allCourses
        });
    } catch (error) {
        console.log('error while fetching all courses', error);
        return res.status(500).json({
            success: false,
            message: 'something went wrong while fetching courses'
        });
    }
}

exports.editCourse=async(req,res)=>{
 try {
    const{name,description,whatYouWillLearn,status,price,category,tags,instructions,courseId}=req.body;
    console.log(name,description,whatYouWillLearn,price,category,tags,instructions,status,courseId);
    let thumbnail;
    if(req.files){
        thumbnail=req.files.thumbnail;
    }
    if(!name&&!description&&!whatYouWillLearn&&!price&&!category&&!thumbnail&&!tags&&!instructions&&!status){
         return res.status(400).json({
             success:false,
             message:"some fields are required"
        });
    }
    console.log(req.body.name);
    if(!courseId){
         return res.status(400).json({
             success:false,
             message:"courseId is required"
        });
    }
    const course=await Course.findById(courseId);
    if(!course){
         return res.status(400).json({
             success:false,
             message:"no course found with that courseid"
        });
    }
    if(name){
        course.name=name;
    }
    if(description){
        course.description=description;
    }
    if(whatYouWillLearn){
        course.whatYouWillLearn=whatYouWillLearn;
    }
    if(price){
        course.price=price;
    }
    if(category){
        const categoryId=await Category.find({name:category},'_id');
        const categoryDoc=await Category.findById(categoryId);
        if(!categoryDoc){
             return res.status(400).json({
                 success:false,
                 message:"no category found"
            });
        }
        course.category=categoryDoc._id;
    }
    if(thumbnail){
        const thumbUpload=await imageUpload(thumbnail,process.env.FOLDERNAME);
        course.thumbnail=thumbUpload.secure_url;
    }
    if(tags){
        course.tag=tags;
    }
    if(instructions){
        course.instructions=instructions;
    }
    if(status){
        course.status=status;
    }
    const updatedCourse=await course.save();
    console.log(updatedCourse);
    return res.json({
        success:true,
        message:"course updated successfully",
        updatedCourse
    });
 } catch (error) {
     console.log('error while editing course details controller', error);
     return res.status(500).json({
         success: false,
         message: 'something went wrong while editing course details'
     });
 }
}

exports.getInstructorCourses = async (req, res) => {
  try {
    const instructorId = req.user.id; // Get instructor ID from authenticated user
    const instructor = await User.findById(instructorId);
    if (!instructor) {
      return res.status(400).json({
        success: false,
        message: 'No instructor found with that ID',
      });
    }

    const courses = await Course.aggregate([
      {
        $match: {
          instructor: new ObjectId(instructorId), // Use dynamic instructorId
        },
      },
      {
        $unwind: {
          path: '$courseContent',
          preserveNullAndEmptyArrays: true, // Handle empty courseContent
        },
      },
      {
        $lookup: {
          from: 'sections',
          localField: 'courseContent',
          foreignField: '_id',
          as: 'result',
        },
      },
      {
        $unwind: {
          path: '$result',
          preserveNullAndEmptyArrays: true, // Handle no matching sections
        },
      },
      {
        $addFields: {
          subSections: '$result.subSections',
        },
      },
      {
        $unwind: {
          path: '$subSections',
          preserveNullAndEmptyArrays: true, // Handle empty subSections
        },
      },
      {
        $lookup: {
          from: 'subsections',
          localField: 'subSections',
          foreignField: '_id',
          as: 'result2',
        },
      },
      {
        $unwind: {
          path: '$result2',
          preserveNullAndEmptyArrays: true, // Handle no matching subsections
        },
      },
      {
        $group: {
          _id: '$_id',
          totalDuration: {
            $sum: '$result2.timeDuration', // Sum durations (0 if no subsections)
          },
          doc: {
            $first: '$$ROOT', // Preserve original document
          },
        },
      },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: [
              '$doc',
              {
                totalDuration: '$totalDuration',
              },
            ],
          },
        },
      },
      {
        $project: {
          result: 0,
          result2: 0,
          subSections: 0,
          courseContent: 0, // Explicitly exclude courseContent
          'doc.result': 0,
          'doc.result2': 0,
          'doc.subSections': 0,
        },
      },
    ]);

    return res.status(200).json({
      success: true,
      courses,
    });
  } catch (error) {
    console.error('Error while fetching instructor courses:', error.stack); // Improved error logging
    return res.status(500).json({
      success: false,
      message: 'Something went wrong while fetching instructor courses',
      error: error.message, // Include error message for debugging
    });
  }
};