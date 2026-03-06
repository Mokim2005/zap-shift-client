import React from 'react';
import { motion } from 'framer-motion';

const GlassCard = ({ 
  children, 
  className = '', 
  hover = true,
  animate = true,
  ...props 
}) => {
  const baseClasses = `
    bg-white/60 
    backdrop-blur-xl 
    border border-white/40 
    shadow-lg shadow-black/5
    rounded-2xl
  `;

  const Component = animate ? motion.div : 'div';

  const animationProps = animate ? {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  } : {};

  const hoverProps = hover && animate ? {
    whileHover: { 
      y: -4,
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.08)',
      transition: { duration: 0.2 }
    }
  } : {};

  return (
    <Component
      className={`${baseClasses} ${className}`}
      {...animationProps}
      {...hoverProps}
      {...props}
    >
      {children}
    </Component>
  );
};

export default GlassCard;
