# 🎨 Homepage Color System Reference

## Gradient Palette

### Icon & Feature Gradients

```javascript
// Blue/Cyan - Trust, Reliability
"from-blue-500 to-cyan-500"
// Use for: Tracking, Technology, Primary features

// Purple/Pink - Premium, Modern
"from-purple-500 to-pink-500"
// Use for: Premium features, Highlights

// Emerald/Teal - Success, Growth
"from-emerald-500 to-teal-500"
// Use for: Success states, Positive features

// Orange/Red - Energy, Urgency
"from-orange-500 to-red-500"
// Use for: Important features, Alerts

// Indigo/Purple - Innovation, Quality
"from-indigo-500 to-purple-500"
// Use for: Advanced features, Quality

// Violet/Fuchsia - Creative, Unique
"from-violet-500 to-fuchsia-500"
// Use for: Special features, Standout elements
```

## Glass Effect Colors

### Light Mode

```css
/* Standard Glass Card */
background: rgba(255, 255, 255, 0.6);
backdrop-filter: blur(12px);
border: 1px solid rgba(255, 255, 255, 0.4);
box-shadow: 0 8px 32px rgba(0, 0, 0, 0.05);

/* Tailwind Classes */
bg-white/60
backdrop-blur-xl
border-white/40
shadow-lg shadow-black/5

/* Lighter Glass */
bg-white/40
border-white/30
shadow-md shadow-black/5

/* Stronger Glass */
bg-white/80
border-white/60
shadow-xl shadow-black/10
```

### Dark Mode

```css
/* Standard Glass Card */
background: rgba(255, 255, 255, 0.1);
backdrop-filter: blur(12px);
border: 1px solid rgba(255, 255, 255, 0.1);
box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);

/* Tailwind Classes */
dark:bg-white/10
dark:backdrop-blur-xl
dark:border-white/10
dark:shadow-lg dark:shadow-black/20

/* Lighter Glass */
dark:bg-white/5
dark:border-white/5
dark:shadow-md dark:shadow-black/10

/* Stronger Glass */
dark:bg-white/15
dark:border-white/20
dark:shadow-xl dark:shadow-black/30
```

## Text Colors

### Light Mode

```javascript
// Headings
"text-gray-800"     // Primary headings
"text-gray-900"     // Extra emphasis

// Body Text
"text-gray-600"     // Standard body text
"text-gray-700"     // Slightly darker body

// Muted Text
"text-gray-500"     // Secondary text
"text-gray-400"     // Tertiary text
```

### Dark Mode

```javascript
// Headings
"dark:text-gray-100"  // Primary headings
"dark:text-white"     // Extra emphasis

// Body Text
"dark:text-gray-300"  // Standard body text
"dark:text-gray-200"  // Slightly lighter body

// Muted Text
"dark:text-gray-400"  // Secondary text
"dark:text-gray-500"  // Tertiary text
```

## Border Colors

### Light Mode

```javascript
// Glass Borders
"border-white/40"     // Standard glass
"border-white/30"     // Lighter glass
"border-white/60"     // Stronger glass

// Dividers
"border-gray-200"     // Standard divider
"border-gray-300"     // Darker divider
```

### Dark Mode

```javascript
// Glass Borders
"dark:border-white/10"  // Standard glass
"dark:border-white/5"   // Lighter glass
"dark:border-white/20"  // Stronger glass

// Dividers
"dark:border-gray-700"  // Standard divider
"dark:border-gray-600"  // Lighter divider
```

## Shadow Colors

### Light Mode

```javascript
// Standard Shadows
"shadow-lg shadow-black/5"      // Light shadow
"shadow-xl shadow-black/10"     // Medium shadow
"shadow-2xl shadow-black/10"    // Large shadow

// Hover Shadows
"hover:shadow-xl hover:shadow-black/10"
"hover:shadow-2xl hover:shadow-black/10"
```

### Dark Mode

```javascript
// Standard Shadows
"dark:shadow-lg dark:shadow-black/20"    // Light shadow
"dark:shadow-xl dark:shadow-black/30"    // Medium shadow
"dark:shadow-2xl dark:shadow-black/30"   // Large shadow

// Hover Shadows
"dark:hover:shadow-xl dark:hover:shadow-black/30"
"dark:hover:shadow-2xl dark:hover:shadow-black/30"
```

## Gradient Overlays

### Background Glows

```javascript
// Light Mode
"bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10"
"bg-gradient-to-br from-blue-400/20 to-purple-400/20"

// Dark Mode
"dark:from-indigo-500/5 dark:via-purple-500/5 dark:to-pink-500/5"
"dark:from-blue-400/10 dark:to-purple-400/10"
```

### Hover Glows

```javascript
// Applied on hover
"bg-gradient-to-br from-blue-500 to-cyan-500 opacity-0 group-hover:opacity-5"
```

## Component-Specific Colors

### BannerCard

```javascript
// Card 1: Blue/Cyan
gradient: "from-indigo-500 to-purple-500"

// Card 2: Emerald/Teal
gradient: "from-emerald-500 to-teal-500"

// Card 3: Blue/Cyan
gradient: "from-blue-500 to-cyan-500"

// Card 4: Violet/Fuchsia
gradient: "from-violet-500 to-fuchsia-500"
```

### BannerBox (Services)

```javascript
// Service 1: Express
gradient: "from-blue-500 to-cyan-500"

// Service 2: Standard
gradient: "from-purple-500 to-pink-500"

// Service 3: Coverage
gradient: "from-emerald-500 to-teal-500"

// Service 4: Security
gradient: "from-orange-500 to-red-500"

// Service 5: Tracking
gradient: "from-indigo-500 to-purple-500"

// Service 6: Support
gradient: "from-violet-500 to-fuchsia-500"
```

### OurFeater (Features)

```javascript
// Feature 1: Tracking
gradient: "from-blue-500 to-cyan-500"

// Feature 2: Safety
gradient: "from-emerald-500 to-teal-500"

// Feature 3: Support
gradient: "from-purple-500 to-pink-500"
```

### Reviews

```javascript
// Quote icon background
"bg-gradient-to-br from-indigo-500 to-purple-500"

// Star rating
"text-yellow-400"
```

## Quick Copy-Paste

### Standard Glass Card

```jsx
<div className="bg-white/60 dark:bg-white/10 backdrop-blur-xl border border-white/40 dark:border-white/10 rounded-2xl p-6 shadow-lg shadow-black/5 dark:shadow-black/20">
  Content
</div>
```

### Gradient Icon Container

```jsx
<div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
  <Icon className="text-2xl text-white" />
</div>
```

### Heading with Theme Support

```jsx
<h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
  Title
</h2>
```

### Body Text with Theme Support

```jsx
<p className="text-gray-600 dark:text-gray-400">
  Description text
</p>
```

### Hover Card

```jsx
<motion.div
  whileHover={{ y: -8, scale: 1.02 }}
  className="bg-white/60 dark:bg-white/10 backdrop-blur-xl border border-white/40 dark:border-white/10 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
>
  Content
</motion.div>
```

## Color Psychology

### Blue/Cyan
- **Meaning**: Trust, reliability, technology
- **Use for**: Primary features, tracking, technology

### Purple/Pink
- **Meaning**: Premium, modern, creative
- **Use for**: Premium features, highlights

### Emerald/Teal
- **Meaning**: Success, growth, safety
- **Use for**: Success states, positive features

### Orange/Red
- **Meaning**: Energy, urgency, importance
- **Use for**: Important features, alerts

### Indigo/Purple
- **Meaning**: Innovation, quality, sophistication
- **Use for**: Advanced features, quality indicators

### Violet/Fuchsia
- **Meaning**: Creative, unique, special
- **Use for**: Special features, standout elements

## Accessibility

### Contrast Ratios

Ensure text meets WCAG AA standards:

```
Light Mode:
- text-gray-800 on bg-white/60 ✅ (4.5:1+)
- text-gray-600 on bg-white/60 ✅ (4.5:1+)

Dark Mode:
- text-gray-100 on bg-white/10 ✅ (4.5:1+)
- text-gray-300 on bg-white/10 ✅ (4.5:1+)
```

### Testing

Always test colors in both themes:
1. Light mode
2. Dark mode
3. High contrast mode
4. Color blind simulation

## Best Practices

1. **Consistency**: Use the same gradient for the same type of feature
2. **Hierarchy**: Stronger glass for important sections
3. **Contrast**: Ensure text is readable in both themes
4. **Subtlety**: Keep gradients and glows subtle
5. **Performance**: Use opacity for theme switching (faster)

---

**Use this reference to maintain color consistency across the homepage! 🎨**
