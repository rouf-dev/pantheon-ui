/**
 * Pantheon Motion System - Core
 * 
 * Transition presets and base animation variants.
 * These are the foundational building blocks used by all other animations.
 */

import type { Transition, Variants } from "motion/react"

/* =============================================================================
   TRANSITION PRESETS
   ============================================================================= */

/**
 * Spring configurations for different animation feels
 */
export const springs = {
  /** Snappy, responsive - for buttons, toggles */
  snappy: { type: "spring", stiffness: 400, damping: 30 } as const,
  
  /** Smooth, elegant - for modals, dialogs */
  smooth: { type: "spring", stiffness: 300, damping: 30 } as const,
  
  /** Gentle, settling - for cards, panels */
  gentle: { type: "spring", stiffness: 200, damping: 25 } as const,
  
  /** Bouncy, playful - for notifications, badges */
  bouncy: { type: "spring", stiffness: 400, damping: 15 } as const,
  
  /** Soft, flowing - for page transitions */
  soft: { type: "spring", stiffness: 100, damping: 20 } as const,
} satisfies Record<string, Transition>

/**
 * Tween (easing) configurations
 */
export const tweens = {
  /** Fast micro-interaction */
  fast: { type: "tween", duration: 0.15, ease: [0.25, 0.1, 0.25, 1] } as const,
  
  /** Normal transition */
  normal: { type: "tween", duration: 0.25, ease: [0.25, 0.1, 0.25, 1] } as const,
  
  /** Slow, deliberate */
  slow: { type: "tween", duration: 0.4, ease: [0.25, 0.1, 0.25, 1] } as const,
  
  /** Pantheon signature ease - elegant deceleration */
  pantheon: { type: "tween", duration: 0.3, ease: [0.22, 1, 0.36, 1] } as const,
  
  /** Enter ease - fast start, slow end */
  enter: { type: "tween", duration: 0.25, ease: [0, 0, 0.2, 1] } as const,
  
  /** Exit ease - slow start, fast end */
  exit: { type: "tween", duration: 0.2, ease: [0.4, 0, 1, 1] } as const,
} satisfies Record<string, Transition>

/* =============================================================================
   BASE ANIMATION VARIANTS
   ============================================================================= */

/**
 * Fade animations
 */
export const fade: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
}

/**
 * Scale animations - elements materialize into existence
 */
export const scale: Variants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
}

/**
 * Rise animation - elements ascend into view (signature Pantheon entrance)
 */
export const rise: Variants = {
  initial: { opacity: 0, y: 16, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: 8, scale: 0.98 },
}

/**
 * Drop animation - elements descend into view
 */
export const drop: Variants = {
  initial: { opacity: 0, y: -16, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -8, scale: 0.98 },
}

/**
 * Slide animations for sheets/drawers
 */
export const slideRight: Variants = {
  initial: { x: "-100%" },
  animate: { x: 0 },
  exit: { x: "-100%" },
}

export const slideLeft: Variants = {
  initial: { x: "100%" },
  animate: { x: 0 },
  exit: { x: "100%" },
}

export const slideUp: Variants = {
  initial: { y: "100%" },
  animate: { y: 0 },
  exit: { y: "100%" },
}

export const slideDown: Variants = {
  initial: { y: "-100%" },
  animate: { y: 0 },
  exit: { y: "-100%" },
}

/**
 * Pop animation - playful entrance
 */
export const pop: Variants = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.8 },
}

/**
 * Expand animation - unfolds from center
 */
export const expand: Variants = {
  initial: { opacity: 0, scale: 0.9, y: -8 },
  animate: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.95 },
}

/* =============================================================================
   UTILITY FUNCTIONS
   ============================================================================= */

/**
 * Create a custom transition configuration
 */
export function createTransition(
  options: {
    duration?: number
    ease?: [number, number, number, number]
    delay?: number
    stiffness?: number
    damping?: number
  }
): Transition {
  if (options.stiffness) {
    const { ease: _ease, ...springOptions } = options
    return { type: "spring", ...springOptions }
  }
  return { type: "tween", ...options }
}

/**
 * Create a stagger configuration for parent elements
 */
export function createStagger(
  staggerChildren: number = 0.1,
  delayChildren: number = 0
): Variants {
  return {
    animate: {
      transition: {
        staggerChildren,
        delayChildren,
      },
    },
  }
}

/* =============================================================================
   REDUCED MOTION SUPPORT
   ============================================================================= */

/**
 * Check if user prefers reduced motion
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

/**
 * Get a reduced-motion-safe transition
 */
export function getAccessibleTransition(transition: Transition): Transition {
  return prefersReducedMotion() ? { duration: 0 } : transition
}
