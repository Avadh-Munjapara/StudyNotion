import React from "react";
import { useSelector } from "react-redux";
import { FaCheck } from "react-icons/fa";
const StepDots = () => {
  const step = useSelector((state) => state.course.step);
  const stages = [
    { id: 1, name: "Course Information" },
    { id: 2, name: "Course Builder" },
    { id: 3, name: "Publish" },
  ];
  return (
    <div className="flex w-full justify-around ml-6 mt-6`">
      {stages.map((item, index) => {
         if (step === item.id) {
            return (
            <div key={index} className="flex flex-col items-center gap-1">
              <div className="bg-[#251400] border-[1px] flex justify-center items-center border-[#FFD60A] text-[#FFD60A] rounded-full w-[34px] h-[34px]">
                {step}
              </div>
              <p className="text-richblack-5 font-medium text-sm">{item.name}</p>
            </div>
          );
        } else if (item.id < step) {
            return
            <>
            <div className="flex flex-col items-center gap-1" key={index}>
              <FaCheck className="bg-[#FFD60A] w-[34px] h-[34px]"/>
              <p className="text-richblack-5 font-medium text-sm">{item.name}</p>
            </div>

            </> 
        }else{
            return <div className="flex flex-col items-center gap-1" key={index}>
            <div className="bg-[#161D29] flex justify-center items-center  border-[1px] border-[#2C333F] text-[#2C333F] rounded-full w-[34px] h-[34px]">
              {item.id}
            </div>
            <p className="text-richblack-5 font-medium text-sm">{item.name}</p>
          </div>
        }
      })}
    </div>
  );
};

export default StepDots;
