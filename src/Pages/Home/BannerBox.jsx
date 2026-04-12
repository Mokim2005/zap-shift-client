import React from "react";
import { motion } from "framer-motion";
import {
  FaShippingFast,
  FaBoxOpen,
  FaMapMarkedAlt,
  FaShieldAlt,
  FaClock,
  FaHeadset,
} from "react-icons/fa";

const BannerBox = () => {
  const services = [
    {
      icon: FaShippingFast,
      title: "Express Delivery",
      description:
        "Express delivery available in Dhaka within 4–6 hours from pick-up to drop-off.",
      gradient: "from-blue-500 to-cyan-500",
      borderColor: "border-blue-400/30",
    },
    {
      icon: FaBoxOpen,
      title: "Standard Delivery",
      description:
        "We deliver parcels within 24–72 hours in major cities across Bangladesh.",
      gradient: "from-purple-500 to-pink-500",
      borderColor: "border-purple-400/30",
    },
    {
      icon: FaMapMarkedAlt,
      title: "Nationwide Coverage",
      description:
        "Serving Dhaka, Chittagong, Sylhet, Khulna, Rajshahi and 64 districts.",
      gradient: "from-emerald-500 to-teal-500",
      borderColor: "border-emerald-400/30",
    },
    {
      icon: FaShieldAlt,
      title: "Secure Handling",
      description:
        "Your packages are insured and handled with utmost care throughout delivery.",
      gradient: "from-orange-500 to-red-500",
      borderColor: "border-orange-400/30",
    },
    {
      icon: FaClock,
      title: "Real-Time Tracking",
      description:
        "Track your parcel's journey from pickup to delivery with live updates.",
      gradient: "from-indigo-500 to-purple-500",
      borderColor: "border-indigo-400/30",
    },
    {
      icon: FaHeadset,
      title: "24/7 Support",
      description:
        "Our dedicated support team is always ready to assist you anytime.",
      gradient: "from-violet-500 to-fuchsia-500",
      borderColor: "border-violet-400/30",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="py-16 mt-10 px-4 md:px-0">
      <div className="relative bg-white/15 backdrop-blur-3xl border border-white/25 rounded-3xl p-8 md:p-12 shadow-2xl shadow-black/20 overflow-hidden">
        {/* Animated background gradient orbs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-10 right-10 w-64 h-64 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl pointer-events-none"
        />

        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute -bottom-20 -left-20 w-80 h-80 bg-gradient-to-tr from-cyan-400/20 to-blue-400/20 rounded-full blur-3xl pointer-events-none"
        />

        <div className="relative z-10">
          {/* Section Title */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white drop-shadow-lg mb-4">
              Our Premium Services
            </h2>
            <p className="text-gray-100 max-w-3xl mx-auto text-lg md:text-xl">
              Enjoy fast, reliable parcel delivery with real-time tracking and
              zero hassle.
            </p>
          </motion.div>

          {/* Services Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          >
            {services.map((service, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{ y: -12 }}
                className={`group relative bg-white/15 backdrop-blur-3xl border ${service.borderColor} rounded-2xl p-6 md:p-8 shadow-lg overflow-hidden transition-all duration-300`}
              >
                {/* Gradient glow on hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none`}
                />

                {/* Animated glow border effect */}
                <motion.div
                  animate={{
                    boxShadow: [
                      `0 0 0 0 rgba(255, 255, 255, 0)`,
                      `0 0 20px 10px rgba(255, 255, 255, 0.1)`,
                      `0 0 0 0 rgba(255, 255, 255, 0)`,
                    ],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                  }}
                  className="absolute inset-0 rounded-2xl pointer-events-none group-hover:hidden"
                />

                <div className="relative z-20">
                  {/* Icon Container */}
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-5 shadow-lg`}
                  >
                    <service.icon className="text-2xl text-white" />
                  </motion.div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-white mb-3">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-100 text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default BannerBox;
