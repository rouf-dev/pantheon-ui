"use client"

import * as React from "react"
import { Eye, EyeOff } from "lucide-react"

import { cn } from "@/lib/utils"
import { Input, type InputProps } from "./input"

export interface PasswordInputProps extends Omit<InputProps, "type" | "rightIcon"> {
  /** Custom show password icon */
  showIcon?: React.ReactNode
  /** Custom hide password icon */
  hideIcon?: React.ReactNode
  /** Controlled visibility state */
  visible?: boolean
  /** Callback when visibility changes */
  onVisibilityChange?: (visible: boolean) => void
  /** Default visibility state (uncontrolled) */
  defaultVisible?: boolean
}

/**
 * Password input with show/hide toggle.
 * Extends Input with all its features (variants, sizes, error states, etc.)
 * 
 * @example
 * ```tsx
 * // Basic usage
 * <PasswordInput placeholder="Enter password" />
 * 
 * // With label and error
 * <PasswordInput 
 *   label="Password" 
 *   error="Password must be at least 8 characters" 
 * />
 * 
 * // Controlled visibility
 * const [visible, setVisible] = useState(false)
 * <PasswordInput 
 *   visible={visible} 
 *   onVisibilityChange={setVisible} 
 * />
 * 
 * // Custom icons
 * <PasswordInput 
 *   showIcon={<UnlockIcon />} 
 *   hideIcon={<LockIcon />} 
 * />
 * ```
 */
const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  (
    {
      className,
      showIcon,
      hideIcon,
      visible: controlledVisible,
      onVisibilityChange,
      defaultVisible = false,
      disabled,
      ...props
    },
    ref
  ) => {
    // Handle controlled/uncontrolled visibility
    const [internalVisible, setInternalVisible] = React.useState(defaultVisible)
    const isControlled = controlledVisible !== undefined
    const isVisible = isControlled ? controlledVisible : internalVisible

    const toggleVisibility = React.useCallback(() => {
      if (disabled) return
      
      const newValue = !isVisible
      if (!isControlled) {
        setInternalVisible(newValue)
      }
      onVisibilityChange?.(newValue)
    }, [isVisible, isControlled, onVisibilityChange, disabled])

    const ToggleButton = (
      <button
        type="button"
        onClick={toggleVisibility}
        disabled={disabled}
        className={cn(
          "text-muted-foreground hover:text-foreground transition-colors",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm",
          "disabled:opacity-50 disabled:cursor-not-allowed"
        )}
        aria-label={isVisible ? "Hide password" : "Show password"}
        tabIndex={-1}
      >
        {isVisible 
          ? (hideIcon ?? <EyeOff className="h-4 w-4" aria-hidden="true" />)
          : (showIcon ?? <Eye className="h-4 w-4" aria-hidden="true" />)
        }
      </button>
    )

    return (
      <Input
        ref={ref}
        type={isVisible ? "text" : "password"}
        rightIcon={ToggleButton}
        disabled={disabled}
        className={className}
        {...props}
      />
    )
  }
)
PasswordInput.displayName = "PasswordInput"

export { PasswordInput }
