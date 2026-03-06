import React from 'react';
import { motion } from 'framer-motion';

const GlassContainer = ({ 
  children, 
  className = '',
  maxWidth = 'max-w-7xl',
  padding = 'p-6 md:p-8',
  ...props 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`${maxWidth} mx-auto ${padding} ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default GlassContainer;
