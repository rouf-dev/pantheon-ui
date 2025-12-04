/**
 * Pantheon Motion System - Adapters
 * 
 * Component-specific animation helpers and animation resolvers.
 * These bridge the motion system with React components.
 */

import type { 
  AnimationProp, 
  AnimationPreset, 
  AnimationIntensity, 
  AnimationConfig,
  MotionVariants,
  ButtonAnimation,
  CardAnimation,
  FormAnimation,
} from "./types"
import { springs, tweens } from "./core"
import { 
  hoverLift, 
  hoverScale, 
  hoverGlow,
  tapPress, 
  tapBounce, 
  squashAndStretchTap,
  subtleShake,
  flashAttention,
} from "./effects"

/* =============================================================================
   DIALOG ANIMATION SYSTEM
   ============================================================================= */

/**
 * Intensity multipliers for animation scaling
 */
const intensityMultipliers: Record<AnimationIntensity, number> = {
  subtle: 0.5,
  default: 1,
  dramatic: 2,
}

/**
 * Generate motion variants for a given preset and configuration
 */
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

/**
 * Resolve animation prop to motion variants
 * 
 * @example
 * ```tsx
 * const variants = resolveAnimation("slide-up")
 * const variants = resolveAnimation({ preset: "slide-up", intensity: "dramatic" })
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

/* =============================================================================
   BUTTON ANIMATION HELPERS
   ============================================================================= */

/**
 * Get motion props for button animations
 */
export function getButtonMotionProps(animation: ButtonAnimation | false) {
  if (animation === false || animation === 'none') {
    return {}
  }

  const baseProps = { transition: springs.snappy }

  switch (animation) {
    case 'press':
      return { ...baseProps, whileTap: tapPress }
    case 'bounce':
      return { ...baseProps, whileHover: hoverScale, whileTap: tapBounce }
    case 'squash':
      return { ...baseProps, whileTap: squashAndStretchTap }
    default:
      return {}
  }
}

/* =============================================================================
   CARD ANIMATION HELPERS
   ============================================================================= */

/**
 * Get motion props for card animations
 */
export function getCardMotionProps(animation: CardAnimation | false) {
  if (animation === false || animation === 'none') {
    return {}
  }

  const baseProps = { transition: springs.gentle }

  switch (animation) {
    case 'lift':
      return { ...baseProps, whileHover: hoverLift, whileTap: tapPress }
    case 'scale':
      return { ...baseProps, whileHover: hoverScale, whileTap: tapPress }
    case 'glow':
      return { ...baseProps, whileHover: hoverGlow }
    default:
      return {}
  }
}

/* =============================================================================
   FORM ANIMATION HELPERS
   ============================================================================= */

/**
 * Get motion props for form error animations
 */
export function getFormErrorMotionProps(
  animation: FormAnimation | false,
  shouldAnimate: boolean
) {
  if (animation === false || animation === 'none' || !shouldAnimate) {
    return {}
  }

  switch (animation) {
    case 'shake':
      return {
        animate: shouldAnimate ? 'shake' : 'idle',
        variants: subtleShake,
        transition: springs.snappy,
      }
    case 'flash':
      return {
        animate: shouldAnimate ? 'flash' : 'idle',
        variants: flashAttention,
        transition: tweens.fast,
      }
    default:
      return {}
  }
}
