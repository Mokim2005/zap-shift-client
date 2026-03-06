# 🎨 Color Palette - Glass Design System

## Background Gradients

### Primary Background Colors

```
Slate 50:  #f8fafc  rgb(248, 250, 252)  - Light gray-blue
Blue 50:   #eff6ff  rgb(239, 246, 255)  - Very light blue
Purple 50: #faf5ff  rgb(250, 245, 255)  - Very light purple
Cyan 50:   #ecfeff  rgb(236, 254, 255)  - Very light cyan
```

### Usage in Code

```jsx
// Base gradient
className="bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50"

// Alternative warm
className="bg-gradient-to-br from-orange-50 via-red-50 to-pink-50"

// Alternative cool
className="bg-gradient-to-br from-cyan-50 via-teal-50 to-blue-50"
```

## Floating Blob Colors

### Blob 1 - Blue/Cyan
```
From: Blue 200   #bfdbfe  rgb(191, 219, 254)  40% opacity
To:   Cyan 200   #a5f3fc  rgb(165, 243, 252)  40% opacity
```

### Blob 2 - Purple/Pink
```
From: Purple 200 #e9d5ff  rgb(233, 213, 255)  30% opacity
To:   Pink 200   #fbcfe8  rgb(251, 207, 232)  30% opacity
```

### Blob 3 - Indigo/Blue
```
From: Indigo 200 #c7d2fe  rgb(199, 210, 254)  35% opacity
To:   Blue 200   #bfdbfe  rgb(191, 219, 254)  35% opacity
```

## Glass Effect Colors

### Standard Glass
```
Background:  rgba(255, 255, 255, 0.6)  - 60% white
Border:      rgba(255, 255, 255, 0.4)  - 40% white
Shadow:      rgba(0, 0, 0, 0.05)       - 5% black
```

### Light Glass
```
Background:  rgba(255, 255, 255, 0.4)  - 40% white
Border:      rgba(255, 255, 255, 0.3)  - 30% white
Shadow:      rgba(0, 0, 0, 0.03)       - 3% black
```

### Strong Glass
```
Background:  rgba(255, 255, 255, 0.8)  - 80% white
Border:      rgba(255, 255, 255, 0.5)  - 50% white
Shadow:      rgba(0, 0, 0, 0.1)        - 10% black
```

## Text Colors

### Headings
```
Gray 800:  #1f2937  rgb(31, 41, 55)   - Dark gray
Gray 900:  #111827  rgb(17, 24, 39)   - Very dark gray
```

### Body Text
```
Gray 600:  #4b5563  rgb(75, 85, 99)   - Medium gray
Gray 700:  #374151  rgb(55, 65, 81)   - Dark medium gray
```

### Muted Text
```
Gray 500:  #6b7280  rgb(107, 114, 128) - Light gray
Gray 400:  #9ca3af  rgb(156, 163, 175) - Very light gray
```

## Accent Colors

### Primary (Blue/Cyan)
```
Blue 500:  #3b82f6  rgb(59, 130, 246)  - Bright blue
Cyan 500:  #06b6d4  rgb(6, 182, 212)   - Bright cyan
```

### Secondary (Purple/Pink)
```
Purple 500: #a855f7  rgb(168, 85, 247)  - Bright purple
Pink 500:   #ec4899  rgb(236, 72, 153)  - Bright pink
```

### Success (Green)
```
Green 500:   #22c55e  rgb(34, 197, 94)   - Bright green
Emerald 500: #10b981  rgb(16, 185, 129)  - Emerald
```

### Warning (Orange/Yellow)
```
Orange 500: #f97316  rgb(249, 115, 22)  - Bright orange
Yellow 500: #eab308  rgb(234, 179, 8)   - Bright yellow
```

### Danger (Red)
```
Red 500:  #ef4444  rgb(239, 68, 68)  - Bright red
```

## Gradient Combinations

### Primary Button
```
from-blue-500 to-cyan-500
Linear gradient: #3b82f6 → #06b6d4
```

### Secondary Button
```
from-purple-500 to-pink-500
Linear gradient: #a855f7 → #ec4899
```

### Success Button
```
from-green-500 to-emerald-500
Linear gradient: #22c55e → #10b981
```

### Warning Button
```
from-orange-500 to-red-500
Linear gradient: #f97316 → #ef4444
```

## Icon Background Gradients

### Blue Theme
```
from-blue-500 to-cyan-500
className="bg-gradient-to-br from-blue-500 to-cyan-500"
```

### Purple Theme
```
from-purple-500 to-pink-500
className="bg-gradient-to-br from-purple-500 to-pink-500"
```

### Indigo Theme
```
from-indigo-500 to-blue-500
className="bg-gradient-to-br from-indigo-500 to-blue-500"
```

### Green Theme
```
from-green-500 to-emerald-500
className="bg-gradient-to-br from-green-500 to-emerald-500"
```

### Orange Theme
```
from-orange-500 to-red-500
className="bg-gradient-to-br from-orange-500 to-red-500"
```

### Teal Theme
```
from-teal-500 to-cyan-500
className="bg-gradient-to-br from-teal-500 to-cyan-500"
```

## Usage Examples

### Hero Section
```jsx
<GlassCard className="p-12 bg-gradient-to-br from-blue-50/80 to-purple-50/80">
  <h1 className="text-5xl font-bold text-gray-800">Title</h1>
  <p className="text-xl text-gray-600">Description</p>
</GlassCard>
```

### Feature Card
```jsx
<GlassCard className="p-6">
  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl" />
  <h3 className="text-xl font-semibold text-gray-800">Feature</h3>
  <p className="text-gray-600">Description</p>
</GlassCard>
```

### Button
```jsx
<GlassButton 
  variant="primary"
  className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
>
  Click Me
</GlassButton>
```

## Color Customization

### Change Background Theme

**Warm Theme:**
```jsx
// In GlobalBackgroundCustom.jsx
baseGradient: {
  from: 'from-orange-50',
  via: 'via-red-50',
  to: 'to-pink-50',
}
```

**Cool Theme:**
```jsx
baseGradient: {
  from: 'from-cyan-50',
  via: 'via-teal-50',
  to: 'to-blue-50',
}
```

**Neutral Theme:**
```jsx
baseGradient: {
  from: 'from-gray-50',
  via: 'via-slate-50',
  to: 'to-zinc-50',
}
```

**Nature Theme:**
```jsx
baseGradient: {
  from: 'from-green-50',
  via: 'via-emerald-50',
  to: 'to-teal-50',
}
```

### Change Blob Colors

**Warm Blobs:**
```jsx
blobs: [
  { gradient: 'from-orange-200/40 to-red-200/40' },
  { gradient: 'from-pink-200/30 to-rose-200/30' },
  { gradient: 'from-amber-200/35 to-orange-200/35' },
]
```

**Cool Blobs:**
```jsx
blobs: [
  { gradient: 'from-cyan-200/40 to-teal-200/40' },
  { gradient: 'from-blue-200/30 to-indigo-200/30' },
  { gradient: 'from-sky-200/35 to-cyan-200/35' },
]
```

## Accessibility

### Contrast Ratios

Ensure text meets WCAG AA standards:

- **Large text (18pt+)**: 3:1 minimum
- **Normal text**: 4.5:1 minimum
- **UI components**: 3:1 minimum

### Recommended Combinations

✅ **Good Contrast:**
```
text-gray-800 on bg-white/60  (with backdrop blur)
text-gray-900 on bg-white/70
text-white on bg-blue-500
```

❌ **Poor Contrast:**
```
text-gray-400 on bg-white/40
text-gray-500 on bg-white/50
```

## Color Psychology

### Blue/Cyan (Primary)
- Trust, reliability, professionalism
- Perfect for delivery/logistics
- Calming and stable

### Purple/Pink (Secondary)
- Creativity, innovation, premium
- Modern and trendy
- Adds visual interest

### Green (Success)
- Growth, success, safety
- Positive actions
- Confirmation states

### Orange/Red (Warning/Danger)
- Urgency, attention, energy
- Warnings and errors
- Call-to-action

## Quick Reference

```css
/* Background */
--bg-base: from-slate-50 via-blue-50 to-purple-50

/* Glass */
--glass-light: bg-white/40 backdrop-blur-lg
--glass-medium: bg-white/60 backdrop-blur-xl
--glass-strong: bg-white/80 backdrop-blur-2xl

/* Text */
--text-heading: text-gray-800
--text-body: text-gray-600
--text-muted: text-gray-500

/* Accents */
--accent-primary: from-blue-500 to-cyan-500
--accent-secondary: from-purple-500 to-pink-500
--accent-success: from-green-500 to-emerald-500
```

---

**Use these colors consistently throughout your application for a cohesive design!** 🎨
