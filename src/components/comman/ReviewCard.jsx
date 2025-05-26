import React from "react";
import Stars from "./Stars";
const ReviewCard = ({ review,general }) => {
  return (
    <div className="flex bg-richblack-800 p-4 flex-col gap-2">
      <div className="flex gap-3">
        <img className="w-10 h-10 rounded-full" src={review.user.image} alt="profile pic" />
        <div className="text-richblack-5">
            <p className="text-richblack-5 font-semibold">{review.user.firstName} {review.user.lastName}</p>
            <p className="text-richblack-600 text-[12px] font-medium">{review.user.email}</p>
        </div>
      </div>
      {
        general && <p className="text-richblack-25 text-sm">Enrolled in <span className="font-semibold">{review?.course?.name}</span></p>
      }
      <p className="text-richblack-25 text-sm">{review.review}</p>
      <div className="text-richblack-5 flex gap-1 items-center"><span className="text-yellow-50 font-semibold ">{review.rating}</span><Stars rating={review.rating}/></div>
    </div>
  );
};

export default ReviewCard;
