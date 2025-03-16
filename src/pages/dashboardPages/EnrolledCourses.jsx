import React from 'react';
import LocationBar from '../../components/dashboard/LocationBar';
import EnrolledCoursesTable from '../../components/dashboard/enrolledCourses/EnrolledCoursesTable';
const EnrolledCourses = () => {
    return (
        <div>
            <LocationBar/>
            <EnrolledCoursesTable/>
        </div>
    );
}

export default EnrolledCourses;
