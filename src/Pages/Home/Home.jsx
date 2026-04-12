import React from "react";
import HeroSection from "./HeroSection";
import BannerCard from "./BannerCard";
import BannerBox from "./BannerBox";
import Brands from "./Brands";
import OurFeater from "./OurFeater";
import Reviews from "./Reviews";
import GlassContainer from "../../Components/GlassContainer";
import "./HomeComponents.css";
import HowToWork from "./HowToWork";
import HowToFix from "./HowToFix";

const reviewsPromise = fetch("/reviews.json").then((res) => res.json());

const Home = () => {
  return (
    <div className="home-wrapper">
      <HeroSection />
      <div
        style={{
          backgroundImage: `url('https://www.shutterstock.com/image-photo/happy-2530-year-old-indian-600nw-2656237875.jpg')`,
          backgroundAttachment: "fixed",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="relative"
      >
        {/* 🔥 Blur Overlay */}
        <div className="absolute inset-0 backdrop-blur-sm bg-black/30"></div>

        {/* 🔥 Content */}
        <div className="relative z-10">
          <GlassContainer>
            <BannerCard />
            <BannerBox />
            <HowToFix />
            <HowToWork />
            <Brands />
            <OurFeater />
            <Reviews reviewsPromise={reviewsPromise} />
          </GlassContainer>
        </div>
      </div>
    </div>
  );
};

export default Home;
