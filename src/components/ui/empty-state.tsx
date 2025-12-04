"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { FileQuestion, Search, Database, AlertCircle } from "lucide-react"

import { cn } from "@/lib/utils"

const emptyStateVariants = cva(
  "flex flex-col items-center justify-center text-center",
  {
    variants: {
      size: {
        sm: "gap-2 py-6",
        default: "gap-3 py-12",
        lg: "gap-4 py-16",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

const iconVariants = cva("text-muted-foreground/40", {
  variants: {
    size: {
      sm: "h-8 w-8",
      default: "h-12 w-12",
      lg: "h-16 w-16",
    },
  },
  defaultVariants: {
    size: "default",
  },
})

const titleVariants = cva("font-semibold text-foreground", {
  variants: {
    size: {
      sm: "text-sm",
      default: "text-base",
      lg: "text-lg",
    },
  },
  defaultVariants: {
    size: "default",
  },
})

const descriptionVariants = cva("text-muted-foreground max-w-sm", {
  variants: {
    size: {
      sm: "text-xs",
      default: "text-sm",
      lg: "text-base",
    },
  },
  defaultVariants: {
    size: "default",
  },
})

export interface EmptyStateProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof emptyStateVariants> {
  /** Icon to display (default: varies by type) */
  icon?: React.ReactNode
  /** Title text */
  title?: string
  /** Description text */
  description?: string
  /** Action button or link */
  action?: React.ReactNode
  /** Preset type (auto-selects icon and text if not provided) */
  type?: "search" | "data" | "error" | "generic"
}

const typePresets = {
  search: {
    icon: Search,
    title: "No results found",
    description: "Try adjusting your search or filters to find what you're looking for.",
  },
  data: {
    icon: Database,
    title: "No data available",
    description: "There's no data to display yet. Check back later or add some items.",
  },
  error: {
    icon: AlertCircle,
    title: "Something went wrong",
    description: "We encountered an error loading this content. Please try again.",
  },
  generic: {
    icon: FileQuestion,
    title: "Nothing here yet",
    description: "This area is empty. Start by adding some content.",
  },
}

/**
 * Empty state component for displaying "no data" or "no results" feedback.
 * 
 * @example
 * ```tsx
 * // Basic usage with preset
 * <EmptyState type="search" />
 * <EmptyState type="data" />
 * <EmptyState type="error" />
 * 
 * // Custom content
 * <EmptyState
 *   icon={<Inbox className="h-12 w-12" />}
 *   title="No messages"
 *   description="Your inbox is empty. Messages will appear here."
 * />
 * 
 * // With action button
 * <EmptyState
 *   type="data"
 *   action={<Button>Add Item</Button>}
 * />
 * 
 * // Different sizes
 * <EmptyState size="sm" type="search" />
 * <EmptyState size="lg" type="data" />
 * ```
 */
const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  (
    {
      className,
      size,
      icon: customIcon,
      title: customTitle,
      description: customDescription,
      action,
      type = "generic",
      ...props
    },
    ref
  ) => {
    const preset = typePresets[type]
    const IconComponent = preset.icon
    
    const icon = customIcon ?? <IconComponent className={iconVariants({ size })} aria-hidden="true" />
    const title = customTitle ?? preset.title
    const description = customDescription ?? preset.description

    return (
      <div
        ref={ref}
        role="status"
        aria-label={title}
        className={cn(emptyStateVariants({ size }), className)}
        {...props}
      >
        {icon}
        <div className="space-y-1">
          <p className={titleVariants({ size })}>{title}</p>
          {description && (
            <p className={descriptionVariants({ size })}>{description}</p>
          )}
        </div>
        {action && <div className="mt-2">{action}</div>}
      </div>
    )
  }
)
EmptyState.displayName = "EmptyState"

export { EmptyState, emptyStateVariants }
