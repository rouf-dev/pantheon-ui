"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { motion } from "motion/react"

import { cn } from "@/lib/utils"
import {
  type FormAnimation,
  subtleShake,
  flashAttention,
  springs,
  tweens,
} from "@/lib/motion"

/**
 * Clear button for clearable inputs
 */
const ClearButton = ({
  onClick,
  className,
}: {
  onClick: () => void
  className?: string
}) => (
  <button
    type="button"
    onClick={onClick}
    className={cn(
      "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors",
      "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm",
      className
    )}
    aria-label="Clear input"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="m15 9-6 6" />
      <path d="m9 9 6 6" />
    </svg>
  </button>
)

const inputVariants = cva(
  // Pantheon motion: subtle glow on focus
  "flex w-full rounded-md border bg-background text-foreground transition-[border-color,box-shadow,background-color] duration-[var(--duration-fast)] ease-[var(--ease-pantheon)] file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
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
        sm: "h-8 px-3 text-xs",
        default: "h-10 px-3 py-2 text-sm",
        lg: "h-12 px-4 text-base",
        xl: "h-14 px-5 text-lg",
      },
      state: {
        default: "",
        error:
          "border-destructive focus-visible:ring-destructive/30 focus-visible:border-destructive",
        success:
          "border-success focus-visible:ring-success/30 focus-visible:border-success",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      state: "default",
    },
  }
)

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {
  /** Label text displayed above the input */
  label?: string
  /** Helper text displayed below the input */
  helperText?: string
  /** Error message - also sets error state automatically */
  error?: string | boolean
  /** Success message - also sets success state automatically */
  success?: string | boolean
  /** Icon element to render at the start of the input */
  leftIcon?: React.ReactNode
  /** Icon element to render at the end of the input */
  rightIcon?: React.ReactNode
  /** Show clear button when input has value */
  clearable?: boolean
  /** Callback when clear button is clicked */
  onClear?: () => void
  /** Container className for the wrapper div */
  containerClassName?: string
  /** Make the input take full width */
  fullWidth?: boolean
  /**
   * Animation to play when error state is triggered
   * @default 'shake' - Subtle horizontal shake
   * - 'shake': Quick horizontal vibration (±3px)
   * - 'flash': Brief background highlight
   * - 'none': No animation
   * - false: Explicitly disable error animation
   */
  errorAnimation?: FormAnimation | false
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      containerClassName,
      type = "text",
      variant,
      size,
      state,
      label,
      helperText,
      error,
      success,
      leftIcon,
      rightIcon,
      clearable,
      onClear,
      fullWidth = true,
      id: providedId,
      value,
      defaultValue,
      onChange,
      disabled,
      errorAnimation = "shake",
      ...props
    },
    ref
  ) => {
    // Generate stable ID for label association
    const generatedId = React.useId()
    const id = providedId || generatedId

    // Track internal value for clearable functionality
    const [internalValue, setInternalValue] = React.useState(
      defaultValue ?? ""
    )
    const isControlled = value !== undefined
    const currentValue = isControlled ? value : internalValue
    
    // Track if error just appeared (for animation trigger)
    const [shouldAnimateError, setShouldAnimateError] = React.useState(false)
    const prevErrorRef = React.useRef<string | boolean | undefined>(error)
    
    React.useEffect(() => {
      // Trigger animation only when error appears (not on mount with existing error)
      if (error && !prevErrorRef.current) {
        setShouldAnimateError(true)
        // Reset after animation duration
        const timer = setTimeout(() => setShouldAnimateError(false), 500)
        return () => clearTimeout(timer)
      }
      prevErrorRef.current = error
    }, [error])

    // Determine state from error/success props
    const derivedState = error
      ? "error"
      : success
        ? "success"
        : state

    // Handle input change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!isControlled) {
        setInternalValue(e.target.value)
      }
      onChange?.(e)
    }

    // Handle clear
    const handleClear = () => {
      if (!isControlled) {
        setInternalValue("")
      }
      onClear?.()
      // Trigger onChange with empty value for controlled inputs
      if (onChange) {
        const event = {
          target: { value: "" },
          currentTarget: { value: "" },
        } as React.ChangeEvent<HTMLInputElement>
        onChange(event)
      }
    }

    const hasValue = currentValue !== "" && currentValue !== undefined
    const showClearButton = clearable && hasValue && !disabled

    // Adjust padding based on icons
    const inputPaddingLeft = leftIcon ? "pl-10" : undefined
    const inputPaddingRight =
      rightIcon || showClearButton ? "pr-10" : undefined
    
    // Determine animation variants and props for error state
    const getErrorAnimationProps = () => {
      if (errorAnimation === false || errorAnimation === 'none' || !shouldAnimateError) {
        return {}
      }
      
      switch (errorAnimation) {
        case 'shake':
          return {
            animate: 'shake',
            variants: subtleShake,
            transition: springs.snappy,
          }
        case 'flash':
          return {
            animate: 'flash',
            variants: flashAttention,
            transition: tweens.fast,
          }
        default:
          return {}
      }
    }
    
    const errorMotionProps = getErrorAnimationProps()

    return (
      <div
        className={cn(
          "flex flex-col gap-1.5",
          fullWidth && "w-full",
          containerClassName
        )}
      >
        {/* Label */}
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

        {/* Input wrapper - with motion for error animation */}
        <motion.div 
          className="relative"
          {...errorMotionProps}
        >
          {/* Left icon */}
          {leftIcon && (
            <span
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none [&_svg]:size-4"
              aria-hidden="true"
            >
              {leftIcon}
            </span>
          )}

          {/* Input element */}
          <input
            type={type}
            className={cn(
              inputVariants({ variant, size, state: derivedState }),
              inputPaddingLeft,
              inputPaddingRight,
              className
            )}
            ref={ref}
            id={id}
            value={currentValue}
            onChange={handleChange}
            disabled={disabled}
            aria-invalid={derivedState === "error" ? true : undefined}
            aria-describedby={
              helperText || error || success
                ? `${id}-description`
                : undefined
            }
            {...props}
          />

          {/* Right icon or clear button */}
          {showClearButton ? (
            <ClearButton onClick={handleClear} />
          ) : (
            rightIcon && (
              <span
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none [&_svg]:size-4"
                aria-hidden="true"
              >
                {rightIcon}
              </span>
            )
          )}
        </motion.div>

        {/* Helper text / Error / Success message */}
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
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input, inputVariants }
