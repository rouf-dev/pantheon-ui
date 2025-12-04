/**
 * Pantheon Motion System - Type Definitions
 * 
 * All type definitions for the motion system in one place.
 */

import type { Transition, Spring, TargetAndTransition } from "motion/react"

/* =============================================================================
   CORE ANIMATION TYPES
   ============================================================================= */

/**
 * Dialog/Overlay animation preset names
 */
export type AnimationPreset = 
  | "zoom" 
  | "fade" 
  | "slide-up" 
  | "slide-down" 
  | "slide-left" 
  | "slide-right" 
  | "none"

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

/* =============================================================================
   COMPONENT ANIMATION TYPES
   ============================================================================= */

/**
 * Button animation presets
 */
export const buttonAnimations = ['none', 'press', 'bounce', 'squash'] as const
export type ButtonAnimation = (typeof buttonAnimations)[number]

/**
 * Card animation presets
 */
export const cardAnimations = ['none', 'lift', 'scale', 'glow'] as const
export type CardAnimation = (typeof cardAnimations)[number]

/**
 * Form/Input animation presets
 */
export const formAnimations = ['none', 'shake', 'flash'] as const
export type FormAnimation = (typeof formAnimations)[number]

/**
 * Overlay animation presets (dialogs, modals)
 */
export const overlayAnimations = ['none', 'zoom', 'fade', 'slide-up', 'slide-down'] as const
export type OverlayAnimation = (typeof overlayAnimations)[number]
