import React, { useEffect, useState } from "react";
import { getAdminDashboardDetails } from "../../../services/operations/adminapi";
import { useSelector } from "react-redux";
import Spinner from "../../../components/comman/Spinner";
import CategoryPieChart from "../../../components/dashboard/adminDashbboard/CategoryPieChart";
import InstructorPolarChart from "../../../components/dashboard/adminDashbboard/InstructorPolarChart";
import TopSellingCoursesChart from "../../../components/dashboard/adminDashbboard/TopSellingCoursesChart";
const AdminDash = () => {
  const [loading, setLoading] = useState(false);
  const token = useSelector((state) => state.auth.token);
  const [mstSoldCrs, setMstSoldCrs] = useState([]);
  const [catWiseCrs, setCatWiseCrs] = useState([]);
  const [topIns, setTopIns] = useState([]);
  const [stats, setStats] = useState([]);
  useEffect(() => {
    const fetchData = async (token) => {
      const response = await getAdminDashboardDetails(token, setLoading);
      if (response) {
        setCatWiseCrs(response?.categoryWiseCourses);
        setMstSoldCrs(response?.mostSellingCourses);
        setStats(response?.stats);
        setTopIns(response?.topInstructors);
        console.log(response);
      }
    };
    fetchData(token);
  }, []);
  return loading ? (
    <Spinner />
  ) : (
    <div className="">
      <h1>Admin DashBoard</h1>
      <div className="grid grid-cols-2 grid-rows-2">
        <CategoryPieChart categoryData={catWiseCrs} />
     
        <InstructorPolarChart insData={topIns[0]} />
        <TopSellingCoursesChart courseData={mstSoldCrs} />
      </div>
    </div>
  );
};

export default AdminDash;
