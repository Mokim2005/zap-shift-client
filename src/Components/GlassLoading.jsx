import React from 'react';
import { motion } from 'framer-motion';

/**
 * Glass Loading Component
 * Beautiful loading screen with glassmorphism effect
 */
const GlassLoading = ({ message = 'Loading...' }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-slate-50/80 via-blue-50/80 to-purple-50/80 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-2xl shadow-black/10 rounded-3xl p-12 text-center"
      >
        {/* Animated spinner */}
        <div className="relative w-20 h-20 mx-auto mb-6">
          <motion.div
            className="absolute inset-0 border-4 border-blue-200 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            className="absolute inset-0 border-4 border-transparent border-t-blue-500 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
          />
        </div>

        {/* Loading text */}
        <motion.p
          className="text-lg font-medium text-gray-700"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          {message}
        </motion.p>
      </motion.div>
    </div>
  );
};

export default GlassLoading;
