import React from 'react';
import LocationBar from '../../components/dashboard/LocationBar';
import EnrolledCoursesTable from '../../components/dashboard/enrolledCourses/EnrolledCoursesTable';
const EnrolledCourses = () => {
    return (
        <div className='w-full flex flex-col gap-5 pl-6 pt-6 h-full'>
            <LocationBar/>
            <EnrolledCoursesTable/>
        </div>
    );
}

export default EnrolledCourses;
