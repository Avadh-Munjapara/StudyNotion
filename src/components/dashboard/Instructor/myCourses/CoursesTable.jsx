import React from "react";
import { MdModeEditOutline } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
const CoursesTable = ({ courses }) => {
  return (
    <table className="rounded-lg border-collapse ">
      <tr className="bg-[#2C333F] font-medium text-[#C5C7D4]">
        <th>Courses</th>
        <th>Duration</th>
        <th>Price</th>
        <th>Actions</th>
      </tr>
      {courses?.map((item, index) => {
        return (
          <tr key={index}>    
            <td>
              <div className="flex gap-5">
                <img
                  className="h-[52px] 2-[52px]"
                  src={item.thumbnail}
                  alt=""
                />
                <div className="flex flex-col gap-[2px]">
                  <h3 className="text-richblack-5 font-medium">{item.name}</h3>
                  <p>{item.description}</p>
                </div>
              </div>
            </td>
            <td className="text-[#C5C7D4] font-medium">
              {item?.totalDuration}
            </td>
            <td className="flex felx-col gap-[2px]">
              <p>Progress{item?.price}</p>
            </td>
            <td>
              <div className="flex  gap-2 mx-auto text-[#374957] justify-center">
                    <button className="w-[18px] h-[18px]"><MdModeEditOutline /></button>
                    <button className="w-[18px] h-[18px]"><RiDeleteBin6Line /></button>
              </div>
            </td>
          </tr>
        );
      })}
    </table>
  );
};

export default CoursesTable;
