import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

/**
 * Example Glass Navbar Component
 * Shows how to create a sticky glass navbar with scroll effect
 */
const GlassNavbar = ({ children }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`
        sticky top-0 z-50 transition-all duration-300
        ${scrolled 
          ? 'bg-white/70 backdrop-blur-xl shadow-lg shadow-black/5 border-b border-white/40' 
          : 'bg-white/40 backdrop-blur-md'
        }
      `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {children}
        </div>
      </div>
    </motion.nav>
  );
};

export default GlassNavbar;
