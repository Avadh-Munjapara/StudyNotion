import mongoose from "mongoose"
import User from "../models/User"

export const userStats=async (req,res)=>{
    try {
        const response=User.aggregate([
  {
    $facet: {
      totalUsers: [
        {
          $match: {
            accountType: "Student"
          }
        },
        {
          $count: "count"
        }
      ],
      enrolledStudents: [
        {
          $match: {
            accountType: "Student",
            courses: { $exists: true, $ne: [] }
          }
        },
        {
          $count: "count"
        }
      ],
      instructors: [
        {
          $match: {
            accountType: "Instructor",
            courses: { $exists: true, $ne: [] }
          }
        },
        {
          $count: "count"
        }
      ],
      
        totalIncome:[]
      
    }
  },
  {
    $project: {
      totalUsers: {
        $arrayElemAt: ["$totalUsers.count", 0]
      },
      enrolledStudents: {
        $ifNull: [
          {
            $arrayElemAt: [
              "$enrolledStudents.count",
              0
            ]
          },
          0
        ]
      },
      instructors: {
        $arrayElemAt: ["$instructors.count", 0]
      }
    }
  }
]);
if(response) return res.status(200).json({
    success:true,
    message:"stats fetched successfully",
    stats:response
})
    } catch (error) {
        return res.status(500).json({
            success:false,
            error
        })
    }
};
