# @rouf-dev/pantheon-ui

**Universal Design System for the Pantheon Architecture**

A modern React component library built with TypeScript, Tailwind CSS v4, and Radix UI primitives. Provides the foundational UI components and design tokens for all applications within the Pantheon ecosystem.

**Version:** 1.0.0  
**Published:** November 23, 2025  
**Repository:** [github.com/rouf-dev/pantheon-ui](https://github.com/rouf-dev/pantheon-ui)

## 🎯 Philosophy

Pantheon UI serves as **Pillar 2** of the Pantheon Architecture - the universal design system that provides raw materials for building consistent, accessible, and beautiful interfaces across all Pantheon applications.

**Design Principles:**
- **Universal:** Works across all Pantheons (Roman, Egyptian, Norse, etc.)
- **Consistent:** Ensures visual coherence across the entire ecosystem
- **Simple, Not Flashy:** Clean blue palette, professional and modern
- **Information-Dense:** Enterprise-grade components with glassmorphism

## ✨ Features

- 🎨 **Blue-based color palette** - Professional, non-flashy design system
- 🪟 **Glassmorphism effects** - Blue-tinted transparency with backdrop blur
- 🎯 **TypeScript support** - Full type definitions included
- ♿ **Accessible components** - Built on Radix UI primitives
- 📦 **Tree-shakeable** - ESM + CommonJS builds
- 🌗 **Dark mode ready** - Deep blue theme for dark environments
- ⚡ **Tailwind CSS v4** - Modern utility-first styling

## 📦 Installation

```bash
npm install @rouf-dev/pantheon-ui
```

## 🚀 Quick Start

### 1. Install

```bash
npm install @rouf-dev/pantheon-ui
# or
pnpm add @rouf-dev/pantheon-ui
```

**Peer Dependencies:**
```bash
npm install react react-dom tailwindcss
```

### 2. Configure Tailwind CSS

```javascript
// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{ts,tsx}',
    './node_modules/@rouf-dev/pantheon-ui/dist/**/*.js'
  ],
  // Pantheon UI uses CSS variables for colors
  // No additional theme config needed
}
```

### 3. Import Styles

```tsx
// In your app entry point (e.g., main.tsx or App.tsx)
import '@rouf-dev/pantheon-ui/styles'
```

## 💡 Usage

### Basic Components

```tsx
import { Button, Card, CardHeader, CardTitle, CardContent, Input } from '@rouf-dev/pantheon-ui'

function JupiterApp() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Employee Management</CardTitle>
      </CardHeader>
      <CardContent>
        <Input placeholder="Search employees..." />
        <Button>Add Employee</Button>
      </CardContent>
    </Card>
  )
}
```

### Typography System

```tsx
import { Typography } from '@rouf-dev/pantheon-ui'

function Page() {
  return (
    <>
      <Typography variant="h1">Main Heading</Typography>
      <Typography variant="lead">
        This is a lead paragraph with larger text
      </Typography>
      <Typography variant="p">Regular body text</Typography>
      <Typography variant="muted">Subtle helper text</Typography>
    </>
  )
}
```

### Navigation

```tsx
import { Navigation } from '@rouf-dev/pantheon-ui'

function App() {
  const navItems = [
    { label: 'Dashboard', onClick: () => {}, active: true },
    { label: 'Projects', onClick: () => {} },
    { label: 'Settings', onClick: () => {} },
  ]

  return (
    <Navigation
      variant="glass"
      logo={<span>🏛️ Jupiter</span>}
      items={navItems}
      actions={<Button>Sign Out</Button>}
    />
  )
}
```

### Glass Components

```tsx
import { GlassCard } from '@rouf-dev/pantheon-ui'

function Dashboard() {
  return (
    <div className="bg-gradient-to-br from-primary-50 to-primary-100">
      <GlassCard intensity="medium">
        <h2>Glassmorphic Dashboard</h2>
        <p>Modern, elegant design with blue-tinted transparency</p>
      </GlassCard>
    </div>
  )
}
```

### Color Palette Display

```tsx
import { ColorPalette } from '@rouf-dev/pantheon-ui'

function StyleGuide() {
  const colors = [
    { name: 'Primary', value: 'hsl(195, 100%, 47%)', description: 'Main brand color' },
    { name: 'Success', value: 'hsl(180, 70%, 45%)', description: 'Teal-blue for success' },
    // ... more colors
  ]

  return <ColorPalette colors={colors} columns={4} />
}
```

## 📦 Component Catalog

### UI Components
- **`Button`** - 8 variants (default, secondary, outline, ghost, link, destructive, success, warning) + 5 sizes
- **`Card`** - Container with `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`
- **`Input`** - Form input with label integration
- **`Dialog`** - Modal with `DialogTrigger`, `DialogContent`, `DialogHeader`, `DialogTitle`, `DialogDescription`, `DialogFooter`
- **`Select`** - Accessible dropdown with `SelectTrigger`, `SelectContent`, `SelectItem` (Radix UI)
- **`Table`** - Data table with `TableHeader`, `TableBody`, `TableRow`, `TableHead`, `TableCell`
- **`Typography`** - 9 semantic variants (h1-h4, p, lead, large, small, muted, code)
- **`Navigation`** - Navbar with logo slot, menu items, and action slots (default/glass variants)
- **`ColorPalette`** - Design token display with swatches

### Glass Components
- **`GlassCard`** - Glassmorphism card (light/medium/heavy intensity)
- **`GlassModal`** - Dialog with blue-tinted glass backdrop

### Utilities
- **`cn`** - Class name utility (clsx + tailwind-merge)

## 📖 Component Props

### Button Variants

```tsx
<Button variant="default">Primary Action</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="success">Approve</Button>
<Button variant="warning">Review</Button>
<Button variant="destructive">Delete</Button>
<Button variant="outline">Cancel</Button>
<Button variant="ghost">Subtle</Button>
<Button variant="link">Learn More</Button>
```

### Button Sizes

```tsx
<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
<Button size="xl">Extra Large</Button>
<Button size="icon">🔥</Button>
```

### Typography Variants

```tsx
<Typography variant="h1">Heading 1</Typography>
<Typography variant="h2">Heading 2</Typography>
<Typography variant="h3">Heading 3</Typography>
<Typography variant="h4">Heading 4</Typography>
<Typography variant="p">Paragraph</Typography>
<Typography variant="lead">Lead text (larger)</Typography>
<Typography variant="large">Large text</Typography>
<Typography variant="small">Small text</Typography>
<Typography variant="muted">Muted text</Typography>
<Typography variant="code">const code = true</Typography>
```

### GlassCard

```tsx
<GlassCard 
  intensity="light" | "medium" | "heavy"  // Default: "medium"
  className="custom-classes"
>
  Content with blue-tinted transparency
</GlassCard>
```

### Navigation

```tsx
<Navigation
  variant="default" | "glass"
  logo={<ReactNode>}
  items={[
    { label: string, href?: string, onClick?: () => void, active?: boolean }
  ]}
  actions={<ReactNode>}
/>
```

## 🎨 Design System

### Color Palette

**Primary Color:** `hsl(195, 100%, 47%)` - Cyan-blue (#00b3f2)

**Semantic Colors:**
- **Success:** `hsl(180, 70%, 45%)` - Teal-blue
- **Warning:** `hsl(45, 95%, 55%)` - Warm yellow
- **Destructive:** `hsl(10, 80%, 60%)` - Soft coral

**Neutrals:**
- Background: White / Deep blue (dark mode)
- Foreground: Dark blue-gray / Off-white (dark mode)
- Muted: Light blue-gray backgrounds

All colors use CSS custom properties:
```css
var(--primary)
var(--success)
var(--warning)
var(--destructive)
var(--background)
var(--foreground)
var(--muted)
```

### Glassmorphism

Blue-tinted transparency with backdrop blur:
- **Light:** `rgba(240, 248, 255, 0.4)` + 12px blur
- **Medium:** `rgba(240, 248, 255, 0.6)` + 16px blur  
- **Heavy:** `rgba(240, 248, 255, 0.8)` + 24px blur

## 🌗 Dark Mode

Toggle dark mode by adding the `dark` class to your root element:

```tsx
<html className="dark">
  {/* Your app */}
</html>
```

Dark mode colors automatically use deep blue tones for backgrounds and adjusted contrast for all semantic colors.

## ⚡ Technical Details

**Build Output:**
```
dist/
├── pantheon-ui.es.js       # ESM bundle
├── pantheon-ui.cjs.js      # CommonJS bundle
├── index.d.ts              # TypeScript definitions
└── style.css               # Global styles & CSS variables
```

**Features:**
- Tree-shakeable ESM/CommonJS exports
- Native CSS `backdrop-filter` for glass effects
- Zero runtime CSS-in-JS
- Full TypeScript type definitions
- Radix UI accessibility primitives

## 🔧 TypeScript

All components include full type definitions:

```tsx
import type { ButtonProps, TypographyProps } from '@rouf-dev/pantheon-ui'

const CustomButton: React.FC<ButtonProps> = (props) => {
  return <Button {...props} />
}
```

## 🚀 Tech Stack

- **React:** 18+ (dev: 19.2.0)
- **TypeScript:** 5.9+
- **Tailwind CSS:** v4.1.17
- **Build Tool:** Vite 7.2.4
- **UI Primitives:** Radix UI (@radix-ui/react-*)
- **Utilities:** class-variance-authority, clsx, tailwind-merge, lucide-react

## 🏛️ Pantheon Architecture

Pantheon UI is **Pillar 2** of the Pantheon Architecture:

1. **Akashic** - Concept & Idea Management
2. **Pantheon UI** - Universal Design System (you are here)
3. **The Vault** - Code Repositories & Implementation

This design system provides the foundational components and visual language used across all Pantheon applications, ensuring consistency and coherence throughout the ecosystem.

## 📄 License

MIT

---

**Package:** [@rouf-dev/pantheon-ui](https://www.npmjs.com/package/@rouf-dev/pantheon-ui)  
**Repository:** [github.com/rouf-dev/pantheon-ui](https://github.com/rouf-dev/pantheon-ui)  
**Version:** 1.0.0  

Built with ❤️ for the Pantheon ecosystem
