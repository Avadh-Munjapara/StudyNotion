import React from 'react';
import { Link } from 'react-router-dom';

const CustomButton = ({children,active,linkTo}) => {
    return (
        <Link to={linkTo}>
        <button className={`${active ? 'bg-yellow-100 ' : 'bg-richblack-700 text-white '}hover:scale-95 transition drop-shadow-[1px_1px_1px_rgba(255,255,255,0.8)] flex items-center gap-1 font-[550]  px-3 py-2 rounded-md`}>
            {children}
        </button>      
        </Link>
    );
}

export default CustomButton;
