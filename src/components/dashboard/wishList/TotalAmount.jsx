import React from 'react';
import { useSelector } from 'react-redux';

const TotalAmount = () => {
    const {total}=useSelector((state)=>state.cart);
    const clickHandler=()=>{

    }
    return (
        <div className='flex bg-[#161D29] flex-col gap-4 rounded-lg border border-[#2C333F]'>
        <div>
          <p className='text-[#999DAA] text-sm font-semibold'>Total:</p>
          <p className='text-[#FFD60A] font-medium text-2xl'>Rs.{total}</p>
          
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
