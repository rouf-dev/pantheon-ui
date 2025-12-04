"use client"

import * as React from "react"
import { useLocalStorage } from "../hooks/useLocalStorage"
import { useMediaQuery } from "../hooks/useMediaQuery"

// ============================================================================
// Types
// ============================================================================

export type ThemeMode = "light" | "dark" | "system"
export type ResolvedTheme = "light" | "dark"

/** HSL color value without the hsl() wrapper, e.g., "195 100% 47%" */
export type HSLValue = string

/** Complete color palette for a theme */
export interface ThemeColors {
  /** Main background color */
  background: HSLValue
  /** Main text color */
  foreground: HSLValue
  
  /** Card background */
  card: HSLValue
  /** Card text color */
  cardForeground: HSLValue
  
  /** Popover/dropdown background */
  popover: HSLValue
  /** Popover text color */
  popoverForeground: HSLValue
  
  /** Primary brand color */
  primary: HSLValue
  /** Text on primary color */
  primaryForeground: HSLValue
  
  /** Secondary/subtle actions */
  secondary: HSLValue
  /** Text on secondary */
  secondaryForeground: HSLValue
  
  /** Muted/disabled backgrounds */
  muted: HSLValue
  /** Muted text color */
  mutedForeground: HSLValue
  
  /** Accent/highlight color */
  accent: HSLValue
  /** Text on accent */
  accentForeground: HSLValue
  
  /** Success state color */
  success: HSLValue
  /** Text on success */
  successForeground: HSLValue
  
  /** Warning state color */
  warning: HSLValue
  /** Text on warning */
  warningForeground: HSLValue
  
  /** Destructive/error color */
  destructive: HSLValue
  /** Text on destructive */
  destructiveForeground: HSLValue
  
  /** Border color */
  border: HSLValue
  /** Input border color */
  input: HSLValue
  /** Focus ring color */
  ring: HSLValue
}

/** Complete theme definition */
export interface Theme {
  /** Theme display name */
  name: string
  /** Light mode colors */
  light: ThemeColors
  /** Dark mode colors */
  dark: ThemeColors
  /** Optional radius override (rem value, default: 0.5) */
  radius?: number
}

/** Partial theme colors for extension */
export type PartialThemeColors = Partial<ThemeColors>

/** Partial theme for extending base themes */
export interface PartialTheme {
  name?: string
  light?: PartialThemeColors
  dark?: PartialThemeColors
  radius?: number
}

export interface AccentColor {
  /** Display name for UI */
  name: string
  /** HSL values for the accent (without hsl() wrapper) */
  hsl: string
  /** Optional foreground color for contrast */
  foreground?: string
}

/** Built-in accent color presets */
export const accentPresets = {
  blue: { name: "Blue", hsl: "195 100% 47%", foreground: "0 0% 100%" },
  cyan: { name: "Cyan", hsl: "180 100% 40%", foreground: "0 0% 100%" },
  purple: { name: "Purple", hsl: "270 70% 55%", foreground: "0 0% 100%" },
  pink: { name: "Pink", hsl: "330 80% 55%", foreground: "0 0% 100%" },
  green: { name: "Green", hsl: "160 70% 40%", foreground: "0 0% 100%" },
  orange: { name: "Orange", hsl: "25 95% 55%", foreground: "0 0% 0%" },
  red: { name: "Red", hsl: "0 75% 55%", foreground: "0 0% 100%" },
} as const satisfies Record<string, AccentColor>

export type AccentPreset = keyof typeof accentPresets

// ============================================================================
// Built-in Theme Presets
// ============================================================================

/** Default Pantheon theme - blue-based design system */
export const defaultTheme: Theme = {
  name: "Pantheon",
  light: {
    background: "0 0% 100%",
    foreground: "199 34% 12%",
    card: "0 0% 100%",
    cardForeground: "199 34% 12%",
    popover: "0 0% 100%",
    popoverForeground: "199 34% 12%",
    primary: "195 100% 47%",
    primaryForeground: "0 0% 100%",
    secondary: "193 83% 88%",
    secondaryForeground: "195 46% 31%",
    muted: "210 40% 96%",
    mutedForeground: "195 18% 48%",
    accent: "193 100% 85%",
    accentForeground: "195 65% 27%",
    success: "180 70% 45%",
    successForeground: "0 0% 100%",
    warning: "45 95% 55%",
    warningForeground: "199 34% 12%",
    destructive: "10 80% 60%",
    destructiveForeground: "0 0% 100%",
    border: "210 31% 91%",
    input: "210 31% 91%",
    ring: "195 100% 47%",
  },
  dark: {
    background: "199 47% 9%",
    foreground: "195 83% 88%",
    card: "199 43% 11%",
    cardForeground: "195 83% 88%",
    popover: "199 43% 11%",
    popoverForeground: "195 83% 88%",
    primary: "195 100% 55%",
    primaryForeground: "199 47% 9%",
    secondary: "195 43% 22%",
    secondaryForeground: "195 83% 88%",
    muted: "195 43% 22%",
    mutedForeground: "195 26% 62%",
    accent: "195 43% 28%",
    accentForeground: "195 83% 88%",
    success: "180 60% 40%",
    successForeground: "195 83% 88%",
    warning: "45 85% 50%",
    warningForeground: "199 47% 9%",
    destructive: "10 70% 50%",
    destructiveForeground: "195 83% 88%",
    border: "195 43% 22%",
    input: "195 43% 22%",
    ring: "195 100% 55%",
  },
  radius: 0.5,
}

/** Slate theme - neutral gray tones */
export const slateTheme: Theme = {
  name: "Slate",
  light: {
    background: "0 0% 100%",
    foreground: "222 47% 11%",
    card: "0 0% 100%",
    cardForeground: "222 47% 11%",
    popover: "0 0% 100%",
    popoverForeground: "222 47% 11%",
    primary: "222 47% 11%",
    primaryForeground: "210 40% 98%",
    secondary: "210 40% 96%",
    secondaryForeground: "222 47% 11%",
    muted: "210 40% 96%",
    mutedForeground: "215 16% 47%",
    accent: "210 40% 96%",
    accentForeground: "222 47% 11%",
    success: "142 76% 36%",
    successForeground: "0 0% 100%",
    warning: "38 92% 50%",
    warningForeground: "0 0% 0%",
    destructive: "0 84% 60%",
    destructiveForeground: "0 0% 100%",
    border: "214 32% 91%",
    input: "214 32% 91%",
    ring: "222 47% 11%",
  },
  dark: {
    background: "222 47% 11%",
    foreground: "210 40% 98%",
    card: "222 47% 11%",
    cardForeground: "210 40% 98%",
    popover: "222 47% 11%",
    popoverForeground: "210 40% 98%",
    primary: "210 40% 98%",
    primaryForeground: "222 47% 11%",
    secondary: "217 33% 17%",
    secondaryForeground: "210 40% 98%",
    muted: "217 33% 17%",
    mutedForeground: "215 20% 65%",
    accent: "217 33% 17%",
    accentForeground: "210 40% 98%",
    success: "142 70% 45%",
    successForeground: "0 0% 100%",
    warning: "38 92% 50%",
    warningForeground: "0 0% 0%",
    destructive: "0 72% 51%",
    destructiveForeground: "0 0% 100%",
    border: "217 33% 17%",
    input: "217 33% 17%",
    ring: "212 100% 67%",
  },
  radius: 0.5,
}

/** Rose theme - warm pink/red tones */
export const roseTheme: Theme = {
  name: "Rose",
  light: {
    background: "0 0% 100%",
    foreground: "240 10% 4%",
    card: "0 0% 100%",
    cardForeground: "240 10% 4%",
    popover: "0 0% 100%",
    popoverForeground: "240 10% 4%",
    primary: "346 77% 50%",
    primaryForeground: "0 0% 100%",
    secondary: "340 30% 94%",
    secondaryForeground: "346 77% 40%",
    muted: "340 30% 94%",
    mutedForeground: "340 10% 45%",
    accent: "340 30% 94%",
    accentForeground: "346 77% 40%",
    success: "142 76% 36%",
    successForeground: "0 0% 100%",
    warning: "38 92% 50%",
    warningForeground: "0 0% 0%",
    destructive: "0 84% 60%",
    destructiveForeground: "0 0% 100%",
    border: "340 20% 90%",
    input: "340 20% 90%",
    ring: "346 77% 50%",
  },
  dark: {
    background: "340 30% 6%",
    foreground: "340 20% 95%",
    card: "340 30% 8%",
    cardForeground: "340 20% 95%",
    popover: "340 30% 8%",
    popoverForeground: "340 20% 95%",
    primary: "346 77% 55%",
    primaryForeground: "0 0% 100%",
    secondary: "340 30% 15%",
    secondaryForeground: "340 20% 95%",
    muted: "340 30% 15%",
    mutedForeground: "340 15% 60%",
    accent: "340 30% 20%",
    accentForeground: "340 20% 95%",
    success: "142 70% 45%",
    successForeground: "0 0% 100%",
    warning: "38 92% 50%",
    warningForeground: "0 0% 0%",
    destructive: "0 72% 51%",
    destructiveForeground: "0 0% 100%",
    border: "340 30% 18%",
    input: "340 30% 18%",
    ring: "346 77% 55%",
  },
  radius: 0.5,
}

/** All built-in theme presets */
export const themePresets = {
  pantheon: defaultTheme,
  slate: slateTheme,
  rose: roseTheme,
} as const

export type ThemePreset = keyof typeof themePresets

export interface ThemeConfig {
  /** Current theme mode (light/dark/system) */
  mode: ThemeMode
  /** Current accent color (legacy, for accent-only customization) */
  accent: AccentColor
  /** Custom radius multiplier (0.5-2.0, default 1.0) */
  radius?: number
  /** Custom theme (overrides accent when set) */
  customTheme?: Theme | null
}

export interface ThemeContextValue {
  /** Current theme mode setting */
  mode: ThemeMode
  /** Resolved theme after system preference applied */
  resolvedTheme: ResolvedTheme
  /** Current accent color */
  accent: AccentColor
  /** Current radius multiplier */
  radius: number
  /** Is the resolved theme dark? */
  isDark: boolean
  /** Current theme (full theme object) */
  theme: Theme
  /** Current resolved colors based on mode */
  colors: ThemeColors
  /** Set theme mode */
  setMode: (mode: ThemeMode) => void
  /** Set accent color (quick accent change without full theme) */
  setAccent: (accent: AccentColor | AccentPreset) => void
  /** Set radius multiplier */
  setRadius: (radius: number) => void
  /** Set a complete custom theme */
  setTheme: (theme: Theme | ThemePreset | null) => void
  /** Extend current theme with partial overrides */
  extendTheme: (overrides: PartialTheme) => void
  /** Reset to default theme */
  reset: () => void
}

export interface ThemeProviderProps {
  children: React.ReactNode
  /** Default theme mode (default: "system") */
  defaultMode?: ThemeMode
  /** Default accent color for quick customization (default: "blue") */
  defaultAccent?: AccentColor | AccentPreset
  /** Default radius multiplier (default: 1.0) */
  defaultRadius?: number
  /** Custom theme to use (overrides accent) */
  theme?: Theme | ThemePreset
  /** Storage key for persistence (default: "pantheon-theme") */
  storageKey?: string
  /** Disable persistence to localStorage */
  disableStorage?: boolean
  /** CSS selector to apply theme class (default: ":root") */
  attribute?: string
}

// ============================================================================
// Context
// ============================================================================

const ThemeContext = React.createContext<ThemeContextValue | null>(null)

// ============================================================================
// Provider
// ============================================================================

const DEFAULT_ACCENT = accentPresets.blue
const DEFAULT_MODE: ThemeMode = "system"
const DEFAULT_RADIUS = 1.0

/**
 * Theme provider for Pantheon UI components.
 * Manages dark/light mode, accent colors, and CSS variables.
 * 
 * @example
 * ```tsx
 * // Basic usage
 * <ThemeProvider>
 *   <App />
 * </ThemeProvider>
 * 
 * // With defaults
 * <ThemeProvider
 *   defaultMode="dark"
 *   defaultAccent="purple"
 *   defaultRadius={1.2}
 * >
 *   <App />
 * </ThemeProvider>
 * 
 * // Disable persistence
 * <ThemeProvider disableStorage>
 *   <App />
 * </ThemeProvider>
 * 
 * // With custom theme
 * <ThemeProvider theme={myCustomTheme}>
 *   <App />
 * </ThemeProvider>
 * 
 * // With preset theme
 * <ThemeProvider theme="rose">
 *   <App />
 * </ThemeProvider>
 * ```
 */
export function ThemeProvider({
  children,
  defaultMode = DEFAULT_MODE,
  defaultAccent = DEFAULT_ACCENT,
  defaultRadius = DEFAULT_RADIUS,
  theme: themeProp,
  storageKey = "pantheon-theme",
  disableStorage = false,
  attribute = ":root",
}: ThemeProviderProps) {
  // Resolve default accent if it's a preset key
  const resolvedDefaultAccent = typeof defaultAccent === "string"
    ? accentPresets[defaultAccent]
    : defaultAccent

  // Resolve theme prop if it's a preset key
  const resolvedThemeProp = typeof themeProp === "string"
    ? themePresets[themeProp]
    : themeProp

  // Theme state with optional persistence
  const [config, setConfig] = disableStorage
    ? React.useState<ThemeConfig>({
        mode: defaultMode,
        accent: resolvedDefaultAccent,
        radius: defaultRadius,
        customTheme: resolvedThemeProp ?? null,
      })
    : useLocalStorage<ThemeConfig>(storageKey, {
        mode: defaultMode,
        accent: resolvedDefaultAccent,
        radius: defaultRadius,
        customTheme: resolvedThemeProp ?? null,
      })

  // Detect system preference
  const prefersDark = useMediaQuery("(prefers-color-scheme: dark)")

  // Resolve actual theme mode (light/dark)
  const resolvedTheme: ResolvedTheme = React.useMemo(() => {
    if (config.mode === "system") {
      return prefersDark ? "dark" : "light"
    }
    return config.mode
  }, [config.mode, prefersDark])

  // Get the current theme object
  const currentTheme: Theme = React.useMemo(() => {
    if (config.customTheme) {
      return config.customTheme
    }
    // If no custom theme, create one from accent color
    return {
      ...defaultTheme,
      name: config.accent.name,
      light: {
        ...defaultTheme.light,
        primary: config.accent.hsl,
        primaryForeground: config.accent.foreground ?? "0 0% 100%",
        ring: config.accent.hsl,
      },
      dark: {
        ...defaultTheme.dark,
        primary: config.accent.hsl,
        primaryForeground: config.accent.foreground ?? "0 0% 100%",
        ring: config.accent.hsl,
      },
    }
  }, [config.customTheme, config.accent])

  // Get resolved colors based on current mode
  const currentColors: ThemeColors = React.useMemo(() => {
    return resolvedTheme === "dark" ? currentTheme.dark : currentTheme.light
  }, [currentTheme, resolvedTheme])

  // Apply theme to DOM
  React.useEffect(() => {
    const root = document.querySelector(attribute)
    if (!root) return

    // Apply dark class
    if (resolvedTheme === "dark") {
      root.classList.add("dark")
    } else {
      root.classList.remove("dark")
    }

    // Apply CSS variables
    const style = root instanceof HTMLElement ? root.style : null
    if (style) {
      // Apply all theme colors as CSS variables
      const colors = currentColors
      style.setProperty("--background", colors.background)
      style.setProperty("--foreground", colors.foreground)
      style.setProperty("--card", colors.card)
      style.setProperty("--card-foreground", colors.cardForeground)
      style.setProperty("--popover", colors.popover)
      style.setProperty("--popover-foreground", colors.popoverForeground)
      style.setProperty("--primary", colors.primary)
      style.setProperty("--primary-foreground", colors.primaryForeground)
      style.setProperty("--secondary", colors.secondary)
      style.setProperty("--secondary-foreground", colors.secondaryForeground)
      style.setProperty("--muted", colors.muted)
      style.setProperty("--muted-foreground", colors.mutedForeground)
      style.setProperty("--accent", colors.accent)
      style.setProperty("--accent-foreground", colors.accentForeground)
      style.setProperty("--success", colors.success)
      style.setProperty("--success-foreground", colors.successForeground)
      style.setProperty("--warning", colors.warning)
      style.setProperty("--warning-foreground", colors.warningForeground)
      style.setProperty("--destructive", colors.destructive)
      style.setProperty("--destructive-foreground", colors.destructiveForeground)
      style.setProperty("--border", colors.border)
      style.setProperty("--input", colors.input)
      style.setProperty("--ring", colors.ring)
      
      // Apply radius
      const radius = config.radius ?? currentTheme.radius ?? DEFAULT_RADIUS
      style.setProperty("--radius", `${radius}rem`)
    }
  }, [resolvedTheme, currentColors, currentTheme, config.radius, attribute])

  // Context value
  const contextValue = React.useMemo<ThemeContextValue>(() => ({
    mode: config.mode,
    resolvedTheme,
    accent: config.accent,
    radius: config.radius ?? DEFAULT_RADIUS,
    isDark: resolvedTheme === "dark",
    theme: currentTheme,
    colors: currentColors,
    setMode: (mode) => setConfig((prev) => ({ ...prev, mode })),
    setAccent: (accent) => {
      const resolved = typeof accent === "string" ? accentPresets[accent] : accent
      // Clear custom theme when setting accent (use accent-based theme)
      setConfig((prev) => ({ ...prev, accent: resolved, customTheme: null }))
    },
    setRadius: (radius) => {
      const clamped = Math.max(0.5, Math.min(2.0, radius))
      setConfig((prev) => ({ ...prev, radius: clamped }))
    },
    setTheme: (theme) => {
      if (theme === null) {
        // Reset to accent-based theme
        setConfig((prev) => ({ ...prev, customTheme: null }))
      } else {
        const resolved = typeof theme === "string" ? themePresets[theme] : theme
        setConfig((prev) => ({ ...prev, customTheme: resolved }))
      }
    },
    extendTheme: (overrides) => {
      setConfig((prev) => {
        const baseTheme = prev.customTheme ?? currentTheme
        return {
          ...prev,
          customTheme: {
            name: overrides.name ?? baseTheme.name,
            light: { ...baseTheme.light, ...overrides.light },
            dark: { ...baseTheme.dark, ...overrides.dark },
            radius: overrides.radius ?? baseTheme.radius,
          },
        }
      })
    },
    reset: () => setConfig({
      mode: defaultMode,
      accent: resolvedDefaultAccent,
      radius: defaultRadius,
      customTheme: resolvedThemeProp ?? null,
    }),
  }), [config, resolvedTheme, currentTheme, currentColors, defaultMode, resolvedDefaultAccent, defaultRadius, resolvedThemeProp, setConfig])

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  )
}

// ============================================================================
// Hook
// ============================================================================

/**
 * Hook to access theme context.
 * Must be used within a ThemeProvider.
 * 
 * @example
 * ```tsx
 * function ThemeToggle() {
 *   const { mode, setMode, isDark } = useTheme()
 *   
 *   return (
 *     <Button onClick={() => setMode(isDark ? 'light' : 'dark')}>
 *       {isDark ? '☀️' : '🌙'}
 *     </Button>
 *   )
 * }
 * 
 * function AccentPicker() {
 *   const { accent, setAccent } = useTheme()
 *   
 *   return (
 *     <div className="flex gap-2">
 *       {Object.entries(accentPresets).map(([key, color]) => (
 *         <button
 *           key={key}
 *           onClick={() => setAccent(key as AccentPreset)}
 *           style={{ background: `hsl(${color.hsl})` }}
 *           className={accent.name === color.name ? 'ring-2' : ''}
 *         />
 *       ))}
 *     </div>
 *   )
 * }
 * ```
 */
export function useTheme(): ThemeContextValue {
  const context = React.useContext(ThemeContext)
  
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  
  return context
}

/**
 * Optional hook that returns null if not within ThemeProvider.
 * Useful for components that work with or without theming.
 */
export function useThemeOptional(): ThemeContextValue | null {
  return React.useContext(ThemeContext)
}
