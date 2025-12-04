import { useEffect, useRef } from "react"

/**
 * Runs a callback function after a specified delay with automatic cleanup.
 * Safely handles timeout lifecycle and callback updates.
 * 
 * @example
 * ```tsx
 * const [showMessage, setShowMessage] = useState(false)
 * 
 * useTimeout(() => {
 *   setShowMessage(true)
 * }, 3000)
 * 
 * // Cancel by passing null
 * useTimeout(() => {
 *   console.log('This will run')
 * }, shouldRun ? 1000 : null)
 * ```
 */
export function useTimeout(
  callback: () => void,
  delay: number | null
): void {
  const savedCallback = useRef(callback)

  // Remember the latest callback
  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  // Set up the timeout
  useEffect(() => {
    // Don't schedule if no delay is specified (allows canceling)
    if (delay === null) {
      return
    }

    const id = setTimeout(() => {
      savedCallback.current()
    }, delay)

    return () => clearTimeout(id)
  }, [delay])
}
