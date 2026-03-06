import React from "react";
import Banner from "./Banner";
import BannerCard from "./BannerCard";
import BannerBox from "./BannerBox";
import Brands from "./Brands";
import OurFeater from "./OurFeater";
import Reviews from "./Reviews";
import GlassContainer from "../../Components/GlassContainer";
import "./HomeComponents.css";

const reviewsPromise = fetch("/reviews.json").then((res) => res.json());

const Home = () => {
  return (
    <GlassContainer>
      <Banner />
      <BannerCard />
      <BannerBox />
      <Brands />
      <OurFeater />
      <Reviews reviewsPromise={reviewsPromise} />
    </GlassContainer>
  );
};

export default Home;
