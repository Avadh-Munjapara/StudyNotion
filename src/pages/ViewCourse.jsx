import React from 'react';
import NavBar from '../components/comman/NavBar';
import CourseSideBar from '../components/viewCourse/CourseSideBar';
import { Outlet } from 'react-router-dom';
import VideoDetails from '../components/viewCourse/VideoDetails';

const ViewCourse = () => {
    return (
        <div>
            <NavBar/>
            <div>
                <CourseSideBar/>
                <Outlet>
                    <VideoDetails/>
                </Outlet>
            </div>
        </div>
    );
}

export default ViewCourse;
