import React from "react";
import { useSelector } from "react-redux";
import StepDots from "./StepDots";
import CourseInformation from "./CourseInformation";
import Tips from "./Tips";
const AddCourse = () => {
  return (
    <div className="flex gap-5">

      <div className="w-[65%]">
      <StepDots />
      <CourseInformation/>
      </div>
      <Tips/>

    </div>
  );
};

export default AddCourse;
