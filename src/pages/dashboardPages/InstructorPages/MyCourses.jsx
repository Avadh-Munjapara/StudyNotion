import React, { useEffect, useState } from "react";
import LocationBar from "../../../components/dashboard/LocationBar";
import YellowBtn from "../../../components/comman/YellowBtn";
import { IoIosAddCircle } from "react-icons/io";
import CoursesTable from "../../../components/dashboard/Instructor/myCourses/CoursesTable";
import { getInstructorCourses } from "../../../services/operations/profileApi";
import Spinner from "../../../components/comman/Spinner";
import { useDispatch, useSelector } from "react-redux";
const MyCourses = () => {
  const [courses, setCourses] = useState(null);
  const dispatch=useDispatch();
  const loading = useSelector((state) => state.profile.loading);
  useEffect(() => {
    const getCourses = async () => {
      const fetchCourses = await getInstructorCourses(dispatch);
      console.log(fetchCourses);
      if (fetchCourses) {
        setCourses(fetchCourses);
      }
    };
    getCourses();
  }, []);
  const clickHandler = () => {};

  return loading ? (
    <Spinner />
  ) : courses && courses.length > 0 ? (
    <div>
      <div className="flex w-full items-center justify-between">
        <LocationBar />
        <YellowBtn
          clickHandler={clickHandler}
          text={
            <>
              <IoIosAddCircle />
              New
            </>
          }
        />
      </div>
      <CoursesTable courses={courses} />
    </div>
  ) : (
    <p>no courses found</p>
  );
};

export default MyCourses;
