import React from "react";
import CourseCard from "./CourseCard";
const CoursesToStart = ({ courses }) => {
  return (
    <div>
      {courses?.length === 0 ? (
        <p>No courses in this category have been created</p>
      ) : (
        <div>
          <h2 className="text-richblack-5 font-semibold text-3xl">
            Courses to get you started
          </h2>
          {courses?.map((item, index) => (
            <CourseCard info={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CoursesToStart;
