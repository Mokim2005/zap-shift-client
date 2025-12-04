import React, { use } from "react";
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import ReviewCard from "../../Components/ReviewCard";

const Reviews = ({ reviewsPromise }) => {
  const reviews = use(reviewsPromise);
  console.log(reviews);
  return (
    <div className="my-24">
      <div className="text-center space-y-5">
        <h1 className="text-center text-2xl font-bold">Reviews</h1>
        <p className="mb-15">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officiis
          labore, explicabo amet fuga consequuntur sapiente recusandae ullam
          similique! Exercitationem culpa autem in aut sapiente adipisci
          doloribus aspernatur, eum quia error!
        </p>
      </div>
      <>
        <Swiper
          loop={true}
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          spaceBetween={3}
          slidesPerView={3}
          coverflowEffect={{
            rotate: 30,
            stretch: "50%",
            depth: 200,
            modifier: 1,
            scale: 0.75,
            slideShadows: true,
          }}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          pagination={true}
          modules={[EffectCoverflow, Pagination, Autoplay]}
          className="mySwiper"
        >
          {reviews.map((review) => (
            <SwiperSlide key={review.id}>
              <ReviewCard review={review}></ReviewCard>
            </SwiperSlide>
          ))}
        </Swiper>
      </>
    </div>
  );
};

export default Reviews;
