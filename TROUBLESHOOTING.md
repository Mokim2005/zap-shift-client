# 🔧 Troubleshooting Guide - Glass Design System

## Common Issues & Solutions

### 1. Background Not Showing

#### Symptoms
- No animated background visible
- Plain white background

#### Solutions

**Check RootLayout Integration**
```jsx
// RootLayout.jsx should have:
import GlobalBackground from "./GlobalBackground";

return (
  <>
    <GlobalBackground />  {/* Must be here */}
    <div className="relative min-h-screen">
      {/* content */}
    </div>
  </>
);
```

**Verify Z-Index**
```jsx
// GlobalBackground should have -z-10
<div className="fixed inset-0 -z-10 overflow-hidden">
```

**Check for Conflicting Styles**
- Remove any `background-color` on body or root elements
- Check for `overflow: hidden` on parent containers
- Verify no other elements have negative z-index

### 2. Dependencies Not Installed

#### Symptoms
- Error: "Cannot find module 'framer-motion'"
- Error: "Cannot find module 'gsap'"

#### Solution
```bash
npm install framer-motion gsap
```

If still not working:
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm install framer-motion gsap
```

### 3. Animations Laggy or Choppy

#### Symptoms
- Animations stutter
- Low frame rate
- Page feels slow

#### Solutions

**Reduce Blur Intensity**
```jsx
// Change from:
backdrop-blur-3xl

// To:
backdrop-blur-xl  // or even backdrop-blur-lg
```

**Increase Animation Duration**
```jsx
// In GlobalBackground.jsx
duration: 30  // Instead of 20 (slower = smoother)
```

**Disable Animations on Mobile**
```jsx
const isMobile = window.innerWidth < 768;

{!isMobile && <GlobalBackground />}
```

**Check GPU Acceleration**
```jsx
// Add to animated elements:
style={{ willChange: 'transform' }}
```

### 4. Blur Effect Not Working

#### Symptoms
- No blur visible
- Glass looks flat

#### Solutions

**Browser Support**
- Safari needs `-webkit-backdrop-filter`
- Check browser compatibility

**Add Vendor Prefix**
```css
.glass {
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}
```

**Check Browser Settings**
- Some browsers disable blur for performance
- Try in a different browser

### 5. Text Hard to Read

#### Symptoms
- Low contrast
- Text blends with background

#### Solutions

**Increase Glass Opacity**
```jsx
// Change from:
bg-white/60

// To:
bg-white/80  // More opaque
```

**Use Darker Text Colors**
```jsx
// Change from:
text-gray-600

// To:
text-gray-800  // or text-gray-900
```

**Add Text Shadow**
```jsx
<h1 className="text-gray-800" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.1)' }}>
  Title
</h1>
```

**Reduce Background Intensity**
```jsx
// In GlobalBackground.jsx, reduce blob opacity:
from-blue-200/40  // Change to /30 or /20
```

### 6. Components Not Found

#### Symptoms
- Error: "Cannot find module './Components/GlassCard'"

#### Solutions

**Check File Paths**
```jsx
// If in src/Pages/Home/Home.jsx:
import GlassCard from '../../Components/GlassCard';

// If in src/Pages/MyPage.jsx:
import GlassCard from '../Components/GlassCard';
```

**Verify Files Exist**
```bash
# Check if files are created:
ls src/Components/Glass*.jsx
```

### 7. Framer Motion Errors

#### Symptoms
- Error: "motion is not defined"
- Error: "Invalid prop 'animate'"

#### Solutions

**Check Import**
```jsx
// Correct:
import { motion } from 'framer-motion';

// Incorrect:
import motion from 'framer-motion';
```

**Verify Installation**
```bash
npm list framer-motion
# Should show version number
```

### 8. GSAP Errors

#### Symptoms
- Error: "gsap is not defined"
- Blobs not animating

#### Solutions

**Check Import**
```jsx
// Correct:
import gsap from 'gsap';

// Incorrect:
import { gsap } from 'gsap';
```

**Use Alternative Background**
If GSAP continues to cause issues, use the Framer Motion-only version:
```jsx
// In RootLayout.jsx:
import GlobalBackgroundAlt from "./GlobalBackgroundAlt";
```

### 9. Mobile Performance Issues

#### Symptoms
- Slow on mobile devices
- Battery drain
- Overheating

#### Solutions

**Reduce Blur on Mobile**
```jsx
<div className="backdrop-blur-md md:backdrop-blur-xl">
```

**Disable Animations on Mobile**
```jsx
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

<GlassCard animate={!isMobile}>
```

**Simplify Background**
```jsx
// Use fewer blobs on mobile
{!isMobile && (
  <>
    <div ref={blob2Ref} />
    <div ref={blob3Ref} />
  </>
)}
```

### 10. Build Errors

#### Symptoms
- Error during `npm run build`
- Production build fails

#### Solutions

**Check for Console Logs**
Remove any console.log statements

**Verify All Imports**
```bash
# Check for unused imports
npm run lint
```

**Test Build Locally**
```bash
npm run build
npm run preview
```

### 11. Tailwind Classes Not Working

#### Symptoms
- Glass styles not applied
- Blur not visible

#### Solutions

**Check Tailwind Config**
Ensure backdrop-filter is enabled (it should be by default in Tailwind 4.x)

**Purge Settings**
Make sure your content paths include all component files

**Use JIT Mode**
Tailwind 4.x uses JIT by default, but verify it's working

### 12. Z-Index Conflicts

#### Symptoms
- Background appears on top of content
- Navbar hidden behind background

#### Solutions

**Check Z-Index Hierarchy**
```jsx
// Background: -z-10
// Content: z-0 (default) or z-10
// Navbar: z-50
// Modals: z-[100]
```

**Add Relative Positioning**
```jsx
<div className="relative z-10">
  {/* Content that should be above background */}
</div>
```

### 13. Hover Effects Not Working

#### Symptoms
- No hover animation on GlassCard
- Buttons don't respond to hover

#### Solutions

**Check hover Prop**
```jsx
<GlassCard hover={true}>  {/* Must be true */}
```

**Verify Framer Motion**
```jsx
// Component should use motion.div
<motion.div whileHover={{ y: -4 }}>
```

**Test on Desktop**
Hover effects don't work on touch devices

### 14. Page Load Performance

#### Symptoms
- Slow initial page load
- Large bundle size

#### Solutions

**Lazy Load Components**
```jsx
const GlassDesignShowcase = lazy(() => import('./Pages/GlassDesignShowcase'));
```

**Optimize Images**
Compress any images used in the design

**Code Splitting**
Ensure Vite is properly splitting code

## Performance Checklist

- [ ] Animations run at 60fps
- [ ] No layout shifts on load
- [ ] Smooth scrolling
- [ ] Fast Time to Interactive (TTI)
- [ ] No console errors
- [ ] Works on mobile
- [ ] Works in all browsers
- [ ] Build completes successfully

## Browser Compatibility

| Browser | Version | Support | Notes |
|---------|---------|---------|-------|
| Chrome | 90+ | ✅ Full | Best performance |
| Firefox | 88+ | ✅ Full | Good performance |
| Safari | 14+ | ✅ Full | Needs -webkit- prefix |
| Edge | 90+ | ✅ Full | Chromium-based |
| Mobile Safari | iOS 14+ | ✅ Full | May need blur reduction |
| Chrome Mobile | Android 8+ | ✅ Full | May need blur reduction |

## Getting Help

If you're still experiencing issues:

1. **Check the Documentation**
   - GLASS_DESIGN_SYSTEM.md
   - IMPLEMENTATION_STEPS.md
   - QUICK_REFERENCE.md

2. **Review Example Files**
   - GlassDesignShowcase.jsx
   - ExampleGlassPage.jsx

3. **Check Browser Console**
   - Look for error messages
   - Check network tab for failed imports

4. **Test in Isolation**
   - Create a minimal test page
   - Add components one by one

5. **Verify Environment**
   ```bash
   node --version  # Should be 16+
   npm --version   # Should be 8+
   ```

## Quick Fixes

```bash
# Nuclear option - fresh start
rm -rf node_modules package-lock.json
npm install
npm install framer-motion gsap
npm run dev
```

## Still Not Working?

1. Check that you're using the correct file paths
2. Verify all files were created successfully
3. Make sure you're importing from the right locations
4. Test with the alternative background (GlobalBackgroundAlt.jsx)
5. Try the showcase page first to verify the system works

## Prevention Tips

- Always test after making changes
- Keep dependencies up to date
- Use the provided examples as templates
- Don't modify core glass components
- Create custom components that extend the base ones
- Test on multiple devices early
- Monitor performance regularly

---

**Most issues are resolved by:**
1. Installing dependencies correctly
2. Using correct import paths
3. Verifying z-index hierarchy
4. Reducing blur on mobile devices
