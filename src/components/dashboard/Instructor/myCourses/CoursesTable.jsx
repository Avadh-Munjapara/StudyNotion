import React from "react";
import { MdModeEditOutline } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
const CoursesTable = ({ courses }) => {
  const navigate=useNavigate();
  return (
    <Table className="rounded-lg w-full border px-2 py-2 border-richblack-800 text-white border-collapse ">
      <Thead className="font-medium text-richblack-100">
        <Tr>
          <Th className="text-start">Courses</Th>
          <Th className="text-start">Duration</Th>
          <Th className="text-start">Price</Th>
          <Th className="">Actions</Th>
        </Tr>
      </Thead>
      <Tbody>
        {courses?.map((item, index) => {
          return (
            <Tr key={index}>
              <Td>
                <div className="flex gap-5">
                  <img
                    className="h-[52px] w-[52px]"
                    src={item.thumbnail}
                    alt=""
                  />
                  <div className="flex flex-col gap-[2px]">
                    <h3 className="text-richblack-5 font-medium">
                      {item.name}
                    </h3>
                    <p className="text-richblack-100 text-sm">{item.description}</p>
                  </div>
                </div>
              </Td>
              <Td className="text-[#C5C7D4] font-medium">
                {item?.totalDuration}
              </Td>
              <Td className="flex flex-col gap-[2px]">
                <p>{item?.price}</p>
              </Td>
              <Td>
                <div className="flex  gap-2 mx-auto text-[#374957] justify-center">
                  <button className="w-[18px] h-[18px]" onClick={()=>{
                      navigate(`/dashboard/edit-course/${item._id}`);
                  }}>
                    <MdModeEditOutline />
                  </button>
                  <button className="w-[18px] h-[18px]">
                    <RiDeleteBin6Line />
                  </button>
                </div>
              </Td>
            </Tr>
          );
        })}
      </Tbody>
    </Table>
  );
};

export default CoursesTable;
