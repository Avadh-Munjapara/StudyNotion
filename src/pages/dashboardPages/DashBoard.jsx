import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/dashboard/Sidebar';
import NavBar from '../../components/comman/NavBar';
const DashBoard = () => {
    return (
        <div className=''>
            <NavBar/>
            <Sidebar/>
            <Outlet/>
        </div>
    );
}

export default DashBoard;
