import React from "react";
import CourseCard from "./CourseCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel } from "swiper/modules"; // Add Mousewheel module
import "swiper/css";

const SliderCourses = ({ courses, type }) => {
  return (
    <div className=" my-10  w-11/12">
      <h2 className="text-richblack-5 mb-5 font-semibold text-3xl">
        {type === 'start' ? 'Courses to get you started' : 'Top Selling courses'}
      </h2>
      <div className=" flex justify-center mx-auto">
      <Swiper
        modules={[Mousewheel]} // Register Mousewheel module
        slidesPerView={3}
        loop={true}
        spaceBetween={30}
      >
        {courses?.length === 0 ? (
          <p>No courses in this category have been created</p>
        ) : (
          <div>
            {courses?.map((item, index) => (
              <SwiperSlide key={index}> {/* Add key for list rendering */}
                <CourseCard info={item} />
              </SwiperSlide>
            ))}
          </div>
        )}  
      </Swiper>
      </div>
      
    </div>
  );
};

export default SliderCourses;