import React from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import amazon from "../../assets/brands/amazon.png";
import amazon_vector from "../../assets/brands/amazon_vector.png";
import casio from "../../assets/brands/casio.png";
import moonstar from "../../assets/brands/moonstar.png";
import randstad from "../../assets/brands/randstad.png";
import star from "../../assets/brands/star.png";
import start_people from "../../assets/brands/start_people.png";

const Brands = () => {
  return (
    <div>
        <h1 className="text-xl font-bold text-center mb-4">We've helped thousands of sales teams</h1>
      <Swiper
        slidesPerView={3}
        spaceBetween={20}
        autoplay={{
          delay: 1000,
          disableOnInteraction: false,
        }}
        loop={true}
        modules={[Autoplay]}
        className="mySwiper bg-gray-300 p-3 mb-3"
      >
        <SwiperSlide>
          <img src={amazon} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={amazon_vector} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={casio} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={moonstar} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={randstad} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={star} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={start_people} alt="" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Brands;
