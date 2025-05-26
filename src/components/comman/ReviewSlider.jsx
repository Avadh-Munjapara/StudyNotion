import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import ReviewCard from "./ReviewCard";
const ReviewSlider = ({ reviews }) => {
  return (
    <div className="">
      <h3 className="text-richblack-5 font-semibold text-[36px] text-center mb-6">Review from other learners</h3>
      <Swiper loop={true} spaceBetween={24} slidesPerView={3}>
        {reviews?.map((review) => (
          <SwiperSlide>
            <ReviewCard review={review} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ReviewSlider;
