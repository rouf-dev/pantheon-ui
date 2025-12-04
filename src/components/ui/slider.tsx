"use client"

import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "@/lib/utils"

export interface SliderProps
  extends React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> {
  /** Show value label above thumb */
  showValue?: boolean
  /** Format function for value label */
  formatValue?: (value: number) => string
}

/**
 * Slider component for selecting values from a range.
 * Built on Radix UI Slider primitive.
 * 
 * @example
 * ```tsx
 * // Basic usage
 * <Slider defaultValue={[50]} max={100} step={1} />
 * 
 * // Range slider
 * <Slider defaultValue={[25, 75]} max={100} />
 * 
 * // With value display
 * <Slider 
 *   defaultValue={[50]} 
 *   max={100} 
 *   showValue 
 * />
 * 
 * // Custom value format
 * <Slider 
 *   defaultValue={[500]} 
 *   max={1000}
 *   step={50}
 *   showValue
 *   formatValue={(v) => `$${v}`}
 * />
 * 
 * // Controlled
 * const [value, setValue] = useState([50])
 * <Slider value={value} onValueChange={setValue} max={100} />
 * ```
 */
const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  SliderProps
>(({ className, showValue = false, formatValue, ...props }, ref) => {
  const [localValue, setLocalValue] = React.useState<number[]>(
    props.value ?? props.defaultValue ?? [0]
  )

  // Sync with controlled value
  React.useEffect(() => {
    if (props.value !== undefined) {
      setLocalValue(props.value)
    }
  }, [props.value])

  const handleValueChange = (value: number[]) => {
    setLocalValue(value)
    props.onValueChange?.(value)
  }

  const displayValue = (value: number) => {
    return formatValue ? formatValue(value) : value.toString()
  }

  return (
    <SliderPrimitive.Root
      ref={ref}
      className={cn(
        "relative flex w-full touch-none select-none items-center",
        className
      )}
      onValueChange={handleValueChange}
      {...props}
    >
      <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-primary/20">
        <SliderPrimitive.Range className="absolute h-full bg-primary" />
      </SliderPrimitive.Track>
      {localValue.map((value, index) => (
        <SliderPrimitive.Thumb
          key={index}
          className={cn(
            "block h-4 w-4 rounded-full border border-primary/50 bg-background shadow transition-colors",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            "disabled:pointer-events-none disabled:opacity-50",
            "hover:bg-primary/10",
            "relative"
          )}
        >
          {showValue && (
            <span
              className={cn(
                "absolute -top-8 left-1/2 -translate-x-1/2",
                "rounded bg-popover px-2 py-1 text-xs font-medium text-popover-foreground shadow-md",
                "pointer-events-none whitespace-nowrap"
              )}
            >
              {displayValue(value)}
            </span>
          )}
        </SliderPrimitive.Thumb>
      ))}
    </SliderPrimitive.Root>
  )
})
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
