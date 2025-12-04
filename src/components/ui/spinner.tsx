"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Loader2 } from "lucide-react"

import { cn } from "@/lib/utils"

const spinnerVariants = cva(
  "animate-spin text-muted-foreground",
  {
    variants: {
      size: {
        sm: "h-4 w-4",
        default: "h-6 w-6",
        lg: "h-8 w-8",
        xl: "h-12 w-12",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

export interface SpinnerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof spinnerVariants> {
  /** Custom label for screen readers */
  label?: string
}

/**
 * Animated loading spinner.
 * 
 * @example
 * ```tsx
 * // Basic usage
 * <Spinner />
 * 
 * // Different sizes
 * <Spinner size="sm" />
 * <Spinner size="lg" />
 * <Spinner size="xl" />
 * 
 * // Custom label for accessibility
 * <Spinner label="Loading your data..." />
 * 
 * // Centered in container
 * <div className="flex items-center justify-center h-32">
 *   <Spinner />
 * </div>
 * ```
 */
const LoadingSpinner = React.forwardRef<HTMLDivElement, SpinnerProps>(
  ({ className, size, label = "Loading...", ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="status"
        aria-label={label}
        className={cn("inline-block", className)}
        {...props}
      >
        <Loader2 className={cn(spinnerVariants({ size }))} aria-hidden="true" />
        <span className="sr-only">{label}</span>
      </div>
    )
  }
)
LoadingSpinner.displayName = "LoadingSpinner"

export { LoadingSpinner, spinnerVariants }
