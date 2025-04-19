import React, { useEffect, useState } from "react";
import LocationBar from "../../../components/dashboard/LocationBar";
import YellowBtn from "../../../components/comman/YellowBtn";
import { IoIosAddCircle } from "react-icons/io";
import CoursesTable from "../../../components/dashboard/Instructor/myCourses/CoursesTable";
import { getInstructorCourses } from "../../../services/operations/profileApi";
import Spinner from "../../../components/comman/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setStep,setCourseInfo } from "../../../slices/courseSlice";
const MyCourses = () => {
  const [courses, setCourses] = useState(null);
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const loading = useSelector((state) => state.profile.loading);
  useEffect(() => {
    const getCourses = async () => {
      const fetchCourses = await getInstructorCourses(dispatch);
      if (fetchCourses) {
        setCourses(fetchCourses);
      }
    };
    getCourses();
  }, []);
  const updateCourses=(newCourses)=>{
    setCourses(newCourses);
  }
  return loading ? (
    <Spinner />
  ) : courses && courses.length > 0 ? (
    <div>
      <div className="flex w-full items-center justify-between">
      <div className="p-6">
          <LocationBar/>
          </div>
        <YellowBtn
          clickHandler={()=> {dispatch(setStep(1));dispatch(setCourseInfo(null));navigate('/dashboard/add-course')}}
          text={
            <>
              <IoIosAddCircle />
              New
            </>
          }
        />
      </div>
      <CoursesTable updateCourses={updateCourses} courses={courses} />
    </div>
  ) : (
    <div className="flex items-center justify-center h-full">
    <p className="text-3xl  text-richblack-5">You have no courses Added</p>
    </div>
  );
};

export default MyCourses;
