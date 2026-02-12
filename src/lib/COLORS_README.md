# PAFT Color System

This document explains how to use the PAFT color system consistently across the application.

## Overview

The PAFT color system is built around the brand colors extracted from the PAFT logo:
- **Primary Color**: Cyan (#06B6D4) - The main blue from the logo
- **Secondary Color**: Blue (#2563EB) - Complementary blue for accents

## Usage Methods

### 1. CSS Variables (Recommended)

Use CSS variables in your stylesheets for maximum flexibility:

```css
/* In CSS files */
.my-button {
  background-color: var(--paft-primary);
  color: white;
}

.my-button:hover {
  background-color: var(--paft-primary-dark);
}

/* Gradients */
.hero-section {
  background: var(--paft-gradient-primary);
}
```

### 2. Tailwind CSS Classes

Use the custom Tailwind classes defined in globals.css:

```jsx
// In React components
<button className="bg-paft-primary text-white hover:bg-paft-primary-dark">
  Click me
</button>

<div className="bg-paft-gradient text-white">
  Hero Section
</div>

<input className="border border-gray-300 focus:ring-2 ring-paft-primary" />
```

### 3. JavaScript Constants

Import and use color constants in JavaScript/TypeScript:

```typescript
import { PAFT_COLORS, getColor, getRgbaColor } from '@/lib/colors';

// Direct access
const primaryColor = PAFT_COLORS.primary.main; // '#06B6D4'

// Using helper functions
const primaryColor = getColor('primary.main'); // '#06B6D4'
const primaryWithOpacity = getRgbaColor('primary.main', 0.5); // 'rgba(6, 182, 212, 0.5)'
```

## Available Colors

### Primary Colors
- `--paft-primary` / `bg-paft-primary` / `text-paft-primary`
- `--paft-primary-light` / `bg-paft-primary-light` / `text-paft-primary-light`
- `--paft-primary-dark` / `bg-paft-primary-dark` / `text-paft-primary-dark`

### Secondary Colors
- `--paft-secondary` / `bg-paft-secondary` / `text-paft-secondary`
- `--paft-secondary-light` / `bg-paft-secondary-light` / `text-paft-secondary-light`
- `--paft-secondary-dark` / `bg-paft-secondary-dark` / `text-paft-secondary-dark`

### Gradients
- `--paft-gradient-primary` / `bg-paft-gradient`
- `--paft-gradient-light` / `bg-paft-gradient-light`

### Semantic Colors
- `--paft-success` (Green)
- `--paft-warning` (Amber)
- `--paft-error` (Red)

## Common Patterns

### Buttons
```jsx
// Primary button
<button className="bg-paft-primary text-white hover:bg-paft-primary-dark transition-colors">
  Primary Action
</button>

// Secondary button
<button className="border border-paft-primary text-paft-primary hover:bg-paft-primary hover:text-white transition-colors">
  Secondary Action
</button>

// Gradient button
<button className="bg-paft-gradient text-white hover:shadow-paft-primary transition-all">
  Gradient Button
</button>
```

### Form Inputs
```jsx
<input className="border border-gray-300 focus:outline-none focus:ring-2 ring-paft-primary" />
```

### Cards with Hover Effects
```jsx
<div className="bg-white border border-gray-200 hover:border-paft-primary hover:border-opacity-50 transition-colors">
  Card Content
</div>
```

### Icons and Accents
```jsx
<svg className="text-paft-primary">
  {/* SVG content */}
</svg>
```

## Best Practices

1. **Consistency**: Always use the defined color variables instead of hardcoded hex values
2. **Accessibility**: Ensure sufficient contrast ratios for text and backgrounds
3. **Hover States**: Use darker variants for hover states (e.g., `hover:bg-paft-primary-dark`)
4. **Focus States**: Use ring colors for focus states (e.g., `ring-paft-primary`)
5. **Gradients**: Use gradients sparingly for hero sections and special elements

## Updating Colors

To update the color scheme:

1. Modify the CSS variables in `src/app/globals.css`
2. Update the constants in `src/lib/colors.ts`
3. The changes will automatically apply across the entire application

## Migration from Static Colors

If you find any hardcoded colors in the codebase, replace them with variables:

```css
/* Before */
background-color: #06B6D4;

/* After */
background-color: var(--paft-primary);
```

```jsx
// Before
<div className="bg-cyan-600">

// After
<div className="bg-paft-primary">
```