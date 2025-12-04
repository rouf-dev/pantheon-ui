import { useEffect } from "react"

/**
 * Options for keyboard shortcut hook
 */
export interface UseKeyboardShortcutOptions {
  /** Whether the shortcut is enabled */
  enabled?: boolean
  /** Prevent default browser behavior */
  preventDefault?: boolean
  /** Stop event propagation */
  stopPropagation?: boolean
  /** Enable shortcut only when a specific element is focused */
  target?: HTMLElement | null
}

/**
 * Key modifier mapping for cross-platform support
 */
const isMac = typeof window !== "undefined" && /Mac|iPod|iPhone|iPad/.test(window.navigator.platform)

/**
 * Listens for keyboard shortcuts (⌘K, Ctrl+K, Escape, etc.)
 * Automatically handles Mac (⌘) vs Windows/Linux (Ctrl) differences.
 * 
 * @example
 * ```tsx
 * // Command/Ctrl + K
 * useKeyboardShortcut(['meta', 'k'], () => setCommandPaletteOpen(true))
 * 
 * // Escape key
 * useKeyboardShortcut(['Escape'], () => setModalOpen(false))
 * 
 * // Shift + ?
 * useKeyboardShortcut(['shift', '?'], () => setHelpOpen(true))
 * ```
 */
export function useKeyboardShortcut(
  keys: string[],
  callback: (event: KeyboardEvent) => void,
  options: UseKeyboardShortcutOptions = {}
): void {
  const {
    enabled = true,
    preventDefault = true,
    stopPropagation = false,
    target,
  } = options

  useEffect(() => {
    if (!enabled) return

    const handleKeyDown = (event: KeyboardEvent) => {
      // Check if all keys in the combination are pressed
      const keysPressed = keys.every((key) => {
        const lowerKey = key.toLowerCase()

        // Handle modifier keys
        if (lowerKey === "ctrl" || lowerKey === "control") {
          return event.ctrlKey
        }
        if (lowerKey === "shift") {
          return event.shiftKey
        }
        if (lowerKey === "alt" || lowerKey === "option") {
          return event.altKey
        }
        if (lowerKey === "meta" || lowerKey === "cmd" || lowerKey === "command") {
          return event.metaKey
        }

        // Handle regular keys (case-insensitive)
        return event.key.toLowerCase() === lowerKey
      })

      if (keysPressed) {
        if (preventDefault) {
          event.preventDefault()
        }
        if (stopPropagation) {
          event.stopPropagation()
        }
        callback(event)
      }
    }

    const targetElement = target || document

    targetElement.addEventListener("keydown", handleKeyDown as EventListener)

    return () => {
      targetElement.removeEventListener("keydown", handleKeyDown as EventListener)
    }
  }, [keys, callback, enabled, preventDefault, stopPropagation, target])
}

/**
 * Formats keyboard shortcut keys for display
 * Converts 'meta' to ⌘ on Mac or Ctrl on Windows/Linux
 * 
 * @example
 * ```tsx
 * formatShortcutKeys(['meta', 'k']) // "⌘K" on Mac, "Ctrl+K" on Windows
 * formatShortcutKeys(['shift', '?']) // "Shift+?"
 * ```
 */
export function formatShortcutKeys(keys: string[]): string {
  return keys
    .map((key) => {
      const lowerKey = key.toLowerCase()

      if (lowerKey === "meta" || lowerKey === "cmd" || lowerKey === "command") {
        return isMac ? "⌘" : "Ctrl"
      }
      if (lowerKey === "ctrl" || lowerKey === "control") {
        return "Ctrl"
      }
      if (lowerKey === "shift") {
        return "Shift"
      }
      if (lowerKey === "alt" || lowerKey === "option") {
        return isMac ? "⌥" : "Alt"
      }

      // Capitalize first letter for display
      return key.charAt(0).toUpperCase() + key.slice(1)
    })
    .join(isMac ? "" : "+")
}
