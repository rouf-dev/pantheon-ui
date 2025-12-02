"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const textareaVariants = cva(
  // Pantheon motion: smooth focus transition
  "flex w-full rounded-md border bg-background text-foreground transition-[border-color,box-shadow,background-color] duration-[var(--duration-fast)] ease-[var(--ease-pantheon)] placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 resize-none",
  {
    variants: {
      variant: {
        default:
          "border-input focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:border-primary",
        filled:
          "border-transparent bg-muted focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:bg-background focus-visible:border-primary",
        ghost:
          "border-transparent bg-transparent hover:bg-muted/50 focus-visible:bg-muted/50 focus-visible:ring-2 focus-visible:ring-ring",
        outline:
          "border-input bg-transparent focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      },
      size: {
        sm: "min-h-[60px] px-3 py-2 text-xs",
        default: "min-h-[80px] px-3 py-2 text-sm",
        lg: "min-h-[120px] px-4 py-3 text-base",
      },
      state: {
        default: "",
        error:
          "border-destructive focus-visible:ring-destructive/30 focus-visible:border-destructive",
        success:
          "border-success focus-visible:ring-success/30 focus-visible:border-success",
      },
      resize: {
        none: "resize-none",
        vertical: "resize-y",
        horizontal: "resize-x",
        both: "resize",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      state: "default",
      resize: "none",
    },
  }
)

export interface TextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "size">,
    VariantProps<typeof textareaVariants> {
  label?: string
  helperText?: string
  error?: string | boolean
  success?: string | boolean
  containerClassName?: string
  fullWidth?: boolean
  showCount?: boolean
  maxLength?: number
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      containerClassName,
      variant,
      size,
      state,
      resize,
      label,
      helperText,
      error,
      success,
      fullWidth = true,
      showCount,
      maxLength,
      id: providedId,
      value,
      defaultValue,
      onChange,
      disabled,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId()
    const id = providedId || generatedId

    const [internalValue, setInternalValue] = React.useState(defaultValue ?? "")
    const isControlled = value !== undefined
    const currentValue = isControlled ? value : internalValue
    const charCount = String(currentValue).length

    const derivedState = error ? "error" : success ? "success" : state

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (!isControlled) {
        setInternalValue(e.target.value)
      }
      onChange?.(e)
    }

    return (
      <div
        className={cn(
          "flex flex-col gap-1.5",
          fullWidth && "w-full",
          containerClassName
        )}
      >
        {label && (
          <label
            htmlFor={id}
            className={cn(
              "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
              derivedState === "error" && "text-destructive",
              derivedState === "success" && "text-success"
            )}
          >
            {label}
          </label>
        )}

        <textarea
          className={cn(
            textareaVariants({ variant, size, state: derivedState, resize }),
            className
          )}
          ref={ref}
          id={id}
          value={currentValue}
          onChange={handleChange}
          disabled={disabled}
          maxLength={maxLength}
          aria-invalid={derivedState === "error" ? true : undefined}
          aria-describedby={
            helperText || error || success ? `${id}-description` : undefined
          }
          {...props}
        />

        <div className="flex justify-between gap-2">
          {(helperText || error || success) && (
            <p
              id={`${id}-description`}
              className={cn(
                "text-xs",
                derivedState === "error" && "text-destructive",
                derivedState === "success" && "text-success",
                !derivedState || derivedState === "default"
                  ? "text-muted-foreground"
                  : ""
              )}
            >
              {typeof error === "string"
                ? error
                : typeof success === "string"
                  ? success
                  : helperText}
            </p>
          )}
          {showCount && (
            <p className="text-xs text-muted-foreground ml-auto">
              {charCount}
              {maxLength && `/${maxLength}`}
            </p>
          )}
        </div>
      </div>
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea, textareaVariants }
