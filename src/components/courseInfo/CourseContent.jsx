import React from "react";
import { LuDot } from "react-icons/lu";
import formatDuration from "../../utils/formatDuration";
import { MdScubaDiving } from "react-icons/md";
import SectionBar from "./SectionBar";
const CourseContent = ({ content }) => {
  const subSectionsLength = () =>
    content?.reduce((acc, section) => acc + section?.subSections.length, 0);
  const totalLecturesLength = () => {
    const lengthInSeconds = content?.reduce(
      (acc, section) =>
        acc +
        section?.subSections.reduce(
          (acc, subSection) => acc + subSection?.timeDuration,
          0
        ),
      0
    );
    const length = formatDuration(lengthInSeconds);
    return length;
  };
  const sectionLegth = (section) => {
    const seconds = section?.subSections?.reduce(
      (acc, subSection) => acc + subSection?.timeDuration,
      0
    );
    const length = formatDuration(seconds);
  };
  const length = totalLecturesLength();
  return (
    <div>
      <div className="flex flex-col gap-4">
        <h3 className="text-richblack-5 text-2xl font-semibold">
          Course Content
        </h3>
        <p className="text-sm text-richblack-50 flex items-center">
          {content?.length} sections
          <LuDot className="text-2xl" />
          {subSectionsLength()} lectures <LuDot className="text-2xl" />
          {length?.hours == 0
            ? `${length?.minutes}m : ${length?.seconds}s`
            : `${length?.hours}h : ${length?.minutes}m`}{" "}
          total length
        </p>

        <div>
          {content?.map((section) => (
            <SectionBar section={section} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseContent;
