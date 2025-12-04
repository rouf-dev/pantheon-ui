"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { motion, type HTMLMotionProps } from "motion/react"

import { cn } from "@/lib/utils"
import { 
  type CardAnimation, 
  getCardMotionProps,
} from "@/lib/motion"

const cardVariants = cva(
  // Base styles
  "rounded-lg border text-card-foreground shadow-sm",
  {
    variants: {
      variant: {
        default: "bg-card",
        elevated: "bg-card shadow-lg",
        outline: "bg-transparent border-2",
        ghost: "border-transparent shadow-none bg-transparent",
        glass: "border-white/20 shadow-xl",
        interactive: "bg-card cursor-pointer",
      },
      glassIntensity: {
        light: "",
        medium: "",
        heavy: "",
      },
    },
    compoundVariants: [
      {
        variant: "glass",
        glassIntensity: "light",
        className: "bg-glass-light backdrop-blur-md",
      },
      {
        variant: "glass",
        glassIntensity: "medium",
        className: "bg-glass-medium backdrop-blur-lg",
      },
      {
        variant: "glass",
        glassIntensity: "heavy",
        className: "bg-glass-heavy backdrop-blur-xl",
      },
    ],
    defaultVariants: {
      variant: "default",
      glassIntensity: "medium",
    },
  }
)

export interface CardProps
  extends Omit<HTMLMotionProps<"div">, "ref">,
    VariantProps<typeof cardVariants> {
  /** 
   * Animation preset for hover/tap effects
   * @default 'lift' for interactive/elevated/glass variants, 'none' for others
   * - 'lift': Subtle lift on hover with shadow
   * - 'scale': Scale up slightly on hover  
   * - 'glow': Glow effect on hover
   * - 'none': No animation
   * - false: Explicitly disable all motion
   */
  animation?: CardAnimation | false
  
  /** @deprecated Use `animation` prop instead. Will be removed in v2.0 */
  animated?: boolean
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, glassIntensity, animation, animated, ...props }, ref) => {
    // Determine default animation based on variant
    // interactive, elevated, and glass variants get 'lift' by default
    const shouldAnimateByDefault = variant === "interactive" || variant === "elevated" || variant === "glass"
    
    // Handle deprecated 'animated' prop
    const resolvedAnimation: CardAnimation | false = 
      animation !== undefined 
        ? animation 
        : animated !== undefined
          ? (animated ? 'lift' : 'none')
          : (shouldAnimateByDefault ? 'lift' : 'none')
    
    // Get motion props
    const motionProps = getCardMotionProps(resolvedAnimation)
    
    return (
      <motion.div
        ref={ref}
        className={cn(cardVariants({ variant, glassIntensity, className }))}
        {...motionProps}
        {...props}
      />
    )
  }
)
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

export interface CardTitleProps
  extends React.HTMLAttributes<HTMLHeadingElement> {
  /** Heading level for semantic HTML (h1-h6) */
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
}

const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, as: Comp = "h3", ...props }, ref) => (
    <Comp
      ref={ref}
      className={cn(
        "text-2xl font-semibold leading-none tracking-tight",
        className
      )}
      {...props}
    />
  )
)
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent, cardVariants }
