import React from "react";
import Banner from "./Banner";
import BannerCard from "./BannerCard";
import BannerBox from "./BannerBox";
import Brands from "./Brands";
import OurFeater from "./OurFeater";
import Reviews from "./Reviews";


const reviewsPromise = fetch("/reviews.json").then((res) => res.json());

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <BannerCard></BannerCard>
      <BannerBox></BannerBox>
      <Brands></Brands>
      <OurFeater></OurFeater>
      <Reviews reviewsPromise={reviewsPromise}></Reviews>
    </div>
  );
};

export default Home;
