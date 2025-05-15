import React from 'react';
import { BsExclamationCircle } from "react-icons/bs";
import Stars from "../comman/Stars";
const CourseIntro = ({course}) => {
    return (
        <div className='border-r-[1px] border-richblack-700'>
            <h1 className="text-richblack-5 font-medium text-3xl">
                  {course?.name}
                </h1>
                <p className="text-richblack-200 text-sm">
                  {course?.description}
                </p>
                <div className="flex gap-2 items-center">
                  <Stars rating={course?.rating} />
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
                <p className="text-richblack-25 flex gap-2 items-center">
                  <BsExclamationCircle />
                  {course?.createdAt?.split("-").at(1)}/
                  {course?.createdAt?.split("-").at(0)}
                </p>
        </div>
    );
}

export default CourseIntro;
