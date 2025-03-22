import React from "react";
import { useSelector } from "react-redux";
import StepDots from "./StepDots";
import CourseInformation from "./CourseInformation";
const AddCourse = () => {
  return (
    <div>
      <StepDots />
      <CourseInformation/>
    </div>
  );
};

export default AddCourse;
