const mongoose=require('mongoose');
const User=require('../models/User');
const Category=require('../models/Category');
const Course=require('../models/Course');
exports.stats = async (req, res) => {
  try {
    const response =await User.aggregate([
      {
        $facet: {
          totalUsers: [
            {
              $match: {
                accountType: "Student",
              },
            },
            {
              $count: "count",
            },
          ],
          enrolledStudents: [
            {
              $match: {
                accountType: "Student",
                courses: { $exists: true, $ne: [] },
              },
            },
            {
              $count: "count",
            },
          ],
          instructors: [
            {
              $match: {
                accountType: "Instructor",
                courses: { $exists: true, $ne: [] },
              },
            },
            {
              $count: "count",
            },
          ],

          totalIncome: [],
        },
      },
      {
        $project: {
          totalUsers: {
            $ifNull:[{$arrayElemAt: ["$totalUsers.count", 0]},0],
          },
          enrolledStudents: {
            $ifNull: [
              {
                $arrayElemAt: ["$enrolledStudents.count", 0],
              },
              0,
            ],
          },
          instructors: {
           $ifNull:[{ $arrayElemAt: ["$instructors.count", 0],},0]
          },
        },
      },
    ]);
    if (response)
      return res.status(200).json({
        success: true,
        message: "stats fetched successfully",
        stats: response,
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error:error.message,
    });
  }
};

exports.topInstructors = async (req, res) => {
  try {
    const response =await User.aggregate([
      {
        $facet: {
          byIncome: [
            {
              $match: {
                accountType: "Instructor",
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
              $set: {
                income: {
                  $map: {
                    input: "$courses",
                    as: "course",
                    in: {
                      $multiply: [
                        {
                          $size: "$$course.studentsEnrolled",
                        },
                        "$$course.price",
                      ],
                    },
                  },
                },
              },
            },
            {
              $set: {
                income: {
                  $sum: "$income",
                },
              },
            },
            {
              $sort: {
                income: -1,
              },
            },
            {
              $project: {
                _id: 1,
                income: 1,
                firstName: 1,
                lastName: 1,
                email: 1,
                image: 1,
              },
            },
            {
              $limit: 10,
            },
            {
              $match: {
                income: {
                  $gt: 0,
                },
              },
            },
          ],
          byStudents: [
            {
              $match: {
                accountType: "Instructor",
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
              $set: {
                totalStudents: {
                  $sum: {
                    $map: {
                      input: "$courses",
                      as: "course",
                      in: {
                        $size: "$$course.studentsEnrolled",
                      },
                    },
                  },
                },
              },
            },
            {
              $project: {
                firstName: 1,
                lastName: 1,
                email: 1,
                totalStudents: 1,
                image: 1,
              },
            },
            {
              $sort: {
                totalStudents: -1,
              },
            },
            {
              $match: {
                totalStudents: {
                  $gt: 0,
                },
              },
            },
            {
              $limit: 10,
            },
          ],
        },
      },
    ]);
    if (response) {
      return res.status(200).json({
        success: true,
        message: "data fetched successfully",
        topInstructors: response,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error:error.message,
    });
  }
};

exports.mostSellingCourses = async (req, res) => {
    try {
    const response = await Course.aggregate([
  {
    $sort: {
      studentsEnrolled: -1
    }
  },
  {
    $limit: 10
  },
  {
    $lookup: {
      from: "ratingandreviews",
      localField: "ratingAndReviews",
      foreignField: "_id",
      as: "ratingAndReviews"
    }
  },
  {
    $set: {
      allRatings: {
        $map: {
          input: "$ratingAndReviews",
          as: "ratingAndReviews",
          in: "$$ratingAndReviews.rating"
        }
      }
    }
  },
  {
    $set: {
      avgRating: {
        $avg: "$allRatings"
      }
    }
  },
  {
    $lookup: {
      from: "users",
      localField: "instructor",
      foreignField: "_id",
      as: "instructor"
    }
  },
  {
    $unwind: {
      path: "$instructor"
    }
  },
  {
    $project: {
      name: 1,
      avgRating: {
        $round: ["$avgRating", 2]
      },
      studentsEnrolled: {
        $size: "$studentsEnrolled"
      },
      "instructor.firstName": 1,
      "instructor.lastName": 1,
      price: 1
    }
  },
  {
    $match: {
      studentsEnrolled: {
        $gt: 0
      }
    }
  }
]);
    if (response) {
      return res.status(200).json({
        success: true,
        message: "data fetched successfully",
        mostSellingCourses: response,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error:error.message,
    });
  }
};

exports.categoryWiseStudents = async (req, res) => {
    try {
    const response = await Category.aggregate([
  {
    $lookup: {
      from: "courses",
      localField: "courses",
      foreignField: "_id",
      as: "courses"
    }
  },
  {
    $set: {
      totalStudents: {
        $reduce: {
          input: "$courses",
          initialValue: 0,
          in: {
            $sum: [
              "$$value",
              { $size: "$$this.studentsEnrolled" }
            ]
          }
        }
      }
    }
  },
  {
    $project: {
      name: 1,
      totalStudents: 1
    }
  },
  {
    $match: {
      totalStudents: {
        $gt: 0
      }
    }
  }
]);
    if (response) {
      return res.status(200).json({
        success: true,
        message: "data fetched successfully",
        categoryWiseCourses: response,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error:error.message
    });
  }
};

