import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  FaArrowRight,
  FaTruck,
  FaBoxOpen,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, EffectCube } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-cube";
import gsap from "gsap";

const HeroSection = () => {
  const heroRef = useRef(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  const sliderVariants = {
    hidden: { opacity: 0, x: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const features = [
    {
      icon: FaTruck,
      title: "Fast Delivery",
      description: "Express delivery within 4-6 hours in Dhaka",
    },
    {
      icon: FaBoxOpen,
      title: "Secure Handling",
      description: "Your packages are fully insured & protected",
    },
    {
      icon: FaMapMarkerAlt,
      title: "Live Tracking",
      description: "Track your parcel in real-time with updates",
    },
  ];

  const appImages = [
    "https://www.shutterstock.com/image-photo/full-body-side-view-delivery-260nw-2433176099.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpZjrVdyNnQYFZnShvBA52F39m1WwytbDnWA&s",
    "https://www.shutterstock.com/image-photo/happy-2530-year-old-indian-600nw-2656237875.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-SRRo90pE6mUcClAqQSSD_rxBDyQOrucTOA&s",
  ];

  return (
    <div
      ref={heroRef}
      className="relative w-full min-h-screen md:h-auto overflow-hidden"
      style={{
        backgroundImage: `url('https://www.shutterstock.com/image-photo/happy-2530-year-old-indian-600nw-2656237875.jpg')`,
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
        backgroundPosition: "center right",
      }}
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/50 to-black/30" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />

      {/* Animated Background Shapes */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-20 right-20 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 8, repeat: Infinity, delay: 1 }}
        className="absolute bottom-20 left-20 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none"
      />

      {/* Main Content Grid */}
      <div className="relative z-10">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 py-8 md:py-10 lg:py-12 gap-6 lg:gap-8 max-w-7xl mx-auto min-h-screen">
          {/* Left Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex-1 w-full lg:w-auto flex flex-col justify-center"
          >
            {/* Main Headline */}
            <motion.h1
              variants={itemVariants}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 md:mb-4 leading-tight"
            >
              Your Logistics
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-orange-400 bg-clip-text text-transparent">
                Partner for Seamless
              </span>
              <br />
              Delivery
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              variants={itemVariants}
              className="text-sm sm:text-base md:text-lg text-gray-100 mb-4 md:mb-6 leading-relaxed max-w-lg"
            >
              Fast, reliable, and secure parcel delivery across Bangladesh with
              real-time tracking.
            </motion.p>

            {/* Features List */}
            <motion.div
              variants={itemVariants}
              className="space-y-2 mb-4 md:mb-6"
            >
              {features.map((feature, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ x: 5 }}
                  className="flex items-start gap-3 group"
                >
                  <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <feature.icon className="text-white text-sm" />
                  </div>
                  <div>
                    <h3 className="text-sm md:text-base font-bold text-white">
                      {feature.title}
                    </h3>
                    <p className="text-gray-300 text-xs md:text-sm hidden sm:block">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col xs:flex-row gap-3 md:gap-4"
            >
              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 15px 30px rgba(59, 130, 246, 0.4)",
                }}
                whileTap={{ scale: 0.95 }}
                className="px-6 md:px-8 py-2 md:py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold rounded-full flex items-center justify-center gap-2 shadow-lg hover:shadow-2xl transition-all duration-300 group text-sm md:text-base w-full xs:w-auto"
              >
                Send Parcel
                <FaArrowRight className="group-hover:translate-x-1 transition-transform text-xs md:text-sm" />
              </motion.button>

              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 15px 30px rgba(139, 92, 246, 0.4)",
                }}
                whileTap={{ scale: 0.95 }}
                className="px-6 md:px-8 py-2 md:py-3 bg-white/15 backdrop-blur-lg border-2 border-white/40 text-white font-bold rounded-full hover:bg-white/25 hover:border-white/60 transition-all duration-300 flex items-center justify-center gap-2 group text-sm md:text-base w-full xs:w-auto"
              >
                Track Shipment
                <FaArrowRight className="group-hover:translate-x-1 transition-transform text-xs md:text-sm" />
              </motion.button>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={itemVariants}
              className="mt-4 md:mt-6 pt-4 md:pt-6 border-t border-white/20 grid grid-cols-3 gap-3 md:gap-4 hidden sm:grid"
            >
              {[
                { number: "50K+", label: "Deliveries" },
                { number: "99.9%", label: "On-Time" },
                { number: "24/7", label: "Support" },
              ].map((stat, idx) => (
                <motion.div key={idx} className="text-center">
                  <p className="text-lg md:text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                    {stat.number}
                  </p>
                  <p className="text-xs md:text-sm text-gray-300 mt-1">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Slider Section */}
          <motion.div
            variants={sliderVariants}
            initial="hidden"
            animate="visible"
            className="flex-1 w-full lg:w-auto flex justify-center items-center lg:pt-0"
          >
            <div className="w-full max-w-sm lg:max-w-md">
              {/* Glassy Card Container */}
              <div className="backdrop-blur-2xl bg-white/10 border border-white/30 rounded-3xl p-4 md:p-6 shadow-2xl shadow-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-500">
                {/* Image Slider */}
                <Swiper
                  modules={[Pagination, Autoplay, EffectCube]}
                  effect={isMobile ? "slide" : "cube"}
                  cubeEffect={{
                    shadow: true,
                    slideShadows: true,
                    shadowOffset: 20,
                    shadowScale: 0.94,
                  }}
                  autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                  }}
                  pagination={{
                    clickable: true,
                    dynamicBullets: true,
                  }}
                  loop
                  className="rounded-2xl overflow-hidden app-slider"
                  style={{
                    "--swiper-pagination-color": "#3b82f6",
                    "--swiper-pagination-bullet-inactive-color":
                      "rgba(255, 255, 255, 0.3)",
                    "--swiper-pagination-bullet-inactive-opacity": "0.5",
                  }}
                >
                  {appImages.map((image, idx) => (
                    <SwiperSlide
                      key={idx}
                      className="flex items-center justify-center"
                    >
                      <motion.img
                        src={image}
                        alt={`App Showcase ${idx + 1}`}
                        className="w-full h-auto rounded-2xl object-cover shadow-lg"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>

              {/* Feature Cards Below Slider */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="mt-4 grid grid-cols-2 gap-2 md:gap-3"
              >
                {[
                  { icon: "🚚", label: "Fast Pickup" },
                  { icon: "📍", label: "Live Tracking" },
                  { icon: "🔒", label: "Secure" },
                  { icon: "💰", label: "Best Price" },
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ scale: 1.05 }}
                    className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-lg p-2 md:p-3 text-center hover:bg-white/20 transition-all duration-300"
                  >
                    <div className="text-lg md:text-2xl mb-1">{item.icon}</div>
                    <p className="text-white text-xs font-semibold">
                      {item.label}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10 hidden md:flex flex-col items-center"
      >
        <div className="w-5 h-8 border-2 border-white/30 rounded-full flex justify-center">
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-0.5 h-2 bg-blue-400 rounded-full mt-1"
          />
        </div>
      </motion.div>
    </div>
  );
};

export default HeroSection;
