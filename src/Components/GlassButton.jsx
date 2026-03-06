import React from 'react';
import { motion } from 'framer-motion';

/**
 * Glass Button Component
 * Reusable button with glassmorphism effect
 */
const GlassButton = ({ 
  children, 
  variant = 'primary',
  size = 'md',
  className = '',
  ...props 
}) => {
  const variants = {
    primary: 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-600 hover:to-cyan-600',
    secondary: 'bg-white/60 backdrop-blur-xl border border-white/40 text-gray-700 hover:bg-white/80',
    ghost: 'bg-transparent hover:bg-white/30 text-gray-700',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`
        ${variants[variant]}
        ${sizes[size]}
        rounded-xl font-medium
        shadow-lg shadow-black/5
        transition-all duration-200
        ${className}
      `}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default GlassButton;
