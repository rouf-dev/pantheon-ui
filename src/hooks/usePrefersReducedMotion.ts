"use client"

import * as React from "react"

/**
 * Hook to detect if user prefers reduced motion.
 * Essential for accessibility - respects user's system preferences.
 * 
 * @example
 * ```tsx
 * // Basic usage
 * const prefersReducedMotion = usePrefersReducedMotion()
 * 
 * // Conditionally apply animations
 * <motion.div
 *   animate={prefersReducedMotion ? {} : { scale: 1.1 }}
 * />
 * 
 * // With motion system
 * import { fade, slide } from '@rouf-dev/pantheon-ui'
 * 
 * const prefersReducedMotion = usePrefersReducedMotion()
 * const variants = prefersReducedMotion ? fade : slide.up
 * 
 * // Skip animations entirely
 * if (prefersReducedMotion) {
 *   return <div>Static content</div>
 * }
 * ```
 */
export function usePrefersReducedMotion(): boolean {
  // Default to true (no motion) for SSR safety
  const [prefersReducedMotion, setPrefersReducedMotion] = React.useState(true)
  
  React.useEffect(() => {
    // Check for matchMedia support
    if (typeof window === "undefined" || !window.matchMedia) {
      return
    }
    
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    
    // Set initial value
    setPrefersReducedMotion(mediaQuery.matches)
    
    // Listen for changes
    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches)
    }
    
    // Modern browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleChange)
      return () => mediaQuery.removeEventListener("change", handleChange)
    }
    
    // Legacy browsers (Safari < 14)
    mediaQuery.addListener(handleChange)
    return () => mediaQuery.removeListener(handleChange)
  }, [])
  
  return prefersReducedMotion
}

/**
 * Returns animation props based on reduced motion preference.
 * Convenience wrapper for motion components.
 * 
 * @example
 * ```tsx
 * const motionProps = useReducedMotionProps({
 *   animate: { scale: 1.1, opacity: 1 },
 *   transition: { duration: 0.3 },
 * })
 * 
 * // motionProps will be:
 * // - Full animation if motion is allowed
 * // - { animate: {}, transition: { duration: 0 } } if reduced motion
 * 
 * <motion.div {...motionProps} />
 * ```
 */
export function useReducedMotionProps<T extends Record<string, unknown>>(
  animationProps: T
): T | { animate: Record<string, never>; transition: { duration: 0 } } {
  const prefersReducedMotion = usePrefersReducedMotion()
  
  if (prefersReducedMotion) {
    return {
      animate: {},
      transition: { duration: 0 },
    }
  }
  
  return animationProps
}

/**
 * Returns value based on reduced motion preference.
 * Generic helper for conditional values.
 * 
 * @example
 * ```tsx
 * // Return different values based on preference
 * const variant = useMotionValue(
 *   'slide',      // Value when motion is allowed
 *   'fade'        // Value when reduced motion preferred
 * )
 * 
 * // Use with numbers
 * const duration = useMotionValue(0.5, 0)
 * ```
 */
export function useMotionValue<T>(
  motionValue: T,
  reducedMotionValue: T
): T {
  const prefersReducedMotion = usePrefersReducedMotion()
  return prefersReducedMotion ? reducedMotionValue : motionValue
}
