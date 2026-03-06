import React, { use } from "react";
import { motion } from "framer-motion";
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import ReviewCard from "../../Components/ReviewCard";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

const Reviews = ({ reviewsPromise }) => {
  const reviews = use(reviewsPromise);

  return (
    <div className="py-16 my-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">
          What Our Customers Say
        </h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
          Don't just take our word for it. Here's what our satisfied customers have to say about their delivery experience.
        </p>
      </motion.div>

      {/* Reviews Carousel */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative"
      >
        {/* Glass container for carousel */}
        <div className="relative bg-white/30 dark:bg-white/5 backdrop-blur-lg border border-white/40 dark:border-white/10 rounded-3xl p-8 md:p-12 shadow-xl shadow-black/5 dark:shadow-black/20 overflow-hidden">
          {/* Gradient glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-orange-500/10 dark:from-purple-500/5 dark:via-pink-500/5 dark:to-orange-500/5 pointer-events-none" />

          {/* Swiper */}
          <div className="relative z-10">
            <Swiper
              loop={true}
              effect={"coverflow"}
              grabCursor={true}
              centeredSlides={true}
              spaceBetween={30}
              slidesPerView={1}
              coverflowEffect={{
                rotate: 20,
                stretch: 0,
                depth: 200,
                modifier: 1,
                scale: 0.85,
                slideShadows: false,
              }}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
                dynamicBullets: true,
              }}
              breakpoints={{
                640: {
                  slidesPerView: 1,
                },
                768: {
                  slidesPerView: 2,
                },
                1024: {
                  slidesPerView: 3,
                },
              }}
              modules={[EffectCoverflow, Pagination, Autoplay]}
              className="reviews-swiper pb-12"
            >
              {reviews.map((review) => (
                <SwiperSlide key={review.id}>
                  <ReviewCard review={review} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </motion.div>

      {/* Custom pagination styles */}
      <style jsx>{`
        .reviews-swiper :global(.swiper-pagination-bullet) {
          background: rgba(99, 102, 241, 0.5);
          opacity: 0.5;
          width: 10px;
          height: 10px;
        }
        .reviews-swiper :global(.swiper-pagination-bullet-active) {
          background: rgb(99, 102, 241);
          opacity: 1;
          width: 24px;
          border-radius: 5px;
        }
      `}</style>
    </div>
  );
};

export default Reviews;
