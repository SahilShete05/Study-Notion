import React from "react";
import Course_Card from "./Course_Card"

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";

import SwiperCore, { Autoplay, FreeMode, Pagination, Navigation } from "swiper";
SwiperCore.use([Autoplay, FreeMode, Pagination, Navigation]);

const CourseSlider = ({ Courses }) => {
  return (
    <>
      {Courses?.length ? (
        <Swiper
          slidesPerView={1}
          spaceBetween={25}
          loop={true}
          navigation={true}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="max-h-[30rem] mySwiper"
        >
          {Courses.map((course, index) => (
            <SwiperSlide key={index}>
              <Course_Card course={course} Height="h-[250px]" />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p className="text-xl text-richblack-5">No Course Found</p>
      )}
    </>
  );
};

export default CourseSlider;
