import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getFullCourseDetails } from '../../services/operations/courseApi';
import { useDispatch } from 'react-redux';
import { setCompletedLectures, setEntireCourseData, setSectionData, setTotalLectures } from '../../slices/viewCourse';
const CourseSidebar = () => {
    const {courseId, sectionId, subSectionId} = useParams();
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchCourseDetails = async () => {
          const response = await getFullCourseDetails({ courseId }, dispatch);
          if (response) {
            console.log(response);
            dispatch(setEntireCourseData(response));
            dispatch(setSectionData(response?.courseContent));
            const totalLectures= response?.courseContent?.reduce((acc,section)=>acc+section?.subSections?.length,0);
            dispatch(setTotalLectures(totalLectures));
            dispatch(setCompletedLectures(response?.completedLectures));

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
