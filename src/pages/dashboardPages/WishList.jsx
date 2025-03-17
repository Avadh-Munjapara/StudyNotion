import React, { useEffect } from "react";
import LocationBar from "../../components/dashboard/LocationBar";
import { useSelector } from "react-redux";
import { getAverageRating } from "../../services/operations/courseApi";
import CourseCard from "../../components/dashboard/wishList/CourseCard.";
import TotalAmount from "../../components/dashboard/wishList/TotalAmount";
import { useState } from "react";
const WishList = () => {
  const { totalItems, items } = useSelector((state) => state.cart);
  const [avgRating, setAvgRating] = useState(new Map());
  useEffect(() => {
    totalItems > 0 &&
      items &&
      items.forEach(async (element) => {
        try {
          const rating = await getAverageRating(element._id);
          const newMap = new Map(avgRating);
          newMap.set(element._id, rating);
          setAvgRating(newMap);
        } catch (error) {
          console.log("error while getting average rating", error);
        }
      });
  }, [totalItems]);
  return (
    <div>
      <LocationBar />
      {items && totalItems > 0 ? (
        <div className="flex flex-col gap-3">
          <h3 className="border-b-[1px] border-[#2C333F]">{totalItems} Courses in Wishlist</h3>
          <div className="flex gap-10">
            <div className="flex flex-col">
              {items.maps((item, index) => {
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
            <TotalAmount />
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
