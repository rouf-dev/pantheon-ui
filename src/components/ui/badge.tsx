"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  // Pantheon motion: subtle transitions
  "inline-flex items-center rounded-full border font-semibold transition-[color,background-color,border-color,box-shadow,transform] duration-[var(--duration-fast)] ease-[var(--ease-pantheon)] focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/90",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/90",
        success:
          "border-transparent bg-success text-success-foreground hover:bg-success/90",
        warning:
          "border-transparent bg-warning text-warning-foreground hover:bg-warning/90",
        outline: "text-foreground border-border hover:bg-muted",
        ghost: "border-transparent bg-muted text-muted-foreground hover:bg-muted/80",
        // New: Animated variant for notifications
        pulse: "border-transparent bg-primary text-primary-foreground animate-pulse-glow",
      },
      size: {
        sm: "px-2 py-0.5 text-xs",
        default: "px-2.5 py-0.5 text-xs",
        lg: "px-3 py-1 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  /** Dot indicator before text */
  dot?: boolean
  /** Icon to show before text */
  icon?: React.ReactNode
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant, size, dot, icon, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(badgeVariants({ variant, size }), className)}
        {...props}
      >
        {dot && (
          <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-current" />
        )}
        {icon && <span className="mr-1 [&_svg]:size-3">{icon}</span>}
        {children}
      </div>
    )
  }
)
Badge.displayName = "Badge"

export { Badge, badgeVariants }
