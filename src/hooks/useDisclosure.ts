"use client"

import * as React from "react"

export interface UseDisclosureProps {
  /** Initial open state */
  defaultOpen?: boolean
  /** Controlled open state */
  open?: boolean
  /** Callback when disclosure opens */
  onOpen?: () => void
  /** Callback when disclosure closes */
  onClose?: () => void
  /** Callback when disclosure toggles (receives new state) */
  onToggle?: (isOpen: boolean) => void
}

export interface UseDisclosureReturn {
  /** Current open state */
  isOpen: boolean
  /** Open the disclosure */
  open: () => void
  /** Close the disclosure */
  close: () => void
  /** Toggle the disclosure */
  toggle: () => void
  /** Set open state directly */
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

/**
 * Hook for managing open/close state with callbacks.
 * Perfect for modals, drawers, dropdowns, accordions.
 * 
 * @example
 * ```tsx
 * // Basic usage
 * const { isOpen, open, close, toggle } = useDisclosure()
 * 
 * <Button onClick={open}>Open Modal</Button>
 * <Dialog open={isOpen} onOpenChange={setOpen}>...</Dialog>
 * 
 * // With callbacks
 * const disclosure = useDisclosure({
 *   onOpen: () => console.log('Opened!'),
 *   onClose: () => console.log('Closed!'),
 * })
 * 
 * // Controlled mode
 * const [isOpen, setIsOpen] = useState(false)
 * const disclosure = useDisclosure({ open: isOpen, onToggle: setIsOpen })
 * ```
 */
export function useDisclosure(props: UseDisclosureProps = {}): UseDisclosureReturn {
  const { defaultOpen = false, open: controlledOpen, onOpen, onClose, onToggle } = props
  
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen)
  
  // Determine if controlled or uncontrolled
  const isControlled = controlledOpen !== undefined
  const isOpen = isControlled ? controlledOpen : uncontrolledOpen
  
  const open = React.useCallback(() => {
    if (!isControlled) {
      setUncontrolledOpen(true)
    }
    onOpen?.()
    onToggle?.(true)
  }, [isControlled, onOpen, onToggle])
  
  const close = React.useCallback(() => {
    if (!isControlled) {
      setUncontrolledOpen(false)
    }
    onClose?.()
    onToggle?.(false)
  }, [isControlled, onClose, onToggle])
  
  const toggle = React.useCallback(() => {
    if (isOpen) {
      close()
    } else {
      open()
    }
  }, [isOpen, open, close])
  
  const setOpen = React.useCallback((value: React.SetStateAction<boolean>) => {
    const nextValue = typeof value === 'function' ? value(isOpen) : value
    if (nextValue) {
      open()
    } else {
      close()
    }
  }, [isOpen, open, close])
  
  return {
    isOpen,
    open,
    close,
    toggle,
    setOpen,
  }
}
