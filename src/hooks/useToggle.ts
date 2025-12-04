import { useState, useCallback } from "react"

/**
 * Options for toggle hook
 */
export interface UseToggleOptions {
  /** Callback when toggled on */
  onToggle?: (value: boolean) => void
  /** Callback when toggled on */
  onToggleOn?: () => void
  /** Callback when toggled off */
  onToggleOff?: () => void
}

/**
 * Return type for useToggle
 */
export interface UseToggleReturn {
  /** Current boolean value */
  value: boolean
  /** Toggle the value */
  toggle: () => void
  /** Set to true */
  setTrue: () => void
  /** Set to false */
  setFalse: () => void
  /** Set to specific value */
  setValue: (value: boolean) => void
}

/**
 * Manages a boolean state with toggle, setTrue, setFalse helpers.
 * Useful for modals, dropdowns, sidebars, etc.
 * 
 * @example
 * ```tsx
 * const { value: isOpen, toggle, setTrue: open, setFalse: close } = useToggle(false)
 * 
 * return (
 *   <>
 *     <button onClick={toggle}>Toggle Modal</button>
 *     <Modal isOpen={isOpen} onClose={close}>
 *       Content
 *     </Modal>
 *   </>
 * )
 * ```
 */
export function useToggle(
  initialValue: boolean = false,
  options: UseToggleOptions = {}
): UseToggleReturn {
  const { onToggle, onToggleOn, onToggleOff } = options
  const [value, setValue] = useState(initialValue)

  const toggle = useCallback(() => {
    setValue((prev) => {
      const next = !prev
      onToggle?.(next)
      if (next) {
        onToggleOn?.()
      } else {
        onToggleOff?.()
      }
      return next
    })
  }, [onToggle, onToggleOn, onToggleOff])

  const setTrue = useCallback(() => {
    setValue(true)
    onToggle?.(true)
    onToggleOn?.()
  }, [onToggle, onToggleOn])

  const setFalse = useCallback(() => {
    setValue(false)
    onToggle?.(false)
    onToggleOff?.()
  }, [onToggle, onToggleOff])

  const setValueCallback = useCallback((newValue: boolean) => {
    setValue(newValue)
    onToggle?.(newValue)
    if (newValue) {
      onToggleOn?.()
    } else {
      onToggleOff?.()
    }
  }, [onToggle, onToggleOn, onToggleOff])

  return {
    value,
    toggle,
    setTrue,
    setFalse,
    setValue: setValueCallback,
  }
}
