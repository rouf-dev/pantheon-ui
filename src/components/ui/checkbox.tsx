"use client"

import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const CheckIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-3.5 w-3.5"
  >
    <path d="M20 6 9 17l-5-5" />
  </svg>
)

const MinusIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-3.5 w-3.5"
  >
    <path d="M5 12h14" />
  </svg>
)

const checkboxVariants = cva(
  // Base with Pantheon motion - satisfying check animation
  "peer shrink-0 rounded border ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-[transform,background-color,border-color,box-shadow] duration-[var(--duration-fast)] ease-[var(--ease-pantheon)] hover:border-primary/50 active:scale-95 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground data-[state=checked]:border-primary data-[state=checked]:shadow-sm data-[state=checked]:shadow-primary/25 data-[state=indeterminate]:bg-primary data-[state=indeterminate]:text-primary-foreground data-[state=indeterminate]:border-primary",
  {
    variants: {
      size: {
        sm: "h-4 w-4",
        default: "h-5 w-5",
        lg: "h-6 w-6",
      },
      variant: {
        default: "border-input",
        error: "border-destructive hover:border-destructive data-[state=checked]:bg-destructive data-[state=checked]:border-destructive data-[state=checked]:shadow-destructive/25",
        success: "border-success hover:border-success data-[state=checked]:bg-success data-[state=checked]:border-success data-[state=checked]:shadow-success/25",
      },
    },
    defaultVariants: {
      size: "default",
      variant: "default",
    },
  }
)

export interface CheckboxProps
  extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>,
    VariantProps<typeof checkboxVariants> {
  label?: string
  description?: string
  error?: string | boolean
}

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(({ className, size, variant, label, description, error, id: providedId, ...props }, ref) => {
  const generatedId = React.useId()
  const id = providedId || generatedId
  const derivedVariant = error ? "error" : variant

  const checkbox = (
    <CheckboxPrimitive.Root
      ref={ref}
      id={id}
      className={cn(checkboxVariants({ size, variant: derivedVariant }), className)}
      {...props}
    >
      <CheckboxPrimitive.Indicator 
        className="flex items-center justify-center text-current animate-in zoom-in-75 duration-[var(--duration-fast)] ease-[var(--ease-pantheon-spring)]"
      >
        {props.checked === "indeterminate" ? <MinusIcon /> : <CheckIcon />}
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )

  if (!label && !description) return checkbox

  return (
    <div className="flex items-start gap-3">
      {checkbox}
      <div className="grid gap-1 leading-none">
        {label && (
          <label
            htmlFor={id}
            className={cn(
              "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer",
              derivedVariant === "error" && "text-destructive"
            )}
          >
            {label}
          </label>
        )}
        {(description || error) && (
          <p className={cn("text-xs", error ? "text-destructive" : "text-muted-foreground")}>
            {typeof error === "string" ? error : description}
          </p>
        )}
      </div>
    </div>
  )
})
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox, checkboxVariants }
