import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getFullCourseDetails } from '../../services/operations/courseApi';
import { useDispatch } from 'react-redux';
const CourseSidebar = () => {
    const {courseId, sectionId, subSectionId} = useParams();
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchCourseDetails = async () => {
          const response = await getFullCourseDetails({ courseId }, dispatch);
          if (response) {
            console.log(response);
          } else {
            console.error("Failed to fetch course details");
          }
        };
        fetchCourseDetails();
      }, []);
    return (
        <div>
            
        </div>
    );
}

export default CourseSidebar;
