import React, { useEffect, useState } from 'react';
import { BsExclamationCircle } from "react-icons/bs";
import { IoIosGlobe } from "react-icons/io";

import Stars from "../comman/Stars";
import avgRating from '../../utils/avgRating';
const CourseIntro = ({course}) => {
  const [averageRating,setAverageRating]=useState(0);
  useEffect(()=>{
    console.log(course);
    const avgRat=avgRating(course?.ratingAndReviews);
    setAverageRating(avgRat);
  },[course]);
    return (
        <div className='border-r-[1px] flex flex-col gap-3 border-richblack-700'>
            <h1 className="text-richblack-5 font-medium text-3xl">
                  {course?.name}
                </h1>
                <p className="text-richblack-200 text-sm">
                  {course?.description}
                </p>
                <div className="flex gap-2 items-center">
                  <Stars rating={averageRating} />
                  <p className="text-richblack-25">
                    ({course?.ratingAndReviews?.length} Reviews){" "}
                    {course?.studentsEnrolled?.length} Students
                  </p>
                </div>
                <p className="text-richblack-25">
                  {" "}
                  Created by {course?.instructor?.firstName}{" "}
                  {course?.instructor?.lastName}
                </p>
                <div className='flex gap-2 items-center'>
                <p className="text-richblack-25 flex gap-2 items-center">
                  <BsExclamationCircle />
                  {course?.createdAt?.split("-").at(1)}/
                  {course?.createdAt?.split("-").at(0)}
                </p>
                <p className='flex gap-1 text-richblack-25 items-center'><IoIosGlobe /> English</p>
                </div>
        </div>  
    );
}

export default CourseIntro;
