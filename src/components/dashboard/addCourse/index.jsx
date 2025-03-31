import React from "react";
import { useSelector } from "react-redux";
import StepDots from "./StepDots";
import CourseInformation from "./CourseInformation";
import Tips from "./Tips";
import CourseBuilder from "./CourseBuilder";
import Publish from "./Publish";
const AddCourse = () => {
  const step = useSelector((state) => state.course.step);
  return (
    <div className="flex gap-5">

      <div className="w-[70%]">
      <StepDots />
      {step === 1 && <CourseInformation />}
      {step === 2 && <CourseBuilder />}
      {step === 3 && <Publish />}
      </div>  
      <Tips/>

    </div>
  );
};

export default AddCourse;
