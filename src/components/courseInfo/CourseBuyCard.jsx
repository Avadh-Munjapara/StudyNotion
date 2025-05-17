import React from "react";
import YellowBtn from "../comman/YellowBtn";
import { useDispatch } from "react-redux";



const CourseBuyCard = ({
  thumbnail,
  isBought,
  price,
  buyHandler,
  instructions,
  addToCart
}) => {
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
            instructions?.map((item)=><li className="text-caribbeangreen-100 text-sm">{item}</li>)
        }
      </ul>
      </div>
    </div>
  );
};

export default CourseBuyCard;
