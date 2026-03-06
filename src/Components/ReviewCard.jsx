import React from "react";
import { motion } from "framer-motion";
import { FaQuoteLeft, FaStar } from "react-icons/fa";

const ReviewCard = ({ review }) => {
  const { userName, review: testimonial, user_photoURL } = review;
  
  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="h-full bg-white/70 dark:bg-white/10 backdrop-blur-xl border border-white/60 dark:border-white/20 rounded-2xl p-6 shadow-lg shadow-black/5 dark:shadow-black/20 hover:shadow-2xl hover:shadow-black/10 dark:hover:shadow-black/30 transition-all duration-300"
    >
      {/* Quote Icon */}
      <div className="flex items-center justify-between mb-4">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
          <FaQuoteLeft className="text-white text-xl" />
        </div>
        
        {/* Star Rating */}
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => (
            <FaStar key={i} className="text-yellow-400 text-sm" />
          ))}
        </div>
      </div>

      {/* Review Text */}
      <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed line-clamp-4">
        "{testimonial}"
      </p>

      {/* Divider */}
      <div className="border-t border-gray-200 dark:border-gray-700 mb-4" />

      {/* Profile */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-white/50 dark:ring-white/20">
          <img
            src={user_photoURL}
            alt={userName}
            className="w-full h-full object-cover"
          />
        </div>

        <div>
          <h4 className="font-semibold text-gray-800 dark:text-gray-100">
            {userName}
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Verified Customer
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default ReviewCard;
