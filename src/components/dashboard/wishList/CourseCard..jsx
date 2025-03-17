import React from 'react';
import ReactStars from "react-stars";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch } from 'react-redux';
import { removeItem } from '../../../slices/cartSlice';
const CourseCard = ({course,rating}) => {
    const dispatch=useDispatch();
    return (
        <div className='flex gap-8'>
        <div>
          <img className='w-[185px] h-[145px]' src={course.thumbnail} alt="course thumbnail" />
        </div>
        <div className='flex flex-col gap-2'>
          <h4 className='text-richblack-5 font-medium text-lg'>{course.name}</h4>
          <h5 className='text-[#838894]'>{course.category.name}</h5>
          <div>
            <span className="text-[#E7C009]">
              {rating}
            </span>
            <ReactStars
              count={5}
              edit={false}
              value={rating}
              color1="#2C333F"
              color2="#E7C009"
            />
            <span className='text-[#838894]'>({course.ratingAndReviews.length})</span>
          </div>
          <div>

          <button className='rounded-lg font-medium text-[#EF476F] bg-[#161D29] border border-[#2C333F]' onClick={()=> dispatch(removeItem(course._id))} >
          <RiDeleteBin6Line />
          <span>Remove</span>
          </button>

          <p className='text-[#FFD60A] text-2xl font-semibold'>{course.price}</p>
          </div>
        </div>
      </div>
    );
}

export default CourseCard;
