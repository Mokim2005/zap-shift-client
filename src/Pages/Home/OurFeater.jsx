import React from "react";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaShieldAlt, FaHeadset } from "react-icons/fa";
import tracking from "../../assets/live-tracking.png";
import delivery from "../../assets/safe-delivery.png";

const OurFeater = () => {
  const features = [
    {
      icon: FaMapMarkerAlt,
      image: tracking,
      title: "Live Parcel Tracking",
      description:
        "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment's journey and get instant status updates for complete peace of mind.",
      gradient: "from-blue-500 to-cyan-500",
      borderColor: "border-blue-400/30",
      position: "left",
    },
    {
      icon: FaShieldAlt,
      image: delivery,
      title: "100% Safe Delivery",
      description:
        "We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.",
      gradient: "from-emerald-500 to-teal-500",
      borderColor: "border-emerald-400/30",
      position: "right",
    },
    {
      icon: FaHeadset,
      image: delivery,
      title: "24/7 Call Center Support",
      description:
        "Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.",
      gradient: "from-purple-500 to-pink-500",
      borderColor: "border-purple-400/30",
      position: "left",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const featureVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="py-16 px-4 md:px-0">
      {/* Section Title */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white drop-shadow-lg mb-4">
          Why Choose SwiftShift
        </h2>
        <p className="text-gray-100 max-w-2xl mx-auto text-lg md:text-xl">
          Experience the difference with our premium delivery features
        </p>
      </motion.div>

      {/* Features Container */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="space-y-10 md:space-y-16"
      >
        {features.map((feature, index) => (
          <motion.div
            key={index}
            variants={featureVariants}
            whileHover={{ scale: 1.02 }}
            className={`group relative bg-white/15 backdrop-blur-3xl border ${feature.borderColor} rounded-3xl p-6 md:p-10 shadow-lg overflow-hidden transition-all duration-300`}
          >
            {/* Gradient background overlay */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none`}
            />

            <div
              className={`relative z-10 flex flex-col ${feature.position === "right" ? "md:flex-row-reverse" : "md:flex-row"} items-center gap-8 md:gap-12`}
            >
              {/* Image Container */}
              <motion.div
                whileHover={{ scale: 1.08, rotate: 2 }}
                transition={{ type: "spring", stiffness: 300, damping: 10 }}
                className="flex-shrink-0 w-full md:w-2/5 lg:w-1/3"
              >
                <div className="relative">
                  {/* Gradient border glow */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} rounded-2xl blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-300 -z-10`}
                  />

                  {/* Gradient border */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} rounded-2xl`}
                  />

                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="relative z-10 w-full h-auto rounded-2xl object-cover"
                  />
                </div>
              </motion.div>

              {/* Content Container */}
              <div className="flex-1 text-center md:text-left">
                {/* Icon */}
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  className={`inline-flex w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} items-center justify-center mb-6 shadow-lg`}
                >
                  <feature.icon className="text-2xl text-white" />
                </motion.div>

                {/* Title */}
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-gray-100 leading-relaxed text-base md:text-lg">
                  {feature.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default OurFeater;
