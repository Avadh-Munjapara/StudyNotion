import React from 'react';
import { BiSolidError } from "react-icons/bi";
const NotFound = () => {
    return (
        <div className='flex flex-col justify-center h-screen items-center'>
            <BiSolidError className='text-red-800 text-4xl'/>
            <p className='text-4xl text-richblack-5'>Error - 404 Page Not Found</p>
        </div>
    );
}

export default NotFound;
