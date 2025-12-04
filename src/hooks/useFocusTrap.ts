import { useEffect, useRef, RefObject } from "react"

/**
 * Options for focus trap
 */
export interface UseFocusTrapOptions {
  /** Whether the focus trap is active */
  enabled?: boolean
  /** Restore focus to previously focused element on unmount */
  restoreFocus?: boolean
  /** Initial element to focus when trap activates */
  initialFocusRef?: RefObject<HTMLElement>
}

/**
 * Traps focus within an element (for modals, dialogs).
 * Prevents tabbing outside the container and handles Escape key.
 * 
 * @example
 * ```tsx
 * const modalRef = useRef<HTMLDivElement>(null)
 * useFocusTrap(modalRef, { enabled: isOpen })
 * 
 * return (
 *   <div ref={modalRef} role="dialog">
 *     <button>First focusable</button>
 *     <button>Last focusable</button>
 *   </div>
 * )
 * ```
 */
export function useFocusTrap<T extends HTMLElement = HTMLElement>(
  containerRef: RefObject<T>,
  options: UseFocusTrapOptions = {}
): void {
  const {
    enabled = true,
    restoreFocus = true,
    initialFocusRef,
  } = options

  const previouslyFocusedElement = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!enabled || !containerRef.current) return

    const container = containerRef.current

    // Save currently focused element
    previouslyFocusedElement.current = document.activeElement as HTMLElement

    // Get all focusable elements
    const getFocusableElements = (): HTMLElement[] => {
      const selector = [
        'a[href]',
        'button:not([disabled])',
        'textarea:not([disabled])',
        'input:not([disabled])',
        'select:not([disabled])',
        '[tabindex]:not([tabindex="-1"])',
      ].join(', ')

      return Array.from(container.querySelectorAll(selector))
    }

    // Focus initial element or first focusable
    const focusableElements = getFocusableElements()
    if (initialFocusRef?.current) {
      initialFocusRef.current.focus()
    } else if (focusableElements.length > 0) {
      focusableElements[0]?.focus()
    }

    // Handle tab key to trap focus
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return

      const focusableElements = getFocusableElements()
      const firstElement = focusableElements[0]
      const lastElement = focusableElements[focusableElements.length - 1]

      if (event.shiftKey) {
        // Shift + Tab: moving backwards
        if (document.activeElement === firstElement) {
          event.preventDefault()
          lastElement?.focus()
        }
      } else {
        // Tab: moving forwards
        if (document.activeElement === lastElement) {
          event.preventDefault()
          firstElement?.focus()
        }
      }
    }

    container.addEventListener('keydown', handleKeyDown)

    return () => {
      container.removeEventListener('keydown', handleKeyDown)

      // Restore focus to previously focused element
      if (restoreFocus && previouslyFocusedElement.current) {
        previouslyFocusedElement.current.focus()
      }
    }
  }, [enabled, containerRef, restoreFocus, initialFocusRef])
}
