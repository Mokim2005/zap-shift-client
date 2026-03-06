import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';

/**
 * Customizable Global Background
 * Easy to modify colors and animation settings
 */

// 🎨 CUSTOMIZE YOUR COLORS HERE
const BACKGROUND_CONFIG = {
  // Base gradient colors (Tailwind classes)
  baseGradient: {
    from: 'from-slate-50',      // #f8fafc
    via: 'via-blue-50',         // #eff6ff
    to: 'to-purple-50',         // #faf5ff
  },
  
  // Overlay gradient
  overlayGradient: {
    from: 'from-cyan-50/50',
    via: 'via-transparent',
    to: 'to-purple-50/50',
  },
  
  // Floating blobs
  blobs: [
    {
      size: 'w-96 h-96',
      gradient: 'from-blue-200/40 to-cyan-200/40',
      position: 'top-1/4 left-1/4',
      duration: 20,
      delay: 0,
    },
    {
      size: 'w-[500px] h-[500px]',
      gradient: 'from-purple-200/30 to-pink-200/30',
      position: 'top-1/2 right-1/4',
      duration: 25,
      delay: 2,
    },
    {
      size: 'w-[400px] h-[400px]',
      gradient: 'from-indigo-200/35 to-blue-200/35',
      position: 'bottom-1/4 left-1/2',
      duration: 23,
      delay: 4,
    },
  ],
  
  // Animation settings
  animation: {
    overlayDuration: 15,        // Overlay fade duration
    blobMovementRange: 100,     // How far blobs move (px)
  },
  
  // Grid pattern
  grid: {
    enabled: true,
    opacity: 0.02,
    size: '50px',
    color: 'rgba(99, 102, 241, 0.1)',
  },
};

const GlobalBackgroundCustom = () => {
  const blobRefs = useRef([]);

  useEffect(() => {
    // Animate each blob with GSAP
    blobRefs.current.forEach((blob, index) => {
      if (blob) {
        const config = BACKGROUND_CONFIG.blobs[index];
        const range = BACKGROUND_CONFIG.animation.blobMovementRange;
        
        gsap.to(blob, {
          x: `${Math.random() * range - range / 2}px`,
          y: `${Math.random() * range - range / 2}px`,
          duration: config.duration,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: config.delay,
        });
      }
    });
  }, []);

  return (
    <div className={`
      fixed inset-0 -z-10 overflow-hidden 
      bg-gradient-to-br 
      ${BACKGROUND_CONFIG.baseGradient.from} 
      ${BACKGROUND_CONFIG.baseGradient.via} 
      ${BACKGROUND_CONFIG.baseGradient.to}
    `}>
      {/* Animated gradient overlay */}
      <motion.div
        className={`
          absolute inset-0 bg-gradient-to-tr 
          ${BACKGROUND_CONFIG.overlayGradient.from} 
          ${BACKGROUND_CONFIG.overlayGradient.via} 
          ${BACKGROUND_CONFIG.overlayGradient.to}
        `}
        animate={{
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: BACKGROUND_CONFIG.animation.overlayDuration,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Floating blobs */}
      {BACKGROUND_CONFIG.blobs.map((blob, index) => (
        <div
          key={index}
          ref={(el) => (blobRefs.current[index] = el)}
          className={`
            absolute ${blob.position} ${blob.size}
            bg-gradient-to-br ${blob.gradient}
            rounded-full blur-3xl
          `}
        />
      ))}

      {/* Grid pattern overlay */}
      {BACKGROUND_CONFIG.grid.enabled && (
        <div 
          className="absolute inset-0"
          style={{
            opacity: BACKGROUND_CONFIG.grid.opacity,
            backgroundImage: `
              linear-gradient(${BACKGROUND_CONFIG.grid.color} 1px, transparent 1px),
              linear-gradient(90deg, ${BACKGROUND_CONFIG.grid.color} 1px, transparent 1px)
            `,
            backgroundSize: `${BACKGROUND_CONFIG.grid.size} ${BACKGROUND_CONFIG.grid.size}`,
          }}
        />
      )}
    </div>
  );
};

export default GlobalBackgroundCustom;

/**
 * USAGE EXAMPLES:
 * 
 * 1. Change to warm colors:
 *    from: 'from-orange-50',
 *    via: 'via-red-50',
 *    to: 'to-pink-50',
 * 
 * 2. Change to cool colors:
 *    from: 'from-cyan-50',
 *    via: 'via-teal-50',
 *    to: 'to-blue-50',
 * 
 * 3. Change to neutral:
 *    from: 'from-gray-50',
 *    via: 'via-slate-50',
 *    to: 'to-zinc-50',
 * 
 * 4. Faster animations:
 *    duration: 10 (instead of 20)
 * 
 * 5. Slower animations:
 *    duration: 40 (instead of 20)
 * 
 * 6. More blob movement:
 *    blobMovementRange: 200 (instead of 100)
 * 
 * 7. Disable grid:
 *    enabled: false
 */
