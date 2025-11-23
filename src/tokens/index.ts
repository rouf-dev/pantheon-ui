import colors from './colors.json'
import typography from './typography.json'
import spacing from './spacing.json'
import shadows from './shadows.json'

// Type definitions for design tokens
export interface ColorToken {
  light: Record<string, string>
  dark: Record<string, string>
  semantic: {
    primary: { hex: string; hsl: string; description: string }
    success: { hex: string; hsl: string; description: string }
    warning: { hex: string; hsl: string; description: string }
    destructive: { hex: string; hsl: string; description: string }
  }
}

export interface TypographyToken {
  fontFamily: Record<string, string>
  fontSize: Record<string, string>
  fontWeight: Record<string, string>
  lineHeight: Record<string, string>
  letterSpacing: Record<string, string>
}

export interface SpacingToken {
  spacing: Record<string, string>
}

export interface ShadowToken {
  boxShadow: Record<string, string>
  dropShadow: Record<string, string>
}

// Typed exports
export const colorTokens = colors as ColorToken
export const typographyTokens = typography as TypographyToken
export const spacingTokens = spacing as SpacingToken
export const shadowTokens = shadows as ShadowToken

// Combined tokens export
export const tokens = {
  colors: colorTokens,
  typography: typographyTokens,
  spacing: spacingTokens,
  shadows: shadowTokens,
}

// Default export
export default tokens
