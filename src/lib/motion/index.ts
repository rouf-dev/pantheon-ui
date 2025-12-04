/**
 * Pantheon Motion System
 * 
 * "Movement should feel inevitable, like gravity — 
 * components settle into place as if they were always meant to be there."
 * 
 * Built on top of Motion (framer-motion) for physics-based, production-grade animations.
 * 
 * @example
 * ```tsx
 * // Import what you need
 * import { springs, fade, hoverLift, resolveAnimation } from '@/lib/motion'
 * 
 * // Or import everything via the default export
 * import { pantheonMotion } from '@/lib/motion'
 * ```
 */

// Types
export type {
  AnimationPreset,
  AnimationIntensity,
  AnimationConfig,
  AnimationProp,
  MotionVariants,
  ButtonAnimation,
  CardAnimation,
  FormAnimation,
  OverlayAnimation,
} from "./types"

export {
  buttonAnimations,
  cardAnimations,
  formAnimations,
  overlayAnimations,
} from "./types"

// Core (transitions + base variants + utilities)
export {
  // Transitions
  springs,
  tweens,
  // Base variants
  fade,
  scale,
  rise,
  drop,
  slideRight,
  slideLeft,
  slideUp,
  slideDown,
  pop,
  expand,
  // Utilities
  createTransition,
  createStagger,
  prefersReducedMotion,
  getAccessibleTransition,
} from "./core"

// Effects (all fancy animations)
export {
  // Dialog/Modal
  overlayVariants,
  modalVariants,
  // Dropdown/Popover
  dropdownVariants,
  popoverVariants,
  // Toast
  toastVariants,
  // Stagger
  staggerContainer,
  staggerItem,
  staggerFadeItem,
  staggerRiseItem,
  staggerScaleItem,
  // Premium
  blur,
  blurScale,
  flip,
  flipVertical,
  // Feedback
  shake,
  subtleShake,
  wiggle,
  pulse,
  pulseSubtle,
  highlight,
  flashAttention,
  success,
  error,
  jiggle,
  // Loading
  spin,
  bounce,
  shimmer,
  wave,
  // Peek/Hint
  peekLeft,
  peekRight,
  peekTop,
  peekBottom,
  // Advanced
  squashAndStretch,
  squashAndStretchTap,
  squashAndStretchRelease,
  bubblePop,
  materialExpand,
  materialExpandSubtle,
  crossfadeOut,
  crossfadeIn,
  crossfade,
  depthShift,
  hoverDepthShift,
  typewriterContainer,
  typewriterChar,
  typewriterCursor,
  trailFadeInContainer,
  trailFadeInItem,
  trailFromTopLeft,
  trailFromTopRight,
  trailFromBottomLeft,
  trailFromBottomRight,
  accordionFold,
  hoverFlip,
  hoverFlipVertical,
  ripple,
  rippleFast,
  // Hover/Tap presets
  hoverLift,
  tapPress,
  hoverScale,
  hoverGlow,
  hoverGlowLift,
  hoverBrighten,
  tapBounce,
  tapShrink,
  tapDeep,
} from "./effects"

// Adapters (component helpers)
export {
  resolveAnimation,
  resolveAnimationPair,
  dialogOverlayVariants,
  getButtonMotionProps,
  getCardMotionProps,
  getFormErrorMotionProps,
} from "./adapters"

// Default export - all presets bundled
import { springs, tweens, fade, scale, rise, drop, slideRight, slideLeft, slideUp, slideDown, pop, expand } from "./core"
import {
  overlayVariants, modalVariants, dropdownVariants, popoverVariants, toastVariants,
  staggerContainer, staggerItem, staggerFadeItem, staggerRiseItem, staggerScaleItem,
  blur, blurScale, flip, flipVertical,
  shake, subtleShake, wiggle, pulse, pulseSubtle, highlight, flashAttention, success, error, jiggle,
  spin, bounce, shimmer, wave,
  peekLeft, peekRight, peekTop, peekBottom,
  squashAndStretch, squashAndStretchTap, squashAndStretchRelease, bubblePop,
  materialExpand, materialExpandSubtle, crossfadeOut, crossfadeIn, crossfade,
  depthShift, hoverDepthShift,
  typewriterContainer, typewriterChar, typewriterCursor,
  trailFadeInContainer, trailFadeInItem, trailFromTopLeft, trailFromTopRight, trailFromBottomLeft, trailFromBottomRight,
  accordionFold, hoverFlip, hoverFlipVertical, ripple, rippleFast,
  hoverLift, tapPress, hoverScale, hoverGlow, hoverGlowLift, hoverBrighten, tapBounce, tapShrink, tapDeep,
} from "./effects"

export const pantheonMotion = {
  // Transitions
  springs,
  tweens,
  
  // Basic Variants
  fade,
  scale,
  rise,
  drop,
  slideRight,
  slideLeft,
  slideUp,
  slideDown,
  pop,
  expand,
  
  // Component Variants
  overlayVariants,
  modalVariants,
  dropdownVariants,
  popoverVariants,
  toastVariants,
  
  // Stagger
  staggerContainer,
  staggerItem,
  staggerFadeItem,
  staggerRiseItem,
  staggerScaleItem,
  
  // Premium
  blur,
  blurScale,
  flip,
  flipVertical,
  
  // Feedback
  shake,
  subtleShake,
  wiggle,
  pulse,
  pulseSubtle,
  highlight,
  flashAttention,
  success,
  error,
  jiggle,
  
  // Loading
  spin,
  bounce,
  shimmer,
  wave,
  
  // Peek/Hint
  peekLeft,
  peekRight,
  peekTop,
  peekBottom,
  
  // Advanced
  squashAndStretch,
  squashAndStretchTap,
  squashAndStretchRelease,
  bubblePop,
  materialExpand,
  materialExpandSubtle,
  crossfadeOut,
  crossfadeIn,
  crossfade,
  depthShift,
  hoverDepthShift,
  typewriterContainer,
  typewriterChar,
  typewriterCursor,
  trailFadeInContainer,
  trailFadeInItem,
  trailFromTopLeft,
  trailFromTopRight,
  trailFromBottomLeft,
  trailFromBottomRight,
  accordionFold,
  hoverFlip,
  hoverFlipVertical,
  ripple,
  rippleFast,
  
  // Hover/Tap
  hoverLift,
  tapPress,
  hoverScale,
  hoverGlow,
  hoverGlowLift,
  hoverBrighten,
  tapBounce,
  tapShrink,
  tapDeep,
}
