import React, { useEffect, useState } from "react";
import { getInstructorDashboardInfo } from "../../../../services/operations/profileApi";
const InsDash = () => {
  const [courses, setCourses] = useState(null);
  const [loading, setLoading] = useState(false);
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

  return <div></div>;
};

export default InsDash;
