import React from 'react';
import LocationBar from '../../../components/dashboard/LocationBar';
import YellowBtn from '../../../components/comman/YellowBtn';
import { IoIosAddCircle } from "react-icons/io";
import CoursesTable from '../../../components/dashboard/Instructor/myCourses/CoursesTable';
const MyCourses = () => {
    const clickHandler=()=>{

    }
    return (
        <div>
            <div className='flex w-full items-center justify-between'>
                <LocationBar/>
                <YellowBtn clickHandler={clickHandler} text={<><IoIosAddCircle />New</>}/>
            </div>
            <CoursesTable/>
        </div>
    );
}

export default MyCourses;
