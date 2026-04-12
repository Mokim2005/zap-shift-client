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
      <GlassContainer>
        <BannerCard />
        <BannerBox />
        <HowToFix></HowToFix>
        <HowToWork />
        
        <Brands />
        <OurFeater />
        <Reviews reviewsPromise={reviewsPromise} />
      </GlassContainer>
    </div>
  );
};

export default Home;
