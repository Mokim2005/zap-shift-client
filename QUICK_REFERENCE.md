# 🚀 Quick Reference - Glass Design System

## Installation

```bash
npm install framer-motion gsap
```

## Import Components

```jsx
import GlassCard from './Components/GlassCard';
import GlassContainer from './Components/GlassContainer';
import GlassButton from './Components/GlassButton';
import glassStyles from './utils/glassStyles';
```

## Basic Usage

```jsx
// Page wrapper
<GlassContainer className="py-12">
  <GlassCard className="p-8">
    Content
  </GlassCard>
</GlassContainer>

// Button
<GlassButton variant="primary" size="lg">
  Click Me
</GlassButton>

// Custom glass element
<div className={glassStyles.card}>
  Content
</div>
```

## Glass Style Classes

```jsx
// Base glass
"bg-white/60 backdrop-blur-xl border border-white/40 shadow-lg rounded-2xl"

// Light glass
"bg-white/40 backdrop-blur-lg border border-white/30 shadow-md rounded-xl"

// Strong glass
"bg-white/80 backdrop-blur-2xl border border-white/50 shadow-xl rounded-2xl"

// With hover
"hover:bg-white/70 hover:shadow-xl hover:-translate-y-1 transition-all duration-200"
```

## Color Palette

```
Backgrounds: slate-50, blue-50, purple-50, cyan-50
Accents: blue-500, cyan-500, purple-500, pink-500
Text: gray-800 (headings), gray-600 (body)
```

## Component Props

```jsx
// GlassCard
<GlassCard hover={true} animate={true} className="p-6">

// GlassButton
<GlassButton variant="primary|secondary|ghost" size="sm|md|lg">

// GlassContainer
<GlassContainer maxWidth="max-w-7xl" padding="p-6">
```

## Common Patterns

```jsx
// Hero
<GlassCard className="p-12 text-center">
  <h1 className="text-5xl font-bold text-gray-800 mb-4">Title</h1>
  <p className="text-xl text-gray-600 mb-8">Description</p>
  <GlassButton variant="primary" size="lg">CTA</GlassButton>
</GlassCard>

// Feature card
<GlassCard className="p-6" hover>
  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl mb-4" />
  <h3 className="text-xl font-semibold mb-2">Title</h3>
  <p className="text-gray-600">Description</p>
</GlassCard>

// Form input
<input className="w-full px-4 py-3 bg-white/50 backdrop-blur-lg border border-white/40 rounded-xl" />
```

## Customization

```jsx
// Change background colors (GlobalBackgroundCustom.jsx)
baseGradient: {
  from: 'from-slate-50',
  via: 'via-blue-50',
  to: 'to-purple-50',
}

// Adjust opacity
bg-white/40  // Lighter
bg-white/60  // Standard
bg-white/80  // Stronger

// Change blur
backdrop-blur-lg   // Light
backdrop-blur-xl   // Standard
backdrop-blur-2xl  // Strong
```

## Files Created

```
Components/
├── GlobalBackground.jsx          (Main - with GSAP)
├── GlobalBackgroundAlt.jsx       (Framer Motion only)
├── GlobalBackgroundCustom.jsx    (Easy customization)
├── GlassCard.jsx
├── GlassContainer.jsx
├── GlassNavbar.jsx
├── GlassButton.jsx
├── ExampleGlassPage.jsx
└── RootLayout.jsx                (Updated)

Pages/
└── GlassDesignShowcase.jsx       (Complete example)

Utils/
└── glassStyles.js                (Style utilities)

Docs/
├── GLASS_DESIGN_SYSTEM.md        (Full documentation)
├── IMPLEMENTATION_STEPS.md       (Migration guide)
├── BACKGROUND_SYSTEM_GUIDE.md    (Quick guide)
└── QUICK_REFERENCE.md            (This file)
```

## Troubleshooting

```
Background not showing?
→ Check RootLayout.jsx has GlobalBackground
→ Verify -z-10 class exists

Animations laggy?
→ Reduce blur: backdrop-blur-xl → backdrop-blur-lg
→ Increase duration: 20 → 30

Text hard to read?
→ Increase opacity: bg-white/60 → bg-white/80
→ Use darker text: text-gray-600 → text-gray-800
```

## Next Steps

1. View showcase: `src/Pages/GlassDesignShowcase.jsx`
2. Read full docs: `GLASS_DESIGN_SYSTEM.md`
3. Follow migration: `IMPLEMENTATION_STEPS.md`
4. Start updating your pages!
