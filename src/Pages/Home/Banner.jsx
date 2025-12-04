import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import bannerimg1 from "../../assets/banner/banner1.png";
import bannerimg2 from "../../assets/banner/banner2.png";
import bannerimg3 from "../../assets/banner/banner3.png";
import { FaArrowRight } from "react-icons/fa";

const Banner = () => {
  return (
    <Carousel autoPlay={true} infiniteLoop={true}>
      <div className="relative">
        <img src={bannerimg1} />
        <button
          className="absolute flex items-center  bottom-1/10 left-1/8 
               -translate-x-1/5 -translate-y-1/2
               bg-primary px-5 py-2 rounded-lg shadow-lg"
        >
          Trock Your Parcel
          <FaArrowRight className="-rotate-45" />
        </button>
        
      </div>
      <div>
        <img src={bannerimg2} />
      </div>
      <div>
        <img src={bannerimg3} />
      </div>
    </Carousel>
  );
};

export default Banner;
