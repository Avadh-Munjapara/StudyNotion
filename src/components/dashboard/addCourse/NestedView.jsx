import React from "react";
import { useSelector } from "react-redux";
import { HiMiniRectangleStack } from "react-icons/hi2";
import { MdOutlineModeEdit } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";
const NestedView = ({editSectionNameHandler}) => {
  const { courseContent } = useSelector((state) => state.course.courseInfo);

  return (
    <div className="bg-richblack-700 flex flex-col gap-3 px-6 rounded-lg border border-richblack-600">
      {courseContent.length > 0 &&
        courseContent.map((section, index) => (
          <details key={section._id} className="border-b border-richblack-600 py-3" >
            <summary className="flex  justify-between">
              <div className="flex items-center gap-3">
                <HiMiniRectangleStack className="text-richblack-400" />
                <h3 className="text-richblack-50 font-semibold">
                  {section.name}
                </h3>
              </div>
              <div className="flex gap-1 text-richblack-400 text-xl">
                <button onClick={()=>editSectionNameHandler(index)}>
                <MdOutlineModeEdit />
                </button>
                <RiDeleteBin5Line />
                <p>|</p>
              </div>
            </summary>
          </details>
        ))}
    </div>
  );
};

export default NestedView;
