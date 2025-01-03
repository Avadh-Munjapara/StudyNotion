import React from 'react';

const CustomButton = ({text,active}) => {
    return (
        <button className={`${active ? 'bg-yellow-100 sh shadow-white border-white' : 'bg-richblack-700 text-white border-b border-r'}  px-3 py-2 rounded-md`}>
            {text}
        </button>
    );
}

export default CustomButton;
