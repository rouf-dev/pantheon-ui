"use client"

import * as React from "react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const radioVariants = cva(
  // Pantheon motion: smooth state transitions
  "aspect-square rounded-full border ring-offset-background transition-[border-color,box-shadow,transform] duration-[var(--duration-fast)] ease-[var(--ease-pantheon)] focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 hover:border-primary/50 active:scale-95",
  {
    variants: {
      size: {
        sm: "h-4 w-4",
        default: "h-5 w-5",
        lg: "h-6 w-6",
      },
      variant: {
        default: "border-input data-[state=checked]:border-primary",
        error: "border-destructive",
      },
    },
    defaultVariants: {
      size: "default",
      variant: "default",
    },
  }
)

const indicatorVariants = cva("flex items-center justify-center", {
  variants: {
    size: {
      sm: "",
      default: "",
      lg: "",
    },
  },
  defaultVariants: { size: "default" },
})

const dotVariants = cva(
  // Pantheon motion: scale in on selection
  "rounded-full bg-primary transition-transform duration-[var(--duration-fast)] ease-[var(--ease-pantheon)] data-[state=checked]:animate-in data-[state=checked]:zoom-in-0 data-[state=checked]:duration-150",
  {
    variants: {
      size: {
        sm: "h-2 w-2",
        default: "h-2.5 w-2.5",
        lg: "h-3 w-3",
      },
    },
    defaultVariants: { size: "default" },
  }
)

interface RadioGroupProps
  extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root> {
  label?: string
  error?: string
}

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  RadioGroupProps
>(({ className, label, error, ...props }, ref) => {
  return (
    <div className="grid gap-2">
      {label && (
        <span className={cn("text-sm font-medium", error && "text-destructive")}>
          {label}
        </span>
      )}
      <RadioGroupPrimitive.Root
        className={cn("grid gap-3", className)}
        {...props}
        ref={ref}
      />
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  )
})
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName

interface RadioGroupItemProps
  extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>,
    VariantProps<typeof radioVariants> {
  label?: string
  description?: string
}

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  RadioGroupItemProps
>(({ className, size, variant, label, description, id: providedId, ...props }, ref) => {
  const generatedId = React.useId()
  const id = providedId || generatedId

  const radio = (
    <RadioGroupPrimitive.Item
      ref={ref}
      id={id}
      className={cn(radioVariants({ size, variant }), className)}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className={cn(indicatorVariants({ size }))}>
        <span className={cn(dotVariants({ size }))} />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )

  if (!label && !description) return radio

  return (
    <div className="flex items-start gap-3">
      {radio}
      <div className="grid gap-1 leading-none">
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
    </div>
  )
})
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName

export { RadioGroup, RadioGroupItem, radioVariants }
