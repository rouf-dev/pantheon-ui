"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const glassVariants = cva(
  "border border-white/20 shadow-xl transition-all duration-200",
  {
    variants: {
      intensity: {
        light: "bg-glass-light backdrop-blur-md",
        medium: "bg-glass-medium backdrop-blur-lg",
        heavy: "bg-glass-heavy backdrop-blur-xl",
      },
      rounded: {
        none: "rounded-none",
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        xl: "rounded-xl",
        full: "rounded-full",
      },
    },
    defaultVariants: {
      intensity: "medium",
      rounded: "lg",
    },
  }
)

export interface GlassProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof glassVariants> {
  asChild?: boolean
}

const Glass = React.forwardRef<HTMLDivElement, GlassProps>(
  ({ className, intensity, rounded, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "div"
    return (
      <Comp
        ref={ref}
        className={cn(glassVariants({ intensity, rounded, className }))}
        {...props}
      />
    )
  }
)
Glass.displayName = "Glass"

export { Glass, glassVariants }
