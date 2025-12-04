"use client"

import * as React from "react"
import { Minus, Plus } from "lucide-react"

import { cn } from "@/lib/utils"
import { Input, type InputProps } from "./input"

export interface NumberInputProps extends Omit<InputProps, "type" | "leftIcon" | "rightIcon"> {
  /** Minimum value */
  min?: number
  /** Maximum value */
  max?: number
  /** Step increment (default: 1) */
  step?: number
  /** Hide the increment/decrement buttons */
  hideControls?: boolean
  /** Position of controls: 'sides' (left/right) or 'right' (both on right) */
  controlsPosition?: "sides" | "right"
  /** Callback when value changes (parsed number, NaN if invalid) */
  onValueChange?: (value: number) => void
  /** Allow empty input (returns NaN via onValueChange) */
  allowEmpty?: boolean
}

/**
 * Number input with increment/decrement buttons.
 * Extends Input with all its features (variants, sizes, error states, etc.)
 * 
 * @example
 * ```tsx
 * // Basic usage
 * <NumberInput placeholder="0" />
 * 
 * // With min/max/step
 * <NumberInput min={0} max={100} step={5} defaultValue="50" />
 * 
 * // With value change callback
 * <NumberInput 
 *   onValueChange={(num) => console.log('Value:', num)}
 * />
 * 
 * // Controls on the right side only
 * <NumberInput controlsPosition="right" />
 * 
 * // Hidden controls (just a number input)
 * <NumberInput hideControls />
 * ```
 */
const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>(
  (
    {
      className,
      containerClassName,
      min,
      max,
      step = 1,
      hideControls = false,
      controlsPosition = "sides",
      onValueChange,
      onChange,
      value: controlledValue,
      defaultValue,
      disabled,
      allowEmpty = true,
      size,
      ...props
    },
    ref
  ) => {
    const inputRef = React.useRef<HTMLInputElement>(null)
    
    // Merge refs
    React.useImperativeHandle(ref, () => inputRef.current as HTMLInputElement)

    const getCurrentValue = React.useCallback((): number => {
      const input = inputRef.current
      if (!input) return 0
      const parsed = parseFloat(input.value)
      return isNaN(parsed) ? 0 : parsed
    }, [])

    const clampValue = React.useCallback((value: number): number => {
      let clamped = value
      if (min !== undefined) clamped = Math.max(min, clamped)
      if (max !== undefined) clamped = Math.min(max, clamped)
      return clamped
    }, [min, max])

    const updateValue = React.useCallback((newValue: number) => {
      const input = inputRef.current
      if (!input) return
      
      const clamped = clampValue(newValue)
      input.value = clamped.toString()
      
      // Trigger onChange event
      const event = new Event('input', { bubbles: true })
      input.dispatchEvent(event)
      
      onValueChange?.(clamped)
    }, [clampValue, onValueChange])

    const increment = React.useCallback(() => {
      if (disabled) return
      const current = getCurrentValue()
      updateValue(current + step)
    }, [disabled, getCurrentValue, step, updateValue])

    const decrement = React.useCallback(() => {
      if (disabled) return
      const current = getCurrentValue()
      updateValue(current - step)
    }, [disabled, getCurrentValue, step, updateValue])

    const handleChange = React.useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(e)
        
        const parsed = parseFloat(e.target.value)
        if (!isNaN(parsed)) {
          onValueChange?.(parsed)
        } else if (allowEmpty && e.target.value === "") {
          onValueChange?.(NaN)
        }
      },
      [onChange, onValueChange, allowEmpty]
    )

    const handleBlur = React.useCallback(
      (e: React.FocusEvent<HTMLInputElement>) => {
        // Clamp value on blur if not empty
        if (e.target.value !== "") {
          const parsed = parseFloat(e.target.value)
          if (!isNaN(parsed)) {
            const clamped = clampValue(parsed)
            if (clamped !== parsed) {
              e.target.value = clamped.toString()
              onValueChange?.(clamped)
            }
          }
        }
        props.onBlur?.(e)
      },
      [clampValue, onValueChange, props]
    )

    const handleKeyDown = React.useCallback(
      (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "ArrowUp") {
          e.preventDefault()
          increment()
        } else if (e.key === "ArrowDown") {
          e.preventDefault()
          decrement()
        }
        props.onKeyDown?.(e)
      },
      [increment, decrement, props]
    )

    // Button size based on input size
    const buttonSize = {
      sm: "h-6 w-6",
      default: "h-8 w-8",
      lg: "h-10 w-10",
      xl: "h-12 w-12",
    }[size ?? "default"]

    const iconSize = {
      sm: "h-3 w-3",
      default: "h-4 w-4",
      lg: "h-5 w-5",
      xl: "h-6 w-6",
    }[size ?? "default"]

    const ControlButton = ({
      onClick,
      children,
      label,
    }: {
      onClick: () => void
      children: React.ReactNode
      label: string
    }) => (
      <button
        type="button"
        onClick={onClick}
        disabled={disabled}
        className={cn(
          "inline-flex items-center justify-center",
          "text-muted-foreground hover:text-foreground hover:bg-muted/50",
          "transition-colors rounded-md",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent",
          buttonSize
        )}
        aria-label={label}
        tabIndex={-1}
      >
        {children}
      </button>
    )

    const DecrementButton = (
      <ControlButton onClick={decrement} label="Decrease value">
        <Minus className={iconSize} aria-hidden="true" />
      </ControlButton>
    )

    const IncrementButton = (
      <ControlButton onClick={increment} label="Increase value">
        <Plus className={iconSize} aria-hidden="true" />
      </ControlButton>
    )

    // Controls on right side (stacked)
    const RightControls = (
      <div className="flex flex-col -space-y-px">
        <button
          type="button"
          onClick={increment}
          disabled={disabled}
          className={cn(
            "inline-flex items-center justify-center h-1/2 px-1",
            "text-muted-foreground hover:text-foreground hover:bg-muted/50",
            "transition-colors rounded-t-md border-l border-b border-input",
            "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset",
            "disabled:opacity-50 disabled:cursor-not-allowed"
          )}
          aria-label="Increase value"
          tabIndex={-1}
        >
          <Plus className="h-3 w-3" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={decrement}
          disabled={disabled}
          className={cn(
            "inline-flex items-center justify-center h-1/2 px-1",
            "text-muted-foreground hover:text-foreground hover:bg-muted/50",
            "transition-colors rounded-b-md border-l border-input",
            "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset",
            "disabled:opacity-50 disabled:cursor-not-allowed"
          )}
          aria-label="Decrease value"
          tabIndex={-1}
        >
          <Minus className="h-3 w-3" aria-hidden="true" />
        </button>
      </div>
    )

    if (hideControls) {
      return (
        <Input
          ref={inputRef}
          type="number"
          min={min}
          max={max}
          step={step}
          value={controlledValue}
          defaultValue={defaultValue}
          onChange={handleChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          size={size}
          className={cn(
            // Hide native spinner buttons
            "[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
            className
          )}
          containerClassName={containerClassName}
          {...props}
        />
      )
    }

    if (controlsPosition === "right") {
      return (
        <div className={cn("relative flex", containerClassName)}>
          <Input
            ref={inputRef}
            type="number"
            min={min}
            max={max}
            step={step}
            value={controlledValue}
            defaultValue={defaultValue}
            onChange={handleChange}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            disabled={disabled}
            size={size}
            containerClassName="flex-1"
            className={cn(
              "pr-8 rounded-r-none",
              "[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
              className
            )}
            {...props}
          />
          {RightControls}
        </div>
      )
    }

    // Default: sides position
    return (
      <Input
        ref={inputRef}
        type="number"
        min={min}
        max={max}
        step={step}
        value={controlledValue}
        defaultValue={defaultValue}
        onChange={handleChange}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        size={size}
        leftIcon={DecrementButton}
        rightIcon={IncrementButton}
        className={cn(
          "text-center",
          "[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
          className
        )}
        containerClassName={containerClassName}
        {...props}
      />
    )
  }
)
NumberInput.displayName = "NumberInput"

export { NumberInput }
