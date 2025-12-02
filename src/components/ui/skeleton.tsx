"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const skeletonVariants = cva("animate-pulse bg-muted", {
  variants: {
    variant: {
      default: "rounded-md",
      circular: "rounded-full",
      text: "rounded h-4",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

export interface SkeletonProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof skeletonVariants> {}

const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(skeletonVariants({ variant }), className)}
        {...props}
      />
    )
  }
)
Skeleton.displayName = "Skeleton"

// Pre-built skeleton patterns
const SkeletonText = ({ lines = 3, className }: { lines?: number; className?: string }) => (
  <div className={cn("space-y-2", className)}>
    {Array.from({ length: lines }).map((_, i) => (
      <Skeleton
        key={i}
        variant="text"
        className={cn("h-4", i === lines - 1 && "w-4/5")}
      />
    ))}
  </div>
)

const SkeletonCard = ({ className }: { className?: string }) => (
  <div className={cn("space-y-4 p-4 border rounded-lg", className)}>
    <Skeleton className="h-32 w-full" />
    <Skeleton className="h-4 w-3/4" />
    <Skeleton className="h-4 w-1/2" />
  </div>
)

const SkeletonAvatar = ({
  size = "default",
  className,
}: {
  size?: "sm" | "default" | "lg"
  className?: string
}) => {
  const sizeClasses = {
    sm: "h-8 w-8",
    default: "h-10 w-10",
    lg: "h-14 w-14",
  }

  return (
    <Skeleton
      variant="circular"
      className={cn(sizeClasses[size], className)}
    />
  )
}

const SkeletonButton = ({
  size = "default",
  className,
}: {
  size?: "sm" | "default" | "lg"
  className?: string
}) => {
  const sizeClasses = {
    sm: "h-9 w-20",
    default: "h-10 w-24",
    lg: "h-11 w-28",
  }

  return <Skeleton className={cn(sizeClasses[size], className)} />
}

const SkeletonInput = ({ className }: { className?: string }) => (
  <Skeleton className={cn("h-10 w-full", className)} />
)

const SkeletonTableRow = ({ columns = 4, className }: { columns?: number; className?: string }) => (
  <div className={cn("flex gap-4 py-3", className)}>
    {Array.from({ length: columns }).map((_, i) => (
      <Skeleton key={i} className="h-4 flex-1" />
    ))}
  </div>
)

export {
  Skeleton,
  SkeletonText,
  SkeletonCard,
  SkeletonAvatar,
  SkeletonButton,
  SkeletonInput,
  SkeletonTableRow,
  skeletonVariants,
}
