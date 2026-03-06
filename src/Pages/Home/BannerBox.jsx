import React from "react";
import { motion } from "framer-motion";
import { FaShippingFast, FaBoxOpen, FaMapMarkedAlt, FaShieldAlt, FaClock, FaHeadset } from "react-icons/fa";

const BannerBox = () => {
  const services = [
    {
      icon: FaShippingFast,
      title: "Express Delivery",
      description: "Express delivery available in Dhaka within 4–6 hours from pick-up to drop-off.",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: FaBoxOpen,
      title: "Standard Delivery",
      description: "We deliver parcels within 24–72 hours in major cities across Bangladesh.",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: FaMapMarkedAlt,
      title: "Nationwide Coverage",
      description: "Serving Dhaka, Chittagong, Sylhet, Khulna, Rajshahi and 64 districts.",
      gradient: "from-emerald-500 to-teal-500",
    },
    {
      icon: FaShieldAlt,
      title: "Secure Handling",
      description: "Your packages are insured and handled with utmost care throughout delivery.",
      gradient: "from-orange-500 to-red-500",
    },
    {
      icon: FaClock,
      title: "Real-Time Tracking",
      description: "Track your parcel's journey from pickup to delivery with live updates.",
      gradient: "from-indigo-500 to-purple-500",
    },
    {
      icon: FaHeadset,
      title: "24/7 Support",
      description: "Our dedicated support team is always ready to assist you anytime.",
      gradient: "from-violet-500 to-fuchsia-500",
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
    <div className="py-16 mt-10">
      <div className="relative bg-white/40 dark:bg-white/5 backdrop-blur-xl border border-white/40 dark:border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl shadow-black/10 dark:shadow-black/30 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10 dark:from-indigo-500/5 dark:via-purple-500/5 dark:to-pink-500/5 pointer-events-none" />
        
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

        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-800 dark:text-gray-100 mb-4">
              Our Services
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto text-lg">
              Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {services.map((service, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{ y: -8, scale: 1.03 }}
                className="group relative bg-white/80 dark:bg-white/10 backdrop-blur-lg border border-white/60 dark:border-white/20 rounded-2xl p-6 shadow-lg"
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-all duration-300`}>
                  <service.icon className="text-2xl text-white" />
                </div>

                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-3">
                  {service.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default BannerBox;
