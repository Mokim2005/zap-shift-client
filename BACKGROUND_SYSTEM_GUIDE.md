# Global Background System Guide

## Installation

First, install the required dependencies:

```bash
npm install framer-motion gsap
```

## Components Created

### 1. GlobalBackground.jsx
The animated background component with floating gradient blobs.

### 2. GlassCard.jsx
Reusable glassmorphism card component.

### 3. GlassContainer.jsx
Container wrapper with fade-in animation.

### 4. ExampleGlassPage.jsx
Example page showing usage patterns.

## Usage Examples

### Basic Page with Glass Cards

```jsx
import GlassCard from './Components/GlassCard';
import GlassContainer from './Components/GlassContainer';

function MyPage() {
  return (
    <GlassContainer className="py-12">
      <GlassCard className="p-8">
        <h1>My Content</h1>
      </GlassCard>
    </GlassContainer>
  );
}
```

### Glass Card Props

```jsx
<GlassCard 
  hover={true}        // Enable hover animation
  animate={true}      // Enable entrance animation
  className="p-6"     // Additional classes
>
  Content here
</GlassCard>
```

### Custom Glass Styles

```jsx
<div className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-lg rounded-2xl p-6">
  Custom glass element
</div>
```

## Color Palette

- `from-slate-50` - #f8fafc
- `via-blue-50` - #eff6ff
- `to-purple-50` - #faf5ff
- `from-cyan-50` - #ecfeff

## Performance Tips

- Background is fixed with -z-10 (no repaints)
- GSAP animations use GPU acceleration
- Framer Motion optimized for 60fps
- Blur effects use backdrop-filter (hardware accelerated)

## Customization

### Change Background Colors

Edit `GlobalBackground.jsx`:

```jsx
<div className="fixed inset-0 -z-10 bg-gradient-to-br from-[your-color] via-[your-color] to-[your-color]">
```

### Adjust Animation Speed

In `GlobalBackground.jsx`, modify duration values:

```jsx
duration: 20 + index * 5,  // Slower = higher number
```

### Modify Glass Opacity

In `GlassCard.jsx`:

```jsx
bg-white/60  // Change 60 to 40-80 range
```

## Integration Checklist

- [x] GlobalBackground added to RootLayout
- [x] GlassCard component created
- [x] GlassContainer component created
- [x] Example page created
- [ ] Update existing pages to use GlassCard
- [ ] Test on all routes
- [ ] Verify mobile responsiveness
