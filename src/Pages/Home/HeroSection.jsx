import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import gsap from "gsap";

const HeroSection = () => {
  const heroRef = useRef(null);
  const imageRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    // GSAP Parallax effect on scroll
    const handleScroll = () => {
      if (imageRef.current) {
        const scrollY = window.scrollY;
        gsap.to(imageRef.current, {
          y: scrollY * 0.5,
          duration: 0.5,
          overwrite: "auto",
        });
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <div
      ref={heroRef}
      className="relative w-full h-screen md:h-[90vh] overflow-hidden bg-black/20"
    >
      {/* Background Image with Parallax */}
      <motion.div
        ref={imageRef}
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.8 }}
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: `url('https://imagedelivery.net/QopPmq6sPZVeeWT6S9SiOQ/2a03d426-9696-44a4-deb3-7d6d764e7f00/w=1200,h=801')`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
        }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/60" />

      {/* Glass Morphism Card */}
      <motion.div
        ref={containerRef}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="absolute inset-0 flex items-center justify-center px-4 sm:px-6 md:px-8 lg:px-12 z-10"
      >
        <div className="max-w-4xl text-center">
          {/* Main Content with Glass Background */}
          <motion.div
            variants={itemVariants}
            className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 sm:p-10 md:p-14 shadow-2xl shadow-black/30 hover:bg-white/15 hover:border-white/30 transition-all duration-500"
          >
            {/* Headline */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white drop-shadow-lg mb-4 md:mb-6"
            >
              Fast. Reliable.
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-300 bg-clip-text text-transparent">
                Smart Delivery
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              variants={itemVariants}
              className="text-lg sm:text-xl md:text-2xl text-gray-100/90 mb-8 md:mb-10 max-w-2xl mx-auto leading-relaxed"
            >
              SwiftShift ensures secure and on-time delivery across the country.
              <br className="hidden sm:block" />
              Experience parcel delivery like never before.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center"
            >
              <motion.button
                whileHover={{
                  scale: 1.08,
                  boxShadow: "0 20px 40px rgba(59, 130, 246, 0.4)",
                }}
                whileTap={{ scale: 0.95 }}
                className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold rounded-full flex items-center gap-2 shadow-lg hover:shadow-2xl transition-all duration-300 group text-sm sm:text-base"
              >
                Send Parcel
                <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </motion.button>

              <motion.button
                whileHover={{
                  scale: 1.08,
                  boxShadow: "0 20px 40px rgba(139, 92, 246, 0.4)",
                }}
                whileTap={{ scale: 0.95 }}
                className="px-6 sm:px-8 py-3 sm:py-4 bg-white/20 backdrop-blur-lg border-2 border-white/40 text-white font-bold rounded-full hover:bg-white/30 hover:border-white/60 transition-all duration-300 flex items-center gap-2 group text-sm sm:text-base"
              >
                Track Shipment
                <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </motion.div>

            {/* Floating Stats */}
            <motion.div
              variants={itemVariants}
              className="mt-10 md:mt-14 pt-8 md:pt-10 border-t border-white/20 grid grid-cols-3 gap-4"
            >
              {[
                { number: "50K+", label: "Deliveries" },
                { number: "99.9%", label: "On-Time" },
                { number: "24/7", label: "Support" },
              ].map((stat, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  className="text-center"
                >
                  <p className="text-2xl sm:text-3xl font-bold text-blue-300 drop-shadow-lg">
                    {stat.number}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-100/70 mt-1">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Floating Shapes Animation */}
      <motion.div
        animate={{
          y: [0, 30, 0],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-10 left-10 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl pointer-events-none"
      />

      <motion.div
        animate={{
          y: [0, -30, 0],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-20 right-10 w-40 h-40 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none"
      />
    </div>
  );
};

export default HeroSection;
