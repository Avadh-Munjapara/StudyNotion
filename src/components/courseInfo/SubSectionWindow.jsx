import React, { useState } from "react";
import formatDuration from "../../utils/formatDuration";
import { MdKeyboardArrowDown } from "react-icons/md";
import { HiOutlineVideoCamera } from "react-icons/hi";

const SubSectionWindow = ({ subSections }) => {
  const [expandedSections, setExpandedSections] = useState({});

  return (
    <div className="flex flex-col  py-4 px-8">
      {subSections?.map((subSection) => {
        const length = formatDuration(subSection?.timeDuration);
        const isExpanded = expandedSections[subSection._id];

        return (
          <div 
            key={subSection._id}
            className="border-b border-richblack-600 last:border-none"
          >
            <div
              onClick={() => setExpandedSections(prev => ({
                ...prev,
                [subSection._id]: !prev[subSection._id]
              }))}
              className="flex items-center justify-between cursor-pointer py-2
               rounded-lg px-4"
            >
              <div className="flex items-center gap-2">
                <HiOutlineVideoCamera className="text-richblack-50" />
                <p className="text-sm text-richblack-50">
                  {subSection?.title}
                </p>
                <MdKeyboardArrowDown 
                  className="text-richblack-50 text-xl"
                  style={{ transform: `rotate(${isExpanded ? 180 : 0}deg)` }}
                />
              </div>
              <span className="text-richblack-25 text-sm">
                {length?.hours > 0 ? `${length?.hours}h` : 
                 length?.minutes > 0 ? `${length?.minutes}m` : 
                 `${length?.seconds}s`}
              </span>
            </div>
            
            {isExpanded && (
              <div className="pl-[2.5rem] pb-3">
                <p className="text-sm text-richblack-50">
                  {subSection?.description}
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default SubSectionWindow;