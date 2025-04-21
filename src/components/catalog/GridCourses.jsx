import React from "react";
import CourseCard from "./CourseCard";

const GridCourses = ({ courses }) => {
  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-richblack-5 text-3xl font-semibold">
        Different Category courses
      </h2>
      {!courses || courses?.length<=0 ? (
        <p className="text-red-500 relative -top-5 font-semibold text-3xl">
          No courses found here
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-y-3 gap-x-10 ">
          {courses?.map((item, index) => (
            <CourseCard info={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default GridCourses;
