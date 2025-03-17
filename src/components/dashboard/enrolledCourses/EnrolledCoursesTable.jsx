import React, { useEffect } from "react";
import { useState } from "react";
import {
  getEnrolledCourses,
  getUserDetails,
} from "../../../services/operations/profileApi";
import Spinner from "../../comman/Spinner";
import ProgressBar from "@ramonak/react-progress-bar";

const EnrolledCoursesTable = () => {
  const [enrolledCourses, setEnrolledCourses] = useState(null);

  const fetchEntolledCourses = async () => {
    try {
      const response = await getEnrolledCourses();
      setEnrolledCourses(response);
    } catch (error) {
      console.log("error while fetching enrolled courses");
    }
  };
  useEffect(() => {
    fetchEntolledCourses();
  }, []);
  return (
    <div className="w-full">
      {enrolledCourses ? (
        enrolledCourses.length>0 ? <table className="rounded-lg border-collapse ">
        <tr className="bg-[#2C333F] font-medium text-[#C5C7D4]">
          <th>Course Name</th>
          <th>Duration</th>
          <th>Progress</th>
          <th></th>
        </tr>
        {
          enrolledCourses.map((item,index)=>{
              return <tr key={index}>
                  <td>
                      <div className="flex gap-5">
                          <img className="h-[52px] 2-[52px]" src={item.thumbnail} alt="" />
                          <div className="flex flex-col gap-[2px]">
                              <h3 className="text-richblack-5 font-medium">{item.name}</h3>
                              <p>{item.description}</p>
                          </div>
                      </div>
                      </td>
                  <td className="text-[#C5C7D4] font-medium">{item?.totalDuration}</td>
                  <td className="flex felx-col gap-[2px]">
                    <p>Progress{item?.coursePercentage}</p>
                    <ProgressBar completed={item?.coursePercentage}/></td>
                  <td><button className="flex flex-col gap-2 mx-auto justify-center">
                      <div className="w-1 h-1 bg-[#374957]"></div>
                      <div className="w-1 h-1 bg-[#374957]"></div>
                      <div className="w-1 h-1 bg-[#374957]"></div>
                      </button></td>
              </tr>
          })
        }
      </table>
      : <div className="h-full w-full flex justify-center items-center">
        <p className="text-richblack-5">You Have not Enrolled in any courses</p>
      </div>

      ) : (
        <div>
        <Spinner />
      </div>
      )}
    </div>
  );
};

export default EnrolledCoursesTable;
