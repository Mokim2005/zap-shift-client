import React from "react";
import Banner from "./Banner";
import BannerCard from "./BannerCard";
import BannerBox from "./BannerBox";
import Brands from "./Brands";
import OurFeater from "./OurFeater";
import Reviews from "./Reviews";
import GlassContainer from "../../Components/GlassContainer";

const reviewsPromise = fetch("/reviews.json").then((res) => res.json());

const Home = () => {
  return (
    <GlassContainer>
      <Banner></Banner>
      <BannerCard></BannerCard>
      <BannerBox></BannerBox>
      <Brands></Brands>
      <OurFeater></OurFeater>
      <Reviews reviewsPromise={reviewsPromise}></Reviews>
    </GlassContainer>
  );
};

export default Home;
