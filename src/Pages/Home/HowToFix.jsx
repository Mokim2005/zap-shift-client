import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import {
  FileText,
  Package,
  Truck,
  CheckCircle,
  ArrowRight,
} from "lucide-react";

const HowToFix = () => {
  const navigate = useNavigate();
  const steps = [
    {
      id: 1,
      title: "Create Order",
      description: "Fill in parcel details and select your delivery option",
      icon: FileText,
      color: "from-blue-600 to-cyan-600",
      delay: 0,
    },
    {
      id: 2,
      title: "Pickup Parcel",
      description: "Our rider picks up your parcel within scheduled time",
      icon: Package,
      color: "from-orange-600 to-yellow-600",
      delay: 0.15,
    },
    {
      id: 3,
      title: "In Transit",
      description: "Track your parcel in real-time as it moves",
      icon: Truck,
      color: "from-purple-600 to-pink-600",
      delay: 0.3,
    },
    {
      id: 4,
      title: "Delivered",
      description: "Get confirmation once delivery is complete",
      icon: CheckCircle,
      color: "from-green-600 to-emerald-600",
      delay: 0.45,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const stepVariants = {
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

  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
    hover: {
      scale: 1.15,
      rotate: 5,
      transition: {
        duration: 0.3,
      },
    },
  };

  const pulseVariants = {
    initial: { scale: 1, opacity: 1 },
    animate: {
      scale: [1, 1.2, 1],
      opacity: [1, 0.5, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
      },
    },
  };

  return (
    <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
            How It Works
          </h2>
          <p className="text-gray-100/70 text-base sm:text-lg max-w-2xl mx-auto">
            Follow these simple steps to understand how our delivery system
            works
          </p>
        </motion.div>

        {/* Timeline */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="relative"
        >
          {/* Desktop Timeline Line */}
          <div className="hidden lg:block absolute top-20 left-0 right-0 h-1 bg-linear-to-r from-blue-600 via-purple-600 to-green-600 rounded-full" />

          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 relative z-10">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isLast = index === steps.length - 1;

              return (
                <motion.div
                  key={step.id}
                  variants={stepVariants}
                  className="group"
                >
                  <div className="flex flex-col items-center">
                    {/* Icon Circle */}
                    <motion.div
                      variants={iconVariants}
                      whileHover="hover"
                      className="relative mb-4 sm:mb-6"
                    >
                      {/* Pulse Background */}
                      <motion.div
                        variants={pulseVariants}
                        initial="initial"
                        animate="animate"
                        className={`absolute inset-0 bg-linear-to-br ${step.color} rounded-full blur-lg opacity-50`}
                      />

                      {/* Main Circle */}
                      <div
                        className={`relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-linear-to-br ${step.color} flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-all duration-300`}
                      >
                        <Icon className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
                      </div>

                      {/* Step Number */}
                      <div className="absolute -bottom-2 -right-2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/20 border-2 border-white flex items-center justify-center text-sm sm:text-base font-bold text-white backdrop-blur-xl">
                        {step.id}
                      </div>
                    </motion.div>

                    {/* Step Content */}
                    <motion.div
                      className="text-center w-full"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: step.delay + 0.3, duration: 0.6 }}
                      viewport={{ once: true }}
                    >
                      <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">
                        {step.title}
                      </h3>
                      <p className="text-gray-100/70 text-xs sm:text-sm leading-relaxed">
                        {step.description}
                      </p>
                    </motion.div>
                  </div>

                  {/* Arrow Connector (Desktop) */}
                  {!isLast && (
                    <motion.div
                      className="hidden lg:flex absolute top-20 left-[60%] items-center justify-center"
                      initial={{ opacity: 0, scaleX: 0 }}
                      whileInView={{ opacity: 1, scaleX: 1 }}
                      transition={{
                        delay: step.delay + 0.6,
                        duration: 0.5,
                      }}
                      viewport={{ once: true }}
                    >
                      <motion.div
                        animate={{ x: [0, 6, 0] }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          delay: step.delay * 2,
                        }}
                        className="bg-linear-to-r from-blue-400 to-cyan-400 p-2 rounded-full text-white shadow-lg"
                      >
                        <ArrowRight className="w-5 h-5" />
                      </motion.div>
                    </motion.div>
                  )}

                  {/* Mobile Divider */}
                  {!isLast && (
                    <motion.div
                      className="lg:hidden flex justify-center my-6"
                      initial={{ opacity: 0, scaleY: 0 }}
                      whileInView={{ opacity: 1, scaleY: 1 }}
                      transition={{
                        delay: step.delay + 0.6,
                        duration: 0.5,
                      }}
                      viewport={{ once: true }}
                    >
                      <motion.div
                        animate={{ y: [0, 6, 0] }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          delay: step.delay * 2,
                        }}
                        className="bg-linear-to-b from-blue-400 to-cyan-400 p-2 rounded-full text-white shadow-lg"
                      >
                        <ArrowRight className="w-5 h-5 rotate-90" />
                      </motion.div>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 sm:mt-20 text-center"
        >
          <div className="bg-linear-to-r from-blue-600/20 via-purple-600/20 to-green-600/20 border border-white/20 rounded-2xl p-6 sm:p-8 md:p-10 backdrop-blur-3xl shadow-xl">
            <p className="text-gray-100 text-base sm:text-lg mb-6 sm:mb-8">
              It's that simple! Start sending your parcels now
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/send-parcel")}
                className="px-6 sm:px-8 py-3 sm:py-4 bg-linear-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                Send Your First Parcel
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 sm:px-8 py-3 sm:py-4 bg-white/10 border border-white/30 text-white font-bold rounded-xl hover:bg-white/20 transition-all duration-300"
              >
                Contact Support
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowToFix;
