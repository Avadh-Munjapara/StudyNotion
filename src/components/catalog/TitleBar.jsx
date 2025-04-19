import React from 'react';
import LocationBar from '../dashboard/LocationBar';

const TitleBar = ({para}) => {
    return (
        <div className='flex flex-col gap-3 py-8 px-[120px] bg-richblack-800'>
            <LocationBar/>
            <p className='text-richblack-200 text-sm'>{para}</p>
        </div>
    );
}

export default TitleBar;    
