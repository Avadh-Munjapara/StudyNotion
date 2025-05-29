import React, { useEffect, useState } from "react";
import { getInstructorDashboardInfo } from "../../../../services/operations/profileApi";
import Spinner from "../../../comman/Spinner";
import Visuals from "./Visulas";
import Statistics from "./Statistics";
import Courses from "./Courses";
const InsDash = () => {
  const [courses, setCourses] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currChart,setCurrChart] = useState("students");
  useEffect(() => {
    const fetchInstructorCourses = async () => {
      const fetchedCourses = await getInstructorDashboardInfo(setLoading);
      console.log(fetchedCourses);

      if (fetchedCourses) {
        setCourses(fetchedCourses);
      }
    };
    fetchInstructorCourses();
  }, []);

  return loading ? (
    <Spinner />
  ) : courses && courses.length > 0 ? (
    <div>
      <div>
        <div>
          <h3>Visualize</h3>
          <div>
            <button className={`${currChart==='students'?'bg-richblack-400/60 text-yellow-200':'text-yellow-200/60'} font-medium px-2 py-1`} onClick={()=>setCurrChart("students")}>Students</button>
            <button className={`${currChart==='income'?'bg-richblack-400/60 text-yellow-200':'text-yellow-200/60'} font-medium px-2 py-1`}  onClick={()=>setCurrChart("income")}>Income</button>
          </div>
          <Visuals type={currChart} courses={courses}/>
        </div>
        <Statistics />
      </div>
      <Courses />
    </div>
  ) : (
    <p>No courses found</p>
  );
};

export default InsDash;
