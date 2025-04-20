import React, { useEffect } from 'react';
import Stars from '../comman/Stars';

const CourseCard = ({info}) => {
    return (
        <div className='flex flex-col gap-2'>
            <img className='w-fit rounded-lg' src={info.thumbnail} alt="" />
            <p className='text-richblack-5 font-medium'>{info.description}</p>
            <p className='text-richblack-300'>{info.name}</p>
            <Stars rating={5}/>
            <span className='text-richblack-5 font-semibold'>{info.price}</span>
        </div>
    );
}

export default CourseCard;
