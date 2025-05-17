import React, { useState } from "react";
import formatDuration from "../../utils/formatDuration";
import { MdKeyboardArrowDown } from "react-icons/md";
import { MdKeyboardArrowUp } from "react-icons/md";
import { PiMonitorPlayFill } from "react-icons/pi";
const SubSectionWindow = ({ subSections }) => {
  const [arrowUp, setArrowUp] = useState(false);

  const toggleArrow = () => {
    if (arrowUp) setArrowUp(false);
    else setArrowUp(true);
  };

  return (
    <div className="border-[1px] py-4 px-8 border-richblack-600">
      {subSections?.map((subSection) => {
        const length = formatDuration(subSection?.timeDuration);
        return (
          <details>
            <summary onClick={toggleArrow} className="flex cursor-pointer items-center justify-between">
              <div className="flex items-center gap-1">
                <PiMonitorPlayFill className="text-richblack-50 h-4" />
                <h5 className="text-richblack-5 font-medium text-sm">
                  {subSection?.title}
                </h5>
                {arrowUp ? (
                  <MdKeyboardArrowUp className="text-richblack-50 text-xl" />
                ) : (
                  <MdKeyboardArrowDown className="text-richblack-50 text-xl" />
                )}
              </div>

              <p className="text-richblack-25 text-sm">
                {length?.hours == 0
                  ? `${length?.minutes}m : ${length?.seconds}s`
                  : `${length?.hours}h : ${length?.minutes}m`}
              </p>
            </summary>
            <p className="text-richblack-50 px-[22px] text-sm">
              {subSection?.description}
            </p>
          </details>
        );
      })}
    </div>
  );
};

export default SubSectionWindow;
