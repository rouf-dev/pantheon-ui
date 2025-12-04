import { useEffect, RefObject } from "react"

/**
 * Detects clicks outside a target element.
 * Useful for closing dropdowns, menus, modals when clicking away.
 * 
 * @example
 * ```tsx
 * const ref = useRef<HTMLDivElement>(null)
 * useClickOutside(ref, () => setIsOpen(false))
 * 
 * return <div ref={ref}>Dropdown content</div>
 * ```
 */
export function useClickOutside<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  handler: (event: MouseEvent | TouchEvent) => void,
  enabled: boolean = true
): void {
  useEffect(() => {
    if (!enabled) return

    const listener = (event: MouseEvent | TouchEvent) => {
      const el = ref.current
      
      // Do nothing if clicking ref's element or descendent elements
      if (!el || el.contains(event.target as Node)) {
        return
      }

      handler(event)
    }

    document.addEventListener("mousedown", listener)
    document.addEventListener("touchstart", listener)

    return () => {
      document.removeEventListener("mousedown", listener)
      document.removeEventListener("touchstart", listener)
    }
  }, [ref, handler, enabled])
}
