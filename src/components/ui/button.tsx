"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/**
 * Spinner component for loading state
 */
const Spinner = ({ className }: { className?: string }) => (
  <svg
    className={cn("animate-spin", className)}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
)

const buttonVariants = cva(
  // Base styles with Pantheon motion system
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 transition-[transform,box-shadow,background-color,border-color] duration-[var(--duration-fast)] ease-[var(--ease-pantheon)]",
  {
    variants: {
      variant: {
        default: 
          "bg-primary text-primary-foreground shadow-md hover:bg-primary/90 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/25 active:translate-y-0 active:scale-[0.98] active:shadow-md",
        destructive:
          "bg-destructive text-destructive-foreground shadow-md hover:bg-destructive/90 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-destructive/25 active:translate-y-0 active:scale-[0.98] active:shadow-md",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground hover:border-accent hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 active:scale-[0.98] active:shadow-sm",
        ghost: 
          "hover:bg-accent hover:text-accent-foreground active:scale-[0.98]",
        link: 
          "text-primary underline-offset-4 hover:underline",
        success: 
          "bg-success text-success-foreground shadow-md hover:bg-success/90 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-success/25 active:translate-y-0 active:scale-[0.98] active:shadow-md",
        warning: 
          "bg-warning text-warning-foreground shadow-md hover:bg-warning/90 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-warning/25 active:translate-y-0 active:scale-[0.98] active:shadow-md",
        // New: Glass variant for special occasions
        glass:
          "bg-glass-medium backdrop-blur-md border border-white/20 text-foreground shadow-lg hover:-translate-y-0.5 hover:bg-glass-heavy hover:shadow-xl active:translate-y-0 active:scale-[0.98]",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3 text-xs",
        lg: "h-11 rounded-md px-8",
        xl: "h-14 rounded-md px-12 text-base",
        icon: "h-10 w-10",
      },
      fullWidth: {
        true: "w-full",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      fullWidth: false,
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** Render as child element using Radix Slot */
  asChild?: boolean
  /** Show loading spinner and disable interactions */
  loading?: boolean
  /** Text to show while loading (replaces children) */
  loadingText?: string
  /** Icon element to render before children */
  leftIcon?: React.ReactNode
  /** Icon element to render after children */
  rightIcon?: React.ReactNode
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      fullWidth,
      asChild = false,
      loading = false,
      loadingText,
      leftIcon,
      rightIcon,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button"
    const isDisabled = disabled || loading

    return (
      <Comp
        className={cn(
          buttonVariants({ variant, size, fullWidth, className }),
          loading && "cursor-not-allowed"
        )}
        ref={ref}
        disabled={isDisabled}
        aria-disabled={isDisabled}
        aria-busy={loading}
        {...props}
      >
        {loading ? (
          <>
            <Spinner className="size-4" />
            {loadingText ?? children}
          </>
        ) : (
          <>
            {leftIcon}
            {children}
            {rightIcon}
          </>
        )}
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants, Spinner }
