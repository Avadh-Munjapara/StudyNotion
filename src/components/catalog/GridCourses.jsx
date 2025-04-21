import React from "react";
import CourseCard from "./CourseCard";

const GridCourses = ({ courses }) => {
  return courses?.length <= 0 ? (
    <p>No courses</p>
  ) : (
    <div className="flex flex-col gap-5">
      <h2 className="text-richblack-5 text-3xl font-semibold">Different Category courses</h2>
      <div className="grid grid-cols-2 gap-x-10 ">
        {courses?.map((item, index) => (
          <CourseCard info={item} />
        ))}
      </div>
    </div>
  );
};

export default GridCourses;
