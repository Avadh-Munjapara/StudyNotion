import React from 'react';

const Label = ({text,required,forwhat}) => {
    return (
        <label className='text-sm text-richblack-5' htmlFor={forwhat}>
            {text}
            {
                required&&<span className='text-red-500 text-sm '>*</span>
            }
            
            </label>
    );
}

export default Label;
