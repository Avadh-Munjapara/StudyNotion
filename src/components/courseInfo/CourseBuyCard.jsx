import React from "react";
import YellowBtn from "../comman/YellowBtn";
import { useDispatch } from "react-redux";
import { TiTickOutline } from "react-icons/ti";
import { FaShareFromSquare } from "react-icons/fa6";
import copy from 'copy-to-clipboard';
import toast from "react-hot-toast";
const CourseBuyCard = ({
  thumbnail,
  isBought,
  price,
  buyHandler,
  instructions,
  addToCart
}) => {

  const shareHandler=()=>{
      copy(window.location.href);
      toast.success("Link Copied to Clipboard");
  }

  return (
    <div className="bg-richblack-700 rounded-lg">
      <div className=""><img src={thumbnail} className="h-[200px]" alt="thumbnail of course"/></div>
      <div className="p-6 gap-3 flex flex-col">
      <p className="text-3xl font-bold text-richblack-5">Rs. {price}</p>
      {isBought ? (
        <YellowBtn text={"Go To Course"} />
      ) : (
        <div>
          <div className="flex flex-col gap-3">
            <YellowBtn widthFull={true} text="Add to Cart" clickHandler={addToCart} />
            <YellowBtn textColour={'#F1F2FF'} widthFull={true} text="Buy Now" bgColour={'#161D29'} clickHandler={buyHandler} />
          </div>
        </div>
      )}
      <p className="text-richblack-25 text-sm text-center">30-Day Money-Back Guarantee</p>
      <ul className="flex flex-col">
        <p className="text-richblack-5 font-medium">This course includes:</p>
        {
            instructions?.map((item)=><li className="text-caribbeangreen-100 flex gap-1 items-center text-sm"><TiTickOutline className="text-lg"/>{item}</li>)
        }
      </ul>
            <p onClick={shareHandler} className="text-yellow-100 cursor-pointer flex gap-1 items-center justify-center"><FaShareFromSquare/> Share</p>
      </div>

    </div>
  );
};

export default CourseBuyCard;
