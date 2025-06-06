import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from '../../components/dashboard/Sidebar';
import NavBar from '../../components/comman/NavBar';

const DashBoard = () => {
    const location=useLocation();
    return (
        <div className='w-full relative '>
            <NavBar/>
            <div className='flex flex-col sm:flex-row mx-auto'>
                <div className='md:w-[16%]  sm:min-h-[calc(100vh-3.5rem)]'>
                <Sidebar/>
                </div>
            <div className='sm:w-[80%] h-full'>   
            <Outlet/>
            </div>

            </div>
        </div>
    );
}

export default DashBoard;
