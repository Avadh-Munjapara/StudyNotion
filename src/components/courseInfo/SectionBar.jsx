import React from "react";
import formatDuration from "../../utils/formatDuration";
import SubSectionWindow from "./SubSectionWindow";
import { MdKeyboardArrowDown } from "react-icons/md";
import { MdKeyboardArrowUp } from "react-icons/md";
import { useState } from "react";
const SectionBar = ({ section }) => {
  const [arrowUp, setArrowUp] = useState(false);

  const toggleArrow = () => {
    if (arrowUp) setArrowUp(false);
    else setArrowUp(true);
  };
  const lecturesLength = () => {
    const seconds = section?.subSections?.reduce(
      (acc, subSection) => acc + subSection?.timeDuration,
      0
    );
    const length = formatDuration(seconds);
    return length;
  };

  const length = lecturesLength();
  return (
    <div>
      <details className=" select-none ">
        <summary
          onClick={toggleArrow}
          className="flex items-center cursor-pointer justify-between border-[1px] border-richblack-600 bg-richblack-700 px-8 py-4"
        >
          <div className="flex items-center gap-1">
            {arrowUp ? (
              <MdKeyboardArrowUp className="text-richblack-50 text-xl" />
            ) : (
              <MdKeyboardArrowDown className="text-richblack-50 text-xl" />
            )}
            <h4 className="text-sm text-richblack-5 font-medium">
              {section?.name}
            </h4>
          </div>
          <p className="flex items-center gap-2">
            <span className="text-yellow-50 block text-sm">
              {section?.subSections?.length} lectures
            </span>
            <span className="text-richblack-25 block text-sm">
              {length?.hours == 0
                ? length.minutes == 0
                  ? `${length?.seconds}s`
                  : `${length?.minutes}m`
                : `${length?.hours}h`}
            </span>
          </p>
        </summary>
          <SubSectionWindow subSections={section?.subSections} />
      </details>
    </div>
  );
};

export default SectionBar;
