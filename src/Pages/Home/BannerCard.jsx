import React from "react";
import { motion } from "framer-motion";
import { FaBox, FaMoneyBillWave, FaWarehouse, FaBuilding } from "react-icons/fa";

const BannerCard = () => {
  const cards = [
    {
      icon: FaBox,
      title: "Booking Pick & Drop",
      description: "From personal packages to business shipments — we deliver on time, every time.",
      gradient: "from-indigo-500 to-purple-500",
    },
    {
      icon: FaMoneyBillWave,
      title: "Cash On Delivery",
      description: "Flexible payment options with secure cash on delivery service for your convenience.",
      gradient: "from-emerald-500 to-teal-500",
    },
    {
      icon: FaWarehouse,
      title: "Delivery Hub",
      description: "Strategic delivery hubs across the country ensuring fast and reliable service.",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: FaBuilding,
      title: "SME & Corporate",
      description: "Tailored solutions for businesses with bulk shipping and priority handling.",
      gradient: "from-violet-500 to-fuchsia-500",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="py-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-3">
          How it Works
        </h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Simple, fast, and reliable delivery process designed for your convenience
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
      >
        {cards.map((card, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            whileHover={{ y: -8, scale: 1.02 }}
            className="group relative bg-white/60 dark:bg-white/10 backdrop-blur-xl border border-white/40 dark:border-white/10 rounded-2xl p-6 shadow-lg shadow-black/5 dark:shadow-black/20 hover:shadow-xl hover:shadow-black/10 dark:hover:shadow-black/30 transition-all duration-300"
          >
            {/* Icon with gradient background */}
            <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${card.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
              <card.icon className="text-2xl text-white" />
            </div>

            {/* Title */}
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-3">
              {card.title}
            </h3>

            {/* Description */}
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              {card.description}
            </p>

            {/* Hover glow effect */}
            <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none`} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default BannerCard;
