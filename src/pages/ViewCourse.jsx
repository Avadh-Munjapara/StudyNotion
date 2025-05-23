import React from "react";
import NavBar from "../components/comman/NavBar";
import CourseSideBar from "../components/viewCourse/CourseSideBar";
import { Outlet } from "react-router-dom";
import VideoDetails from "../components/viewCourse/VideoDetails";
import Footer from "../components/comman/Footer";
const ViewCourse = () => {
  return (
    <div className="h-full">
      <NavBar />
      <div className="flex h-full">
        <CourseSideBar />
        <Outlet>
          <VideoDetails />
        </Outlet>
      </div>
      <div className="mt-5">
        <Footer />
      </div>
    </div>
  );
};

export default ViewCourse;
