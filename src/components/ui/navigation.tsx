"use client"

import * as React from "react"
import { cn } from "../../lib/utils"
import { Button } from "./button"

export interface NavItem {
  label: string
  href?: string
  onClick?: () => void
  active?: boolean
}

export interface NavigationProps extends React.HTMLAttributes<HTMLElement> {
  items: NavItem[]
  logo?: React.ReactNode
  actions?: React.ReactNode
  variant?: "default" | "glass"
}

const Navigation = React.forwardRef<HTMLElement, NavigationProps>(
  ({ className, items, logo, actions, variant = "default", ...props }, ref) => {
    return (
      <nav
        ref={ref}
        className={cn(
          "flex items-center justify-between px-6 py-4 border-b",
          variant === "glass" && "bg-white/10 backdrop-blur-lg border-white/20",
          variant === "default" && "bg-background border-border",
          className
        )}
        {...props}
      >
        {/* Logo Section */}
        {logo && <div className="flex items-center gap-2 font-bold text-lg">{logo}</div>}

        {/* Navigation Items */}
        <div className="flex items-center gap-1">
          {items.map((item, index) => (
            <Button
              key={index}
              variant={item.active ? "secondary" : "ghost"}
              size="sm"
              onClick={item.onClick}
              asChild={!!item.href}
              className={cn(item.active && "bg-secondary")}
            >
              {item.href ? (
                <a href={item.href}>{item.label}</a>
              ) : (
                <span>{item.label}</span>
              )}
            </Button>
          ))}
        </div>

        {/* Action Section */}
        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </nav>
    )
  }
)
Navigation.displayName = "Navigation"

export { Navigation }
