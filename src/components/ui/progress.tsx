"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const progressVariants = cva(
  "relative h-2 w-full overflow-hidden rounded-full bg-muted",
  {
    variants: {
      size: {
        sm: "h-1",
        default: "h-2",
        lg: "h-3",
        xl: "h-4",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

const indicatorVariants = cva(
  "h-full w-full flex-1 transition-all duration-300 ease-out",
  {
    variants: {
      variant: {
        default: "bg-primary",
        success: "bg-success",
        warning: "bg-warning",
        destructive: "bg-destructive",
        gradient: "bg-gradient-to-r from-primary via-primary-400 to-primary-300",
      },
      animated: {
        true: "animate-pulse",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      animated: false,
    },
  }
)

export interface ProgressProps
  extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>,
    VariantProps<typeof progressVariants>,
    VariantProps<typeof indicatorVariants> {
  /** Show percentage label */
  showLabel?: boolean
  /** Label position */
  labelPosition?: "top" | "right" | "inside"
}

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(
  (
    {
      className,
      value,
      size,
      variant,
      animated,
      showLabel,
      labelPosition = "right",
      ...props
    },
    ref
  ) => {
    const percentage = value ?? 0

    const progressBar = (
      <ProgressPrimitive.Root
        ref={ref}
        className={cn(progressVariants({ size }), className)}
        {...props}
      >
        <ProgressPrimitive.Indicator
          className={cn(indicatorVariants({ variant, animated }))}
          style={{ transform: `translateX(-${100 - percentage}%)` }}
        />
        {showLabel && labelPosition === "inside" && size !== "sm" && (
          <span className="absolute inset-0 flex items-center justify-center text-xs font-medium text-primary-foreground mix-blend-difference">
            {Math.round(percentage)}%
          </span>
        )}
      </ProgressPrimitive.Root>
    )

    if (!showLabel || labelPosition === "inside") {
      return progressBar
    }

    if (labelPosition === "top") {
      return (
        <div className="w-full">
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium">Progress</span>
            <span className="text-sm text-muted-foreground">{Math.round(percentage)}%</span>
          </div>
          {progressBar}
        </div>
      )
    }

    return (
      <div className="flex items-center gap-3 w-full">
        {progressBar}
        <span className="text-sm font-medium text-muted-foreground min-w-[3ch]">
          {Math.round(percentage)}%
        </span>
      </div>
    )
  }
)
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress, progressVariants }
