"use client"

import * as React from "react"

/**
 * Hook for responsive breakpoint detection.
 * SSR-safe - returns false on server, then hydrates correctly.
 * 
 * @param query - CSS media query string
 * @returns boolean indicating if the media query matches
 * 
 * @example
 * ```tsx
 * // Check if mobile
 * const isMobile = useMediaQuery('(max-width: 768px)')
 * 
 * // Check if user prefers dark mode
 * const prefersDark = useMediaQuery('(prefers-color-scheme: dark)')
 * 
 * // Check if device supports hover
 * const canHover = useMediaQuery('(hover: hover)')
 * 
 * // Responsive rendering
 * if (isMobile) {
 *   return <MobileNav />
 * }
 * return <DesktopNav />
 * ```
 */
export function useMediaQuery(query: string): boolean {
  // Default to false for SSR
  const [matches, setMatches] = React.useState(false)
  
  React.useEffect(() => {
    // Check if window is available (client-side)
    if (typeof window === "undefined") return
    
    const mediaQuery = window.matchMedia(query)
    
    // Set initial value
    setMatches(mediaQuery.matches)
    
    // Create listener
    const handler = (event: MediaQueryListEvent) => {
      setMatches(event.matches)
    }
    
    // Add listener (using modern API with fallback)
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handler)
    } else {
      // Fallback for older browsers
      mediaQuery.addListener(handler)
    }
    
    // Cleanup
    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener("change", handler)
      } else {
        mediaQuery.removeListener(handler)
      }
    }
  }, [query])
  
  return matches
}

/**
 * Preset breakpoints matching Tailwind CSS defaults
 */
export const breakpoints = {
  sm: "(min-width: 640px)",
  md: "(min-width: 768px)",
  lg: "(min-width: 1024px)",
  xl: "(min-width: 1280px)",
  "2xl": "(min-width: 1536px)",
} as const

/**
 * Return type for useBreakpoints hook
 */
export interface UseBreakpointsReturn {
  sm: boolean
  md: boolean
  lg: boolean
  xl: boolean
  "2xl": boolean
  isMobile: boolean
  isTablet: boolean
  isDesktop: boolean
}

/**
 * Hook with preset Tailwind breakpoints
 * 
 * @example
 * ```tsx
 * const { isMobile, isTablet, isDesktop } = useBreakpoints()
 * ```
 */
export function useBreakpoints(): UseBreakpointsReturn {
  const sm = useMediaQuery(breakpoints.sm)
  const md = useMediaQuery(breakpoints.md)
  const lg = useMediaQuery(breakpoints.lg)
  const xl = useMediaQuery(breakpoints.xl)
  const xxl = useMediaQuery(breakpoints["2xl"])
  
  return {
    sm,
    md,
    lg,
    xl,
    "2xl": xxl,
    // Convenience aliases
    isMobile: !sm,        // < 640px
    isTablet: sm && !lg,  // 640px - 1023px
    isDesktop: lg,        // >= 1024px
  }
}
