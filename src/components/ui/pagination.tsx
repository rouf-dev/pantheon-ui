"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, MoreHorizontal } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button, type ButtonProps } from "./button"

// ============================================================================
// Pagination Root
// ============================================================================

export interface PaginationProps extends React.ComponentPropsWithoutRef<"nav"> {}

const Pagination = React.forwardRef<HTMLElement, PaginationProps>(
  ({ className, ...props }, ref) => {
    return (
      <nav
        ref={ref}
        role="navigation"
        aria-label="Pagination"
        className={cn("flex justify-center", className)}
        {...props}
      />
    )
  }
)
Pagination.displayName = "Pagination"

// ============================================================================
// Pagination Content (list container)
// ============================================================================

export interface PaginationContentProps extends React.ComponentPropsWithoutRef<"ul"> {}

const PaginationContent = React.forwardRef<HTMLUListElement, PaginationContentProps>(
  ({ className, ...props }, ref) => {
    return (
      <ul
        ref={ref}
        className={cn("flex flex-row items-center gap-1", className)}
        {...props}
      />
    )
  }
)
PaginationContent.displayName = "PaginationContent"

// ============================================================================
// Pagination Item (list item wrapper)
// ============================================================================

export interface PaginationItemProps extends React.ComponentPropsWithoutRef<"li"> {}

const PaginationItem = React.forwardRef<HTMLLIElement, PaginationItemProps>(
  ({ className, ...props }, ref) => {
    return <li ref={ref} className={cn("", className)} {...props} />
  }
)
PaginationItem.displayName = "PaginationItem"

// ============================================================================
// Pagination Link (button styled as link)
// ============================================================================

export interface PaginationLinkProps
  extends Pick<ButtonProps, "size" | "disabled" | "onClick"> {
  /** Is this the current active page? */
  isActive?: boolean
  className?: string
  children?: React.ReactNode
}

const PaginationLink = React.forwardRef<HTMLButtonElement, PaginationLinkProps>(
  ({ className, isActive, size = "default", disabled, onClick, children }, ref) => {
    return (
      <Button
        ref={ref}
        variant={isActive ? "default" : "ghost"}
        size={size}
        disabled={disabled}
        onClick={onClick}
        aria-current={isActive ? "page" : undefined}
        className={cn(
          "h-9 w-9 p-0",
          isActive && "pointer-events-none",
          className
        )}
      >
        {children}
      </Button>
    )
  }
)
PaginationLink.displayName = "PaginationLink"

// ============================================================================
// Pagination Previous
// ============================================================================

export interface PaginationPreviousProps extends React.ComponentPropsWithoutRef<typeof Button> {
  /** Show "Previous" text (default: icon only) */
  showText?: boolean
}

const PaginationPrevious = React.forwardRef<HTMLButtonElement, PaginationPreviousProps>(
  ({ className, showText = false, children, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        variant="ghost"
        size="default"
        aria-label="Go to previous page"
        className={cn("gap-1 pr-2.5", showText && "pl-2.5", className)}
        {...props}
      >
        <ChevronLeft className="h-4 w-4" aria-hidden="true" />
        {showText && <span>Previous</span>}
        {children}
      </Button>
    )
  }
)
PaginationPrevious.displayName = "PaginationPrevious"

// ============================================================================
// Pagination Next
// ============================================================================

export interface PaginationNextProps extends React.ComponentPropsWithoutRef<typeof Button> {
  /** Show "Next" text (default: icon only) */
  showText?: boolean
}

const PaginationNext = React.forwardRef<HTMLButtonElement, PaginationNextProps>(
  ({ className, showText = false, children, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        variant="ghost"
        size="default"
        aria-label="Go to next page"
        className={cn("gap-1 pl-2.5", showText && "pr-2.5", className)}
        {...props}
      >
        {showText && <span>Next</span>}
        {children}
        <ChevronRight className="h-4 w-4" aria-hidden="true" />
      </Button>
    )
  }
)
PaginationNext.displayName = "PaginationNext"

// ============================================================================
// Pagination First
// ============================================================================

export interface PaginationFirstProps extends React.ComponentPropsWithoutRef<typeof Button> {}

const PaginationFirst = React.forwardRef<HTMLButtonElement, PaginationFirstProps>(
  ({ className, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        variant="ghost"
        size="default"
        aria-label="Go to first page"
        className={cn("h-9 w-9 p-0", className)}
        {...props}
      >
        <ChevronsLeft className="h-4 w-4" aria-hidden="true" />
      </Button>
    )
  }
)
PaginationFirst.displayName = "PaginationFirst"

// ============================================================================
// Pagination Last
// ============================================================================

export interface PaginationLastProps extends React.ComponentPropsWithoutRef<typeof Button> {}

const PaginationLast = React.forwardRef<HTMLButtonElement, PaginationLastProps>(
  ({ className, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        variant="ghost"
        size="default"
        aria-label="Go to last page"
        className={cn("h-9 w-9 p-0", className)}
        {...props}
      >
        <ChevronsRight className="h-4 w-4" aria-hidden="true" />
      </Button>
    )
  }
)
PaginationLast.displayName = "PaginationLast"

// ============================================================================
// Pagination Ellipsis
// ============================================================================

export interface PaginationEllipsisProps extends React.ComponentPropsWithoutRef<"span"> {}

const PaginationEllipsis = React.forwardRef<HTMLSpanElement, PaginationEllipsisProps>(
  ({ className, ...props }, ref) => {
    return (
      <span
        ref={ref}
        aria-hidden="true"
        className={cn("flex h-9 w-9 items-center justify-center", className)}
        {...props}
      >
        <MoreHorizontal className="h-4 w-4" />
        <span className="sr-only">More pages</span>
      </span>
    )
  }
)
PaginationEllipsis.displayName = "PaginationEllipsis"

export {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationFirst,
  PaginationLast,
  PaginationEllipsis,
}
