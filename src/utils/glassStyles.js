/**
 * Reusable glass style utilities
 * Import and use these classes throughout your application
 */

export const glassStyles = {
  // Base glass effect
  base: 'bg-white/60 backdrop-blur-xl border border-white/40 shadow-lg shadow-black/5',
  
  // Glass variations
  light: 'bg-white/40 backdrop-blur-lg border border-white/30 shadow-md shadow-black/5',
  medium: 'bg-white/60 backdrop-blur-xl border border-white/40 shadow-lg shadow-black/5',
  strong: 'bg-white/80 backdrop-blur-2xl border border-white/50 shadow-xl shadow-black/10',
  
  // Colored glass
  blue: 'bg-blue-50/60 backdrop-blur-xl border border-blue-100/40 shadow-lg shadow-blue-500/5',
  purple: 'bg-purple-50/60 backdrop-blur-xl border border-purple-100/40 shadow-lg shadow-purple-500/5',
  cyan: 'bg-cyan-50/60 backdrop-blur-xl border border-cyan-100/40 shadow-lg shadow-cyan-500/5',
  
  // Rounded corners
  rounded: {
    sm: 'rounded-lg',
    md: 'rounded-xl',
    lg: 'rounded-2xl',
    full: 'rounded-full'
  },
  
  // Padding presets
  padding: {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-12'
  },
  
  // Hover effects
  hover: 'hover:bg-white/70 hover:shadow-xl hover:-translate-y-1 transition-all duration-200',
  hoverScale: 'hover:scale-[1.02] transition-transform duration-200',
  
  // Navbar glass
  navbar: 'bg-white/70 backdrop-blur-xl border-b border-white/40 shadow-lg shadow-black/5',
  navbarScrolled: 'bg-white/80 backdrop-blur-2xl border-b border-white/50 shadow-xl shadow-black/10',
  
  // Card glass
  card: 'bg-white/60 backdrop-blur-xl border border-white/40 shadow-lg shadow-black/5 rounded-2xl p-6',
  cardHover: 'bg-white/60 backdrop-blur-xl border border-white/40 shadow-lg shadow-black/5 rounded-2xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-200',
  
  // Input glass
  input: 'bg-white/50 backdrop-blur-lg border border-white/40 focus:bg-white/70 focus:border-blue-300 transition-all',
  
  // Button glass
  button: 'bg-white/60 backdrop-blur-xl border border-white/40 hover:bg-white/80 shadow-lg shadow-black/5',
};

/**
 * Helper function to combine glass styles
 * @param {...string} styles - Style keys from glassStyles object
 * @returns {string} Combined class string
 */
export const combineGlassStyles = (...styles) => {
  return styles.join(' ');
};

/**
 * Create custom glass style
 * @param {number} opacity - Background opacity (0-100)
 * @param {string} blur - Blur amount (sm, md, lg, xl, 2xl, 3xl)
 * @param {string} rounded - Border radius (sm, md, lg, xl, 2xl, 3xl, full)
 * @returns {string} Custom glass class string
 */
export const createGlassStyle = (opacity = 60, blur = 'xl', rounded = 'xl') => {
  return `bg-white/${opacity} backdrop-blur-${blur} border border-white/40 shadow-lg shadow-black/5 rounded-${rounded}`;
};

export default glassStyles;
