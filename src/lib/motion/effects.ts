/**
 * Pantheon Motion System - Effects
 * 
 * Advanced animations, component-specific variants, and premium effects.
 * These build on top of the core primitives.
 */

import type { Variants } from "motion/react"

/* =============================================================================
   DIALOG/MODAL ANIMATIONS
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
 * Modal content - rises from below with scale
 */
export const modalVariants: Variants = {
  initial: { opacity: 0, y: 20, scale: 0.96 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: 10, scale: 0.98 },
}

/* =============================================================================
   DROPDOWN/POPOVER ANIMATIONS
   ============================================================================= */

/**
 * Dropdown menu - cascades down with subtle scale
 */
export const dropdownVariants: Variants = {
  initial: { opacity: 0, y: -8, scale: 0.96 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -4, scale: 0.98 },
}

/**
 * Popover - subtle scale from origin
 */
export const popoverVariants: Variants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
}

/* =============================================================================
   TOAST ANIMATIONS
   ============================================================================= */

/**
 * Toast - slides in from right with pop
 */
export const toastVariants: Variants = {
  initial: { opacity: 0, x: 50, scale: 0.95 },
  animate: { opacity: 1, x: 0, scale: 1 },
  exit: { opacity: 0, x: 100, scale: 0.95 },
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
    transition: { staggerChildren: 0.05, delayChildren: 0.1 },
  },
  exit: {
    transition: { staggerChildren: 0.03, staggerDirection: -1 },
  },
}

export const staggerItem: Variants = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -4 },
}

export const staggerFadeItem: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
}

export const staggerRiseItem: Variants = {
  initial: { opacity: 0, y: 16, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: 8, scale: 0.98 },
}

export const staggerScaleItem: Variants = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.8 },
}

/* =============================================================================
   PREMIUM ANIMATIONS
   ============================================================================= */

/**
 * Blur animation - premium reveal effect
 */
export const blur: Variants = {
  initial: { opacity: 0, filter: "blur(8px)" },
  animate: { opacity: 1, filter: "blur(0px)" },
  exit: { opacity: 0, filter: "blur(8px)" },
}

export const blurScale: Variants = {
  initial: { opacity: 0, filter: "blur(8px)", scale: 0.95 },
  animate: { opacity: 1, filter: "blur(0px)", scale: 1 },
  exit: { opacity: 0, filter: "blur(8px)", scale: 0.95 },
}

/**
 * Flip animations - card flip effect
 */
export const flip: Variants = {
  initial: { opacity: 0, rotateY: -90 },
  animate: { opacity: 1, rotateY: 0 },
  exit: { opacity: 0, rotateY: 90 },
}

export const flipVertical: Variants = {
  initial: { opacity: 0, rotateX: -90 },
  animate: { opacity: 1, rotateX: 0 },
  exit: { opacity: 0, rotateX: 90 },
}

/* =============================================================================
   FEEDBACK ANIMATIONS
   ============================================================================= */

/**
 * Shake animation - error feedback
 */
export const shake: Variants = {
  initial: { x: 0 },
  animate: { x: 0 },
  shake: { 
    x: [0, -8, 8, -8, 8, -4, 4, 0],
    transition: { duration: 0.5 }
  },
}

/**
 * Subtle shake - gentle form validation
 */
export const subtleShake: Variants = {
  initial: { x: 0 },
  animate: { x: 0 },
  shake: { 
    x: [0, -3, 3, -3, 3, -2, 2, 0],
    transition: { duration: 0.4 }
  },
}

/**
 * Wiggle animation - playful attention
 */
export const wiggle: Variants = {
  initial: { rotate: 0 },
  animate: { rotate: 0 },
  wiggle: { 
    rotate: [0, -5, 5, -5, 5, -2, 2, 0],
    transition: { duration: 0.5 }
  },
}

/**
 * Pulse animations
 */
export const pulse: Variants = {
  initial: { scale: 1 },
  animate: { 
    scale: [1, 1.05, 1],
    transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
  },
}

export const pulseSubtle: Variants = {
  initial: { scale: 1, opacity: 1 },
  animate: { 
    scale: [1, 1.02, 1],
    opacity: [1, 0.8, 1],
    transition: { duration: 2, repeat: Infinity, ease: "easeInOut" }
  },
}

/**
 * Highlight animation - newly added items
 */
export const highlight: Variants = {
  initial: { backgroundColor: "transparent" },
  animate: { backgroundColor: "transparent" },
  highlight: {
    backgroundColor: ["transparent", "rgba(0, 179, 242, 0.2)", "transparent"],
    transition: { duration: 0.8 }
  },
}

/**
 * Flash attention - subtle highlight for updates
 */
export const flashAttention: Variants = {
  initial: { backgroundColor: "transparent" },
  animate: { backgroundColor: "transparent" },
  flash: {
    backgroundColor: ["transparent", "rgba(0, 179, 242, 0.1)", "transparent"],
    transition: { duration: 0.5 }
  },
}

/**
 * Success feedback
 */
export const success: Variants = {
  initial: { scale: 1 },
  animate: { scale: 1 },
  success: {
    scale: [1, 1.1, 1],
    backgroundColor: ["transparent", "rgba(34, 197, 94, 0.2)", "transparent"],
    transition: { duration: 0.5 }
  },
}

/**
 * Error feedback
 */
export const error: Variants = {
  initial: { x: 0 },
  animate: { x: 0 },
  error: {
    x: [0, -6, 6, -6, 6, 0],
    backgroundColor: ["transparent", "rgba(239, 68, 68, 0.15)", "transparent"],
    transition: { duration: 0.4 }
  },
}

/**
 * Jiggle - iOS-style edit mode
 */
export const jiggle: Variants = {
  initial: { rotate: 0 },
  animate: { rotate: 0 },
  jiggle: {
    rotate: [-1, 1.5, -1.5, 1, -1, 1.5, -1],
    transition: { duration: 0.5, repeat: Infinity, ease: "easeInOut" }
  },
}

/* =============================================================================
   LOADING ANIMATIONS
   ============================================================================= */

export const spin: Variants = {
  initial: { rotate: 0 },
  animate: { 
    rotate: 360,
    transition: { duration: 1, repeat: Infinity, ease: "linear" }
  },
}

export const bounce: Variants = {
  initial: { y: 0 },
  animate: { 
    y: [0, -8, 0],
    transition: { duration: 0.6, repeat: Infinity, ease: "easeInOut" }
  },
}

export const shimmer: Variants = {
  initial: { backgroundPosition: "-200% 0" },
  animate: { 
    backgroundPosition: "200% 0",
    transition: { duration: 1.5, repeat: Infinity, ease: "linear" }
  },
}

export const wave: Variants = {
  initial: { opacity: 0.5 },
  animate: { 
    opacity: [0.5, 1, 0.5],
    transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
  },
}

/* =============================================================================
   PEEK/HINT ANIMATIONS
   ============================================================================= */

export const peekLeft: Variants = {
  initial: { x: -20, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: -20, opacity: 0 },
}

export const peekRight: Variants = {
  initial: { x: 20, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: 20, opacity: 0 },
}

export const peekTop: Variants = {
  initial: { y: -12, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  exit: { y: -12, opacity: 0 },
}

export const peekBottom: Variants = {
  initial: { y: 12, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  exit: { y: 12, opacity: 0 },
}

/* =============================================================================
   ADVANCED ANIMATIONS
   ============================================================================= */

/**
 * Squash and stretch - Disney-style button press
 */
export const squashAndStretch = {
  scale: 1,
  scaleX: 1,
  scaleY: 1,
}

export const squashAndStretchTap = {
  scaleX: 1.05,
  scaleY: 0.95,
  transition: { duration: 0.1 }
}

export const squashAndStretchRelease = {
  scaleX: 0.95,
  scaleY: 1.05,
  transition: { type: "spring", stiffness: 400, damping: 10 }
}

/**
 * Bubble pop - overshoot scale for celebrations
 */
export const bubblePop: Variants = {
  initial: { opacity: 0, scale: 0.5 },
  animate: { 
    opacity: 1, 
    scale: 1,
    transition: { type: "spring", stiffness: 400, damping: 10 }
  },
  exit: { opacity: 0, scale: 0.8, transition: { duration: 0.15 } },
}

/**
 * Material expand - grow from origin point
 */
export const materialExpand: Variants = {
  initial: { opacity: 0, scale: 0.3, borderRadius: "50%" },
  animate: { 
    opacity: 1, 
    scale: 1,
    borderRadius: "8px",
    transition: { 
      type: "spring", stiffness: 300, damping: 25,
      borderRadius: { duration: 0.2 }
    }
  },
  exit: { opacity: 0, scale: 0.5, transition: { duration: 0.15 } },
}

export const materialExpandSubtle: Variants = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { 
    opacity: 1, 
    scale: 1,
    transition: { type: "spring", stiffness: 300, damping: 25 }
  },
  exit: { opacity: 0, scale: 0.9, transition: { duration: 0.1 } },
}

/**
 * Crossfade - content swap animations
 */
export const crossfadeOut: Variants = {
  initial: { opacity: 1 },
  exit: { opacity: 0, transition: { duration: 0.15 } },
}

export const crossfadeIn: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.15, delay: 0.1 } },
}

export const crossfade: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.15 } },
}

/**
 * Depth shift - Z-axis movement simulation
 */
export const depthShift: Variants = {
  initial: { scale: 1, boxShadow: "0 1px 3px rgba(0,0,0,0.1)" },
  animate: { scale: 1, boxShadow: "0 1px 3px rgba(0,0,0,0.1)" },
  focus: { 
    scale: 1.02, 
    boxShadow: "0 10px 40px rgba(0,0,0,0.15)",
    transition: { type: "spring", stiffness: 300, damping: 20 }
  },
  blur: { 
    scale: 0.98, 
    boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
    transition: { type: "spring", stiffness: 300, damping: 20 }
  },
}

export const hoverDepthShift = {
  scale: 1.02,
  boxShadow: "0 10px 40px rgba(0,0,0,0.15)",
  transition: { type: "spring", stiffness: 300, damping: 20 }
}

/**
 * Typewriter - staggered text reveal
 */
export const typewriterContainer: Variants = {
  initial: {},
  animate: {
    transition: { staggerChildren: 0.03, delayChildren: 0.1 }
  },
}

export const typewriterChar: Variants = {
  initial: { opacity: 0, y: 5 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.1 } },
}

export const typewriterCursor: Variants = {
  initial: { opacity: 1 },
  animate: {
    opacity: [1, 0, 1],
    transition: { duration: 1, repeat: Infinity, ease: "linear" }
  },
}

/**
 * Trail fade - directional stagger
 */
export const trailFadeInContainer: Variants = {
  initial: {},
  animate: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 }
  },
}

export const trailFadeInItem: Variants = {
  initial: { opacity: 0, x: -20, y: -20, scale: 0.9 },
  animate: { 
    opacity: 1, x: 0, y: 0, scale: 1,
    transition: { type: "spring", stiffness: 200, damping: 20 }
  },
}

export const trailFromTopLeft = {
  initial: { opacity: 0, x: -20, y: -20 },
  animate: { opacity: 1, x: 0, y: 0 },
}

export const trailFromTopRight = {
  initial: { opacity: 0, x: 20, y: -20 },
  animate: { opacity: 1, x: 0, y: 0 },
}

export const trailFromBottomLeft = {
  initial: { opacity: 0, x: -20, y: 20 },
  animate: { opacity: 1, x: 0, y: 0 },
}

export const trailFromBottomRight = {
  initial: { opacity: 0, x: 20, y: 20 },
  animate: { opacity: 1, x: 0, y: 0 },
}

/**
 * Accordion fold - enhanced height animation
 */
export const accordionFold: Variants = {
  initial: { height: 0, opacity: 0, overflow: "hidden" },
  animate: { 
    height: "auto", 
    opacity: 1,
    overflow: "visible",
    transition: { 
      height: { type: "spring", stiffness: 300, damping: 30 },
      opacity: { duration: 0.2, delay: 0.1 }
    }
  },
  exit: { 
    height: 0, 
    opacity: 0,
    overflow: "hidden",
    transition: { 
      height: { type: "spring", stiffness: 300, damping: 30 },
      opacity: { duration: 0.1 }
    }
  },
}

/**
 * Hover flip - 180° flip to reveal back
 */
export const hoverFlip: Variants = {
  initial: { rotateY: 0 },
  flipped: { 
    rotateY: 180,
    transition: { type: "spring", stiffness: 200, damping: 20 }
  },
}

export const hoverFlipVertical: Variants = {
  initial: { rotateX: 0 },
  flipped: { 
    rotateX: 180,
    transition: { type: "spring", stiffness: 200, damping: 20 }
  },
}

/**
 * Ripple - expanding circle from click
 */
export const ripple: Variants = {
  initial: { scale: 0, opacity: 0.5 },
  animate: { 
    scale: 4, 
    opacity: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  },
}

export const rippleFast: Variants = {
  initial: { scale: 0, opacity: 0.4 },
  animate: { 
    scale: 3, 
    opacity: 0,
    transition: { duration: 0.4, ease: "easeOut" }
  },
}

/* =============================================================================
   HOVER/TAP PRESETS (for whileHover, whileTap)
   ============================================================================= */

export const hoverLift = { y: -4, scale: 1.02 }
export const tapPress = { scale: 0.97 }
export const hoverScale = { scale: 1.05 }
export const hoverGlow = { boxShadow: "0 0 20px rgba(0, 179, 242, 0.4)" }
export const hoverGlowLift = { y: -4, boxShadow: "0 8px 30px rgba(0, 179, 242, 0.3)" }
export const hoverBrighten = { filter: "brightness(1.1)" }
export const tapBounce = { scale: [1, 0.92, 1.05, 1], transition: { duration: 0.3 } }
export const tapShrink = { scale: 0.95 }
export const tapDeep = { scale: 0.97, boxShadow: "0 1px 2px rgba(0, 0, 0, 0.1)" }
