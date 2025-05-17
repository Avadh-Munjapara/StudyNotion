import React from 'react';
import { useSelector } from 'react-redux';
import { buyCourse } from '../../../services/operations/paymentApi';

const TotalAmount = () => {
    const {total}=useSelector((state)=>state.cart);
    const {items}=useSelector((state)=>state.cart);
    const clickHandler=()=>{
        const courses=items.map((item)=>item._id);
      buyCourse(courses);
      }
    return (
        <div className='flex bg-[#161D29] flex-col gap-4 p-6 rounded-lg border border-[#2C333F]'>
        <div className='flex flex-col gap-1'>
          <p className='text-[#999DAA] text-sm font-semibold'>Total:</p>
          <p className='text-[#FFD60A] font-semibold text-2xl'>Rs.{total}</p>
          
        </div>
        <button onClick={clickHandler}
          className="bg-[#FFD60A] rounded-lg font-medium py-[6px] px-[18px]"
        >
          Buy Now
        </button>
      </div>
    );
}

export default TotalAmount;
