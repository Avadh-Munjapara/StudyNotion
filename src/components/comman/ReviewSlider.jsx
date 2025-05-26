import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import ReviewCard from "./ReviewCard";
const ReviewSlider = ({ reviews, general }) => {
  return (
    <div className="relative">
      <div className=" bg-gradient-to-r bg-transparent pointer-events-none from-[#000814] via-[#00081400] to-[#000814] z-10 absolute top-0 right-0 left-0 bottom-0"></div>

      <div className="">
        <h3 className="text-richblack-5 font-semibold text-[36px] text-center mb-6">
          Review from other learners
        </h3>
        <Swiper loop={true} spaceBetween={24} slidesPerView={4}>
          {reviews?.map((review) => (
            <SwiperSlide>
              <ReviewCard general={general} review={review} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default ReviewSlider;
