import React from "react";
import { motion } from "framer-motion";

/**
 * Professional Loading Spinner with Glassmorphism
 * Used throughout the application for consistent loading states
 */
const GlassLoading = ({ message = "Loading...", fullScreen = true }) => {
  const containerClasses = fullScreen
    ? "fixed inset-0 z-50 flex items-center justify-center"
    : "flex items-center justify-center w-full h-96";

  const bgClasses = fullScreen
    ? "bg-gradient-to-br from-slate-900/40 via-blue-900/40 to-purple-900/40 backdrop-blur-xl"
    : "";

  return (
    <div className={`${containerClasses} ${bgClasses}`}>
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="relative"
      >
        {/* Glass Card Container */}
        <div className="bg-white/10 dark:bg-slate-900/40 backdrop-blur-3xl border border-white/20 dark:border-white/10 shadow-2xl rounded-3xl p-12 text-center max-w-sm">
          {/* Animated Spinner */}
          <div className="relative w-24 h-24 mx-auto mb-8">
            {/* Outer ring 1 */}
            <motion.div
              className="absolute inset-0 border-3 border-transparent border-t-cyan-400 border-r-blue-500 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />

            {/* Outer ring 2 */}
            <motion.div
              className="absolute inset-2 border-3 border-transparent border-b-purple-500 border-l-pink-400 rounded-full"
              animate={{ rotate: -360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />

            {/* Center glow */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                className="w-4 h-4 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"
                animate={{ scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </div>
          </div>

          {/* Loading Text */}
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <p className="text-lg font-semibold bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300 bg-clip-text text-transparent">
              {message}
            </p>
          </motion.div>

          {/* Animated dots */}
          <div className="flex justify-center gap-2 mt-6">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"
                animate={{ y: [0, -8, 0] }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  delay: i * 0.1,
                }}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default GlassLoading;
