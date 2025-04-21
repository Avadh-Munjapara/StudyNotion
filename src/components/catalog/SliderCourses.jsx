import React from "react";
import CourseCard from "./CourseCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel } from "swiper/modules"; // Add Mousewheel module
import "swiper/css";

const SliderCourses = ({ courses, type }) => {
  return (
    <div className=" my-10">
      <h2 className="text-richblack-5 mb-5 font-semibold text-3xl">
        { type === 'start' ? 'Courses to get you started'  :'Top Selling courses'}
      </h2>
      <p className="text-red-500 relative -top-5 font-semibold text-3xl">
        { !courses || courses?.length<=0  && 'No courses found here'}
      </p>
      <div className=" flex justify-center mx-auto">  
      <Swiper
        modules={[Mousewheel]} // Register Mousewheel module
        slidesPerView={courses?.length<3 ? courses?.length : 3}
        loop={true}
        spaceBetween={30}
        className=""
      >
        { courses?.length > 0 &&  <div className="w-full">
            {courses?.map((item, index) => (
              <SwiperSlide key={index}> {/* Add key for list rendering */}
                <CourseCard info={item} />
              </SwiperSlide>
            ))}
          </div>
        }  
      </Swiper>
      </div>
      
    </div>
  );
};

export default SliderCourses;