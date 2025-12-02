/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
          // Blue scale from your palette
          50: '#e1f8ff',   // Lightest blue
          100: '#c1e3f0',  // Light :hover
          200: '#93d3ec',  // Light :active
          300: '#4bb8e8',  // Normal :hover
          400: '#00b3f2',  // Normal (your signature blue)
          500: '#009fc9',  // Normal :active
          600: '#0086a8',  // Dark
          700: '#006f8b',  // Dark :hover
          800: '#00566a',  // Dark :active
          900: '#134455',  // Darker
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        success: {
          DEFAULT: 'hsl(var(--success))',
          foreground: 'hsl(var(--success-foreground))',
        },
        warning: {
          DEFAULT: 'hsl(var(--warning))',
          foreground: 'hsl(var(--warning-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        // Glass effects - blue-tinted for your brand
        glass: {
          light: 'rgba(193, 227, 240, 0.1)',   // Blue-tinted light
          medium: 'rgba(147, 211, 236, 0.15)',  // Blue-tinted medium
          heavy: 'rgba(75, 184, 232, 0.2)',     // Blue-tinted heavy
          dark: 'rgba(19, 68, 85, 0.3)',        // Dark blue glass
        }
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      backdropBlur: {
        glass: '10px',
      },
      spacing: {
        // Compact spacing (4px base)
        '1': '4px',
        '2': '8px',
        '3': '12px',
        '4': '16px',
        '6': '24px',
      }
    },
  },
  plugins: [require('tailwindcss-animate')],
}
