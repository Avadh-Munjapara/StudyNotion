import React, { useEffect } from 'react';
import StepDots from "./StepDots";
import CourseInformation from "./CourseInformation";
import Tips from "./Tips";
import CourseBuilder from "./CourseBuilder";
import { useSelector } from "react-redux";
import Publish from "./Publish";import Spinner from '../../comman/Spinner';
const RenderSteps = () => {
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
}

export default RenderSteps;
