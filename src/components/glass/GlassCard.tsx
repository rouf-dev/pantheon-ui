"use client"

import * as React from "react"
import { Card, CardProps } from "../ui/card"

export interface GlassCardProps extends Omit<CardProps, 'variant'> {
  /** @deprecated Use `glassIntensity` instead */
  intensity?: 'light' | 'medium' | 'heavy'
}

/**
 * @deprecated Use `<Card variant="glass" glassIntensity="medium">` instead.
 * This component is kept for backward compatibility.
 */
const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({ intensity = 'medium', glassIntensity, ...props }, ref) => (
    <Card
      ref={ref}
      variant="glass"
      glassIntensity={glassIntensity ?? intensity}
      {...props}
    />
  )
)
GlassCard.displayName = "GlassCard"

export { GlassCard }
