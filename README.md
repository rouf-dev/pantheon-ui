# @pantheon/pantheon-ui

**Universal Design System for the Pantheon Architecture**

A React component library built with Tailwind CSS and Shadcn/ui, providing the foundational UI elements for all applications within the Pantheon ecosystem.

## 🎯 Concept

Pantheon UI is the **universal design system** that serves as the raw material for building all Pantheon applications. Just as the primordial elements existed before the gods themselves, Pantheon UI provides the fundamental components and design tokens that every god (application) can use to build consistent, accessible, and beautiful user interfaces.

### Structure

```
@rouf-dev/pantheon-ui
├── Adamas (Design Tokens)     ← Raw materials: colors, typography, spacing
└── Tektōn (Components)        ← Finished elements: buttons, cards, forms
```

**Philosophy:**
- **Universal:** Works across all Pantheons (Roman, Egyptian, Norse, etc.)
- **Consistent:** Ensures visual coherence across the entire ecosystem
- **Simple:** Clean, blue-based color palette that's never flashy
- **Modern:** Glass effects, smooth animations, and contemporary patterns

## 📦 Installation

```bash
npm install @rouf-dev/pantheon-ui
```

## 🚀 Setup

### 1. Install peer dependencies

```bash
npm install react react-dom tailwindcss
```

### 2. Configure Tailwind

Add Pantheon UI to your `tailwind.config.js`:

```javascript
module.exports = {
  content: [
    './src/**/*.{ts,tsx}',
    './node_modules/@pantheon/pantheon-ui/dist/**/*.js'
  ],
  theme: {
    extend: {
      colors: {
        // Pantheon UI provides these automatically via CSS variables
        primary: 'hsl(var(--primary))',
        secondary: 'hsl(var(--secondary))',
        // ... and more
      }
    }
  }
}
```

### 3. Import styles

```tsx
import '@pantheon/pantheon-ui/styles'
```

## 💡 Usage

### Basic Components

```tsx
import { Button, Card, CardHeader, CardTitle, CardContent, Input } from '@pantheon/pantheon-ui'

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
import { Typography } from '@pantheon/pantheon-ui'

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
import { Navigation } from '@pantheon/pantheon-ui'

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
import { GlassCard } from '@pantheon/pantheon-ui'

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
import { ColorPalette } from '@pantheon/pantheon-ui'

function StyleGuide() {
  const colors = [
    { name: 'Primary', value: 'hsl(195, 100%, 47%)', description: 'Main brand color' },
    { name: 'Success', value: 'hsl(180, 70%, 45%)', description: 'Teal-blue for success' },
    // ... more colors
  ]

  return <ColorPalette colors={colors} columns={4} />
}
```

## 🎨 Available Components

### Core UI Components (Tektōn)
- **`Button`** - Primary, secondary, success, warning, destructive, ghost, link variants
- **`Card`** - Container with header, content, footer subcomponents
- **`Input`** - Text input with validation states
- **`Dialog`** - Modal dialog component
- **`Select`** - Dropdown select with Radix UI
- **`Table`** - Data table with header, body, row, cell components
- **`Typography`** - H1-H4, paragraph, lead, muted, code variants
- **`Navigation`** - Navbar with logo, items, and actions
- **`ColorPalette`** - Design system color showcase

### Glass Components
- **`GlassCard`** - Card with glassmorphism effect (light, medium, heavy intensities)
- **`GlassModal`** - Modal with blue-tinted glass backdrop

### Utilities
- **`cn`** - Class name merger (uses clsx + tailwind-merge)

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

## 🎨 Design Tokens (Adamas)

### Color System

Pantheon UI uses a **blue-based color palette** designed for professional, non-flashy applications:

- **Primary**: `hsl(195, 100%, 47%)` - Signature cyan-blue (#00b3f2)
- **Secondary**: `hsl(193, 83%, 88%)` - Light blue for subtle actions
- **Success**: `hsl(180, 70%, 45%)` - Teal-blue for success states
- **Warning**: `hsl(45, 95%, 55%)` - Warm yellow (not aggressive)
- **Destructive**: `hsl(10, 80%, 60%)` - Soft coral (lighter red)

All colors are accessible via CSS variables:
```css
var(--primary)
var(--secondary)
var(--success)
var(--warning)
var(--destructive)
```

### Blue Scale (50-900)

The primary color has a full scale for fine-grained control:
- `primary-50` to `primary-100`: Light blues for backgrounds
- `primary-400`: Main brand color
- `primary-600` to `primary-900`: Dark blues for depth

### Glass Effects

Blue-tinted glass colors for modern transparency:
```
bg-glass-light   - Subtle blue transparency
bg-glass-medium  - Balanced blue glass
bg-glass-heavy   - Rich blue frost
bg-glass-dark    - Deep blue overlay
```

## 🌗 Dark Mode

Pantheon UI includes dark mode support with deep blue tones:

```tsx
// Automatically switches based on system preference
// Or manually toggle with a class on <html>:
<html className="dark">
```

Dark mode uses:
- Background: Deep blue (#092b3a)
- Foreground: Light blue-gray
- All semantic colors adjusted for proper contrast

## ⚡ Performance

- **Tree-shakeable**: Only import what you use
- **Optimized glass effects**: Native CSS `backdrop-filter` with 12-24px blur
- **Zero runtime CSS-in-JS**: Pure Tailwind CSS compilation
- **TypeScript**: Full type safety with `.d.ts` exports

## 🔧 TypeScript Support

Pantheon UI is written in TypeScript and exports full type definitions:

```tsx
import type { ButtonProps, TypographyProps } from '@pantheon/pantheon-ui'

const CustomButton: React.FC<ButtonProps> = (props) => {
  return <Button {...props} />
}
```

## 🏛️ Design Philosophy

Pantheon UI embodies these principles:

1. **Simple, Not Flashy**: Clean blue palette, no overwhelming colors
2. **Cool & Animatable**: Smooth transitions, glass effects, modern aesthetics
3. **Universal Foundation**: Works for HR (Jupiter), Finance (Osiris), Infrastructure (Yggdrasil)
4. **Professional**: Enterprise-grade accessibility and design patterns
5. **Consistent**: Same components across all Pantheons

## 📦 What's Included

When you install `@pantheon/pantheon-ui`, you get:

```
dist/
├── pantheon-ui.es.js       # ESM bundle
├── pantheon-ui.cjs.js      # CommonJS bundle
├── index.d.ts              # TypeScript definitions
└── style.css               # Global styles & CSS variables
```

## 🔗 Part of Pantheon Architecture

Pantheon UI is **Pillar 2** of the Pantheon Architecture:

1. **Akashic** - Concept & Idea Management
2. **Pantheon UI** - Design System (you are here)
3. **The Vault** - Code Repositories

Learn more: [Pantheon Architecture Documentation](https://github.com/rouf-dev/private-md-concept)

## 📄 License

MIT

---

Built with ❤️ for the Pantheon ecosystem
