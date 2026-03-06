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
      description: "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment's journey and get instant status updates for complete peace of mind.",
      gradient: "from-blue-500 to-cyan-500",
      position: "left",
    },
    {
      icon: FaShieldAlt,
      image: delivery,
      title: "100% Safe Delivery",
      description: "We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.",
      gradient: "from-emerald-500 to-teal-500",
      position: "right",
    },
    {
      icon: FaHeadset,
      image: delivery,
      title: "24/7 Call Center Support",
      description: "Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.",
      gradient: "from-purple-500 to-pink-500",
      position: "left",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const featureVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="py-16">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">
          Why Choose Us
        </h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
          Experience the difference with our premium delivery features
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="space-y-8"
      >
        {features.map((feature, index) => (
          <motion.div
            key={index}
            variants={featureVariants}
            whileHover={{ scale: 1.02 }}
            className={`group relative bg-white/60 dark:bg-white/10 backdrop-blur-xl border border-white/40 dark:border-white/10 rounded-3xl p-6 md:p-8 shadow-lg shadow-black/5 dark:shadow-black/20 hover:shadow-2xl hover:shadow-black/10 dark:hover:shadow-black/30 transition-all duration-300 overflow-hidden`}
          >
            {/* Gradient glow on hover */}
            <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none`} />

            <div className={`relative z-10 flex flex-col ${feature.position === 'right' ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-8`}>
              {/* Image side */}
              <motion.div
                whileHover={{ scale: 1.05, rotate: 2 }}
                transition={{ duration: 0.3 }}
                className="flex-shrink-0 w-full md:w-1/3"
              >
                <div className="relative">
                  {/* Gradient ring */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300`} />
                  
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="relative z-10 w-full h-auto rounded-2xl"
                  />
                </div>
              </motion.div>

              {/* Content side */}
              <div className="flex-1 text-center md:text-left">
                {/* Icon */}
                <div className={`inline-flex w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="text-2xl text-white" />
                </div>

                {/* Title */}
                <h3 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
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
