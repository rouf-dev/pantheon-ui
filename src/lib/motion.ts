/**
 * Pantheon Motion System
 * 
 * "Movement should feel inevitable, like gravity — 
 * components settle into place as if they were always meant to be there."
 * 
 * Built on top of Motion (framer-motion) for physics-based, production-grade animations.
 */

import { type Transition, type Variants, type Spring, type TargetAndTransition } from "motion/react"

/* =============================================================================
   PANTHEON TRANSITION PRESETS
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
   PANTHEON ANIMATION VARIANTS
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
  initial: { x: "100%", opacity: 0.5 },
  animate: { x: 0, opacity: 1 },
  exit: { x: "100%", opacity: 0.5 },
}

export const slideLeft: Variants = {
  initial: { x: "-100%", opacity: 0.5 },
  animate: { x: 0, opacity: 1 },
  exit: { x: "-100%", opacity: 0.5 },
}

export const slideUp: Variants = {
  initial: { y: "100%", opacity: 0.5 },
  animate: { y: 0, opacity: 1 },
  exit: { y: "100%", opacity: 0.5 },
}

export const slideDown: Variants = {
  initial: { y: "-100%", opacity: 0.5 },
  animate: { y: 0, opacity: 1 },
  exit: { y: "-100%", opacity: 0.5 },
}

/**
 * Pop animation - bouncy entrance for notifications/badges
 */
export const pop: Variants = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.8 },
}

/**
 * Expand/collapse for accordions and collapsibles
 */
export const expand: Variants = {
  initial: { height: 0, opacity: 0 },
  animate: { height: "auto", opacity: 1 },
  exit: { height: 0, opacity: 0 },
}

/* =============================================================================
   DIALOG/MODAL SPECIFIC ANIMATIONS
   ============================================================================= */

/**
 * Modal overlay fade
 */
export const overlayVariants: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
}

/**
 * Modal content - rises from below with scale (the showpiece)
 */
export const modalVariants: Variants = {
  initial: { 
    opacity: 0, 
    y: 20,
    scale: 0.96,
  },
  animate: { 
    opacity: 1, 
    y: 0,
    scale: 1,
  },
  exit: { 
    opacity: 0, 
    y: 10,
    scale: 0.98,
  },
}

/* =============================================================================
   DROPDOWN/POPOVER ANIMATIONS
   ============================================================================= */

/**
 * Dropdown menu - cascades down with subtle scale
 */
export const dropdownVariants: Variants = {
  initial: { 
    opacity: 0, 
    y: -8,
    scale: 0.96,
  },
  animate: { 
    opacity: 1, 
    y: 0,
    scale: 1,
  },
  exit: { 
    opacity: 0, 
    y: -4,
    scale: 0.98,
  },
}

/**
 * Popover - subtle scale from origin
 */
export const popoverVariants: Variants = {
  initial: { 
    opacity: 0, 
    scale: 0.95,
  },
  animate: { 
    opacity: 1, 
    scale: 1,
  },
  exit: { 
    opacity: 0, 
    scale: 0.95,
  },
}

/* =============================================================================
   TOAST ANIMATIONS
   ============================================================================= */

/**
 * Toast - slides in from right with pop
 */
export const toastVariants: Variants = {
  initial: { 
    opacity: 0, 
    x: 50,
    scale: 0.95,
  },
  animate: { 
    opacity: 1, 
    x: 0,
    scale: 1,
  },
  exit: { 
    opacity: 0, 
    x: 100,
    scale: 0.95,
  },
}

/* =============================================================================
   STAGGER ANIMATIONS
   ============================================================================= */

/**
 * Container for staggered children
 */
export const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
  exit: {
    transition: {
      staggerChildren: 0.03,
      staggerDirection: -1,
    },
  },
}

/**
 * Stagger item - use as child of staggerContainer
 */
export const staggerItem: Variants = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -4 },
}

/* =============================================================================
   HOVER/TAP ANIMATIONS (for whileHover, whileTap)
   ============================================================================= */

/**
 * Lift effect for cards
 */
export const hoverLift = {
  y: -4,
  scale: 1.02,
}

/**
 * Press effect for buttons
 */
export const tapPress = {
  scale: 0.97,
}

/**
 * Subtle scale for interactive elements
 */
export const hoverScale = {
  scale: 1.05,
}

/* =============================================================================
   UTILITY FUNCTIONS
   ============================================================================= */

/**
 * Create a custom transition with Pantheon defaults
 */
export function createTransition(
  overrides?: Partial<Transition>
): Transition {
  return {
    ...springs.smooth,
    ...overrides,
  }
}

/**
 * Create stagger container with custom timing
 */
export function createStagger(
  staggerChildren = 0.05,
  delayChildren = 0.1
): Variants {
  return {
    initial: {},
    animate: {
      transition: {
        staggerChildren,
        delayChildren,
      },
    },
    exit: {
      transition: {
        staggerChildren: staggerChildren * 0.6,
        staggerDirection: -1,
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
 * Get transition respecting reduced motion preference
 */
export function getAccessibleTransition(transition: Transition): Transition {
  if (prefersReducedMotion()) {
    return { duration: 0 }
  }
  return transition
}

/* =============================================================================
   DEFAULT EXPORT - All presets bundled
   ============================================================================= */

export const pantheonMotion = {
  // Transitions
  springs,
  tweens,
  
  // Variants
  fade,
  scale,
  rise,
  drop,
  pop,
  expand,
  
  // Slide variants
  slideRight,
  slideLeft,
  slideUp,
  slideDown,
  
  // Component-specific
  modal: modalVariants,
  overlay: overlayVariants,
  dropdown: dropdownVariants,
  popover: popoverVariants,
  toast: toastVariants,
  
  // Stagger
  staggerContainer,
  staggerItem,
  
  // Hover/Tap
  hoverLift,
  hoverScale,
  tapPress,
  
  // Utils
  createTransition,
  createStagger,
  prefersReducedMotion,
  getAccessibleTransition,
}

export default pantheonMotion

/* =============================================================================
   DIALOG ANIMATION SYSTEM (Unified for Dialog, SplitDialog, CompanionDialog)
   ============================================================================= */

/**
 * Dialog animation preset names
 */
export type AnimationPreset = "zoom" | "fade" | "slide-up" | "slide-down" | "slide-left" | "slide-right" | "none"

/**
 * Animation intensity levels
 */
export type AnimationIntensity = "subtle" | "default" | "dramatic"

/**
 * Configuration overrides for animations
 */
export interface AnimationConfig {
  /** Distance for slide animations (default: 20) */
  distance?: number
  /** Scale for zoom animation (default: 0.95) */
  scale?: number
  /** Override spring configuration */
  spring?: Spring
}

/**
 * Unified animation prop - accepts string preset or object with config
 */
export type AnimationProp = 
  | AnimationPreset 
  | { 
      preset: AnimationPreset
      intensity?: AnimationIntensity
      config?: AnimationConfig 
    }

/**
 * Motion variants structure
 */
export interface MotionVariants {
  initial: TargetAndTransition
  animate: TargetAndTransition
  exit: TargetAndTransition
  transition?: Transition
}

/* ─────────────────────────────────────────────────────────────────────────────
 * Intensity Multipliers
 * ───────────────────────────────────────────────────────────────────────────*/

const intensityMultipliers: Record<AnimationIntensity, number> = {
  subtle: 0.5,      // Half intensity
  default: 1,       // Normal intensity
  dramatic: 2,      // Double intensity
}

/* ─────────────────────────────────────────────────────────────────────────────
 * Variant Generator
 * ───────────────────────────────────────────────────────────────────────────*/

function createVariants(
  preset: AnimationPreset, 
  config: AnimationConfig, 
  intensity: AnimationIntensity
): MotionVariants {
  const multiplier = intensityMultipliers[intensity]
  
  switch (preset) {
    case "zoom": {
      const scale = config.scale ?? 0.95
      const adjustedScale = 1 - (1 - scale) * multiplier
      return {
        initial: { opacity: 0, scale: adjustedScale },
        animate: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: adjustedScale },
        transition: config.spring ?? springs.smooth,
      }
    }
    
    case "fade":
      return {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: config.spring ?? springs.smooth,
      }
    
    case "slide-up": {
      const distance = (config.distance ?? 20) * multiplier
      return {
        initial: { opacity: 0, y: distance },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: distance },
        transition: config.spring ?? springs.smooth,
      }
    }
    
    case "slide-down": {
      const distance = (config.distance ?? 20) * multiplier
      return {
        initial: { opacity: 0, y: -distance },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -distance },
        transition: config.spring ?? springs.smooth,
      }
    }
    
    case "slide-left": {
      const distance = (config.distance ?? 20) * multiplier
      return {
        initial: { opacity: 0, x: distance },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: distance },
        transition: config.spring ?? springs.smooth,
      }
    }
    
    case "slide-right": {
      const distance = (config.distance ?? 20) * multiplier
      return {
        initial: { opacity: 0, x: -distance },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -distance },
        transition: config.spring ?? springs.smooth,
      }
    }
    
    case "none":
      return {
        initial: {},
        animate: {},
        exit: {},
      }
  }
}

/* ─────────────────────────────────────────────────────────────────────────────
 * Main Resolvers (Public API)
 * ───────────────────────────────────────────────────────────────────────────*/

/**
 * Resolve animation prop to motion variants
 * 
 * @example
 * ```tsx
 * // Simple preset
 * const variants = resolveAnimation("slide-up")
 * 
 * // With intensity
 * const variants = resolveAnimation({ preset: "slide-up", intensity: "dramatic" })
 * 
 * // With custom config
 * const variants = resolveAnimation({ preset: "slide-up", config: { distance: 40 } })
 * ```
 */
export function resolveAnimation(animation: AnimationProp): MotionVariants {
  if (typeof animation === "string") {
    return createVariants(animation, {}, "default")
  }
  return createVariants(
    animation.preset, 
    animation.config ?? {}, 
    animation.intensity ?? "default"
  )
}

/**
 * Resolve enter and exit animations (supports different animations for each)
 * 
 * @example
 * ```tsx
 * // Same animation for enter/exit
 * const { enter, exit } = resolveAnimationPair("slide-up")
 * 
 * // Different animations
 * const { enter, exit } = resolveAnimationPair("slide-up", "fade")
 * 
 * // With custom configs
 * const { enter, exit } = resolveAnimationPair(
 *   { preset: "slide-up", intensity: "dramatic" },
 *   { preset: "fade" }
 * )
 * ```
 */
export function resolveAnimationPair(
  animation: AnimationProp, 
  exitAnimation?: AnimationProp
): { enter: MotionVariants; exit: MotionVariants } {
  const enter = resolveAnimation(animation)
  const exit = exitAnimation ? resolveAnimation(exitAnimation) : enter
  return { enter, exit }
}

/**
 * Dialog overlay animation (standard across all dialog types)
 */
export const dialogOverlayVariants: MotionVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: springs.smooth,
}
