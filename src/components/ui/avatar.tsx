"use client"

import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const avatarVariants = cva(
  "relative flex shrink-0 overflow-hidden rounded-full",
  {
    variants: {
      size: {
        xs: "h-6 w-6 text-xs",
        sm: "h-8 w-8 text-xs",
        default: "h-10 w-10 text-sm",
        lg: "h-14 w-14 text-base",
        xl: "h-20 w-20 text-lg",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

export interface AvatarProps
  extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>,
    VariantProps<typeof avatarVariants> {}

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  AvatarProps
>(({ className, size, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(avatarVariants({ size }), className)}
    {...props}
  />
))
Avatar.displayName = AvatarPrimitive.Root.displayName

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn("aspect-square h-full w-full object-cover", className)}
    {...props}
  />
))
AvatarImage.displayName = AvatarPrimitive.Image.displayName

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted font-medium text-muted-foreground",
      className
    )}
    {...props}
  />
))
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName

// Simple Avatar wrapper for common use case
interface SimpleAvatarProps extends VariantProps<typeof avatarVariants> {
  src?: string
  alt?: string
  fallback?: string
  className?: string
}

const SimpleAvatar = ({
  src,
  alt = "",
  fallback,
  size,
  className,
}: SimpleAvatarProps) => {
  const initials = fallback || alt
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)

  return (
    <Avatar size={size} className={className}>
      <AvatarImage src={src} alt={alt} />
      <AvatarFallback>{initials}</AvatarFallback>
    </Avatar>
  )
}

// Avatar Group
interface AvatarGroupProps {
  children: React.ReactNode
  max?: number
  className?: string
}

const AvatarGroup = ({ children, max, className }: AvatarGroupProps) => {
  const childArray = React.Children.toArray(children)
  const visibleAvatars = max ? childArray.slice(0, max) : childArray
  const remainingCount = max ? childArray.length - max : 0

  return (
    <div className={cn("flex -space-x-3", className)}>
      {visibleAvatars.map((child, index) => (
        <div
          key={index}
          className="ring-2 ring-background rounded-full"
        >
          {child}
        </div>
      ))}
      {remainingCount > 0 && (
        <div className="ring-2 ring-background rounded-full">
          <Avatar>
            <AvatarFallback className="bg-muted text-muted-foreground text-xs">
              +{remainingCount}
            </AvatarFallback>
          </Avatar>
        </div>
      )}
    </div>
  )
}

export {
  Avatar,
  AvatarImage,
  AvatarFallback,
  SimpleAvatar,
  AvatarGroup,
  avatarVariants,
}
