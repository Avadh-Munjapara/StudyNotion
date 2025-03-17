import React from 'react';
import LocationBar from '../../components/dashboard/LocationBar';
import EnrolledCoursesTable from '../../components/dashboard/enrolledCourses/EnrolledCoursesTable';
const EnrolledCourses = () => {
    return (
        <div className='w-full h-full'>
            <LocationBar/>
            <EnrolledCoursesTable/>
        </div>
    );
}

export default EnrolledCourses;
