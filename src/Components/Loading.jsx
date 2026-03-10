import React from "react";
import { motion } from "framer-motion";

const Loading = () => {
  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center bg-[#0f172a] text-white">

      {/* Animated Loader */}
      <div className="flex flex-col items-center gap-8">

        {/* Orbit Loader */}
        <div className="relative w-24 h-24">

          {/* center dot */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-4 h-4 bg-cyan-400 rounded-full"></div>
          </div>

          {/* orbit 1 */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            className="absolute inset-0 border-2 border-transparent border-t-cyan-400 rounded-full"
          ></motion.div>

          {/* orbit 2 */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
            className="absolute inset-2 border-2 border-transparent border-t-blue-500 rounded-full"
          ></motion.div>

          {/* orbit 3 */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
            className="absolute inset-4 border-2 border-transparent border-t-purple-500 rounded-full"
          ></motion.div>

        </div>

        {/* Loading text */}
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-semibold tracking-wide">
            Loading
          </h2>

          {/* animated dots */}
          <div className="flex justify-center gap-1">
            <span className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"></span>
            <span
              className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"
              style={{ animationDelay: "0.2s" }}
            ></span>
            <span
              className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"
              style={{ animationDelay: "0.4s" }}
            ></span>
          </div>

          <p className="text-gray-400 text-sm">
            Preparing your experience...
          </p>
        </div>
      </div>
    </div>
  );
};

export default Loading;