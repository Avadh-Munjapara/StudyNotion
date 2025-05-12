import React from 'react';
import YellowBtn from '../components/comman/YellowBtn';

const CourseInfoPage = () => {

    const handleBuyCourse = () => {
        
    }
    return (
        <div className='flex flex-col items-center justify-center h-screen'>
            <YellowBtn clickHandler={handleBuyCourse} text={'Buy'}/>
        </div>
    );
}

export default CourseInfoPage;
