"use client"

import * as React from "react"
import * as SwitchPrimitive from "@radix-ui/react-switch"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const switchVariants = cva(
  // Base with Pantheon motion - smooth toggle with subtle glow
  "peer inline-flex shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-[background-color,box-shadow] duration-[var(--duration-fast)] ease-[var(--ease-pantheon)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:shadow-md data-[state=checked]:shadow-primary/30 data-[state=unchecked]:bg-input hover:data-[state=unchecked]:bg-input/80",
  {
    variants: {
      size: {
        sm: "h-4 w-7",
        default: "h-5 w-9",
        lg: "h-6 w-11",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

const thumbVariants = cva(
  // Thumb with spring animation
  "pointer-events-none block rounded-full bg-background shadow-lg ring-0 transition-transform duration-[var(--duration-fast)] ease-[var(--ease-pantheon-spring)]",
  {
    variants: {
      size: {
        sm: "h-3 w-3 data-[state=checked]:translate-x-3 data-[state=unchecked]:translate-x-0",
        default: "h-4 w-4 data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0",
        lg: "h-5 w-5 data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

export interface SwitchProps
  extends React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>,
    VariantProps<typeof switchVariants> {
  label?: string
  description?: string
}

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitive.Root>,
  SwitchProps
>(({ className, size, label, description, id: providedId, ...props }, ref) => {
  const generatedId = React.useId()
  const id = providedId || generatedId

  const switchElement = (
    <SwitchPrimitive.Root
      id={id}
      className={cn(switchVariants({ size }), className)}
      {...props}
      ref={ref}
    >
      <SwitchPrimitive.Thumb className={cn(thumbVariants({ size }))} />
    </SwitchPrimitive.Root>
  )

  if (!label && !description) return switchElement

  return (
    <div className="flex items-center justify-between gap-4">
      <div className="grid gap-1">
        {label && (
          <label
            htmlFor={id}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
          >
            {label}
          </label>
        )}
        {description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
      </div>
      {switchElement}
    </div>
  )
})
Switch.displayName = SwitchPrimitive.Root.displayName

export { Switch, switchVariants }
