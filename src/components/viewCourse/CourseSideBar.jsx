import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getFullCourseDetails } from "../../services/operations/courseApi";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../comman/Spinner";
import SectionBarViewCourse from "./SectionBarViewCourse";
import {
  setCompletedLectures,
  setEntireCourseData,
  setSectionData,
  setTotalLectures,
} from "../../slices/viewCourse";
const CourseSidebar = () => {
  const { courseId, sectionId, subSectionId } = useParams();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.course.loading);
  const sectionData = useSelector((state) => state.viewCourse.sectionData);
  const entireCourseData = useSelector(
    (state) => state.viewCourse.entireCourseData
  );
  const completedLectures = useSelector(
    (state) => state.viewCourse.completedLectures
  );
  const totalLectures = useSelector((state) => state.viewCourse.totalLectures);
  useEffect(() => {
    const fetchCourseDetails = async () => {
      const response = await getFullCourseDetails({ courseId }, dispatch);
      if (response) {
        console.log(response);
        dispatch(setEntireCourseData(response));
        dispatch(setSectionData(response?.courseContent));
        const totalLectures = response?.courseContent?.reduce(
          (acc, section) => acc + section?.subSections?.length,
          0
        );
        dispatch(setTotalLectures(totalLectures));
        dispatch(setCompletedLectures(response?.completedLectures));
      } else {
        console.error("Failed to fetch course details");
      }
    };
    fetchCourseDetails();
  }, []);
  const detailsList = document.querySelectorAll("details");
  detailsList.forEach((details) => {
    details.addEventListener("toggle", () => {
      if (details.open) {
        detailsList.forEach((otherDetails) => {
          if (otherDetails !== details) {
            otherDetails.removeAttribute("open");
          }
        });
      }
    });
  });

  return loading ? (
    <Spinner />
  ) : sectionData.length > 0 ? (
    <div className="bg-richblack-800  min-w-[300px] min-h-fit">
      <div className="border-b-[1px] pt-7 pb-3 border-richblack-600 mx-6">
        <h1 className="text-sm font-semibold text-richblack-25">
          {entireCourseData?.name}
        </h1>
        <p className="text-richblack-500 text-smm font-semibold">
          <span>
            {completedLectures?.length}/{totalLectures}
          </span>
        </p>
      </div>
      <div>
        {sectionData?.map((section, index) => (
          <SectionBarViewCourse section={section} />
        ))}
      </div>
      {}
    </div>
  ) : (
    <p>No Data Found</p>
  );
};

export default CourseSidebar;
