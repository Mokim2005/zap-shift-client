import React from "react";
import { motion } from "framer-motion";
import {
  FaBox,
  FaMoneyBillWave,
  FaWarehouse,
  FaBuilding,
} from "react-icons/fa";

const BannerCard = () => {
  const cards = [
    {
      icon: FaBox,
      title: "Booking Pick & Drop",
      description:
        "From personal packages to business shipments — we deliver on time, every time.",
      gradient: "from-indigo-500 to-purple-500",
      borderColor: "border-indigo-500/50",
    },
    {
      icon: FaMoneyBillWave,
      title: "Cash On Delivery",
      description:
        "Flexible payment options with secure cash on delivery service for your convenience.",
      gradient: "from-emerald-500 to-teal-500",
      borderColor: "border-emerald-500/50",
    },
    {
      icon: FaWarehouse,
      title: "Delivery Hub",
      description:
        "Strategic delivery hubs across the country ensuring fast and reliable service.",
      gradient: "from-blue-500 to-cyan-500",
      borderColor: "border-blue-500/50",
    },
    {
      icon: FaBuilding,
      title: "SME & Corporate",
      description:
        "Tailored solutions for businesses with bulk shipping and priority handling.",
      gradient: "from-violet-500 to-fuchsia-500",
      borderColor: "border-violet-500/50",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
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

  const accentLineVariants = {
    hidden: { width: 0 },
    visible: {
      width: "100%",
      transition: {
        duration: 0.8,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="py-16 md:py-20 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white drop-shadow-lg mb-4">
          How SwiftShift Works
        </h2>
        <p className="text-gray-100 max-w-3xl mx-auto text-lg md:text-xl leading-relaxed">
          Simple, fast, and reliable delivery process designed for your
          convenience
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 max-w-7xl mx-auto"
      >
        {cards.map((card, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            whileHover={{ y: -12, scale: 1.05 }}
            className={`group relative bg-white/15 backdrop-blur-3xl border-2 ${card.borderColor} rounded-2xl p-7 md:p-8 shadow-xl shadow-black/20 hover:shadow-2xl hover:shadow-black/30 transition-all duration-500 overflow-hidden`}
          >
            {/* Animated bottom accent line */}
            <motion.div
              variants={accentLineVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: 0.1 + index * 0.1 }}
              className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${card.gradient}`}
            />

            {/* Icon with gradient background and rotation */}
            <motion.div
              whileHover={{ scale: 1.15, rotate: 12 }}
              transition={{ type: "spring", stiffness: 300 }}
              className={`w-16 h-16 rounded-xl bg-gradient-to-br ${card.gradient} flex items-center justify-center mb-5 shadow-lg shadow-black/20`}
            >
              <card.icon className="text-2xl text-white" />
            </motion.div>

            {/* Title */}
            <h3 className="text-xl md:text-2xl font-bold text-white mb-3 group-hover:text-gray-100 transition-colors duration-300">
              {card.title}
            </h3>

            {/* Description */}
            <p className="text-gray-100 text-sm md:text-base leading-relaxed group-hover:text-white transition-colors duration-300">
              {card.description}
            </p>

            {/* Enhanced glow effect */}
            <div
              className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-10 transition-all duration-500 pointer-events-none`}
            />

            {/* Corner accent */}
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-white/10 to-transparent rounded-bl-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default BannerCard;
