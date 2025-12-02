"use client"

import * as React from "react"
import { DialogContent } from "../ui/dialog"
import { cn } from "@/lib/utils"
import { glassVariants } from "../ui/glass"

export interface GlassModalProps extends React.ComponentPropsWithoutRef<typeof DialogContent> {
  intensity?: 'light' | 'medium' | 'heavy'
}

/**
 * A dialog/modal with glassmorphism effect.
 */
const GlassModal = React.forwardRef<
  React.ElementRef<typeof DialogContent>,
  GlassModalProps
>(({ className, intensity = 'medium', children, ...props }, ref) => (
  <DialogContent
    ref={ref}
    className={cn(
      glassVariants({ intensity, rounded: 'lg' }),
      className
    )}
    {...props}
  >
    {children}
  </DialogContent>
))
GlassModal.displayName = "GlassModal"

export { GlassModal }
