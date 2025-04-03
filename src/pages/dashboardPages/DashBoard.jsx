import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from '../../components/dashboard/Sidebar';
import NavBar from '../../components/comman/NavBar';

const DashBoard = () => {
    const location=useLocation();
    return (
        <div className='w-full h-full'>
            <NavBar/>
            <div className='flex h-full'>
                <div className='w-[16%]'>
                <Sidebar/>
                </div>
            <div className='w-[80%] h-full'>   
            <Outlet/>
            </div>

            </div>
        </div>
    );
}

export default DashBoard;
