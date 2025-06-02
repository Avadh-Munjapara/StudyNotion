import React, { useEffect } from "react";
import LocationBar from "../../components/dashboard/LocationBar";
import { useSelector } from "react-redux";
import { getAverageRating } from "../../services/operations/courseApi";
import CourseCard from "../../components/dashboard/wishList/CourseCard.";
import TotalAmount from "../../components/dashboard/wishList/TotalAmount";
import { useState } from "react";
const WishList = () => {
  const { totalItems, items } = useSelector((state) => state.cart);
    const { token } = useSelector((state) => state.auth);

  const [avgRating, setAvgRating] = useState(new Map());
  useEffect(() => {
    totalItems > 0 &&
      items &&
      items.forEach(async (element) => {
        try {
          const rating = await getAverageRating(token,element._id);
          const newMap = new Map(avgRating);
          newMap.set(element._id, rating);
          setAvgRating(newMap);
        } catch (error) {
          console.log("error while getting average rating", error);
        }
      });
  }, [totalItems]);
  return (
    <div className='pl-6 pt-6 '>
      <LocationBar />
      {items && totalItems > 0 ? (
        <div className="flex flex-col gap-5">
          <h3 className="border-b-[1px] text-richblack-400 font-semibold py-2 border-[#2C333F]">{totalItems} Courses in Wishlist</h3>
          <div className="flex justify-between max-w-maxContent gap-10">
            <div className="flex w-4/5 gap-5 flex-col">
              {items.map((item, index) => {
                return (
                  <>
                    <CourseCard
                      course={item}
                      key={index}
                      rating={avgRating[item._id]}
                    />
                    {
                        index<totalItems-1 && <div className="h-[1px] bg-[#2C333F] w-full"></div>
                    }
                  </>
                );
              })}
            </div>
            <div className="w-1/5">
            <TotalAmount />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center w-full h-full items-center">
          <p className="text-richblack-5">
            you haven't added anything to wish list
          </p>
        </div>
      )}
    </div>
  );
};

export default WishList;
