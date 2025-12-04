import { useEffect, useRef } from "react"

/**
 * Runs a callback function at a specified interval with automatic cleanup.
 * Safely handles interval lifecycle and callback updates.
 * 
 * @example
 * ```tsx
 * const [count, setCount] = useState(0)
 * 
 * // Increment every second
 * useInterval(() => {
 *   setCount(c => c + 1)
 * }, 1000)
 * 
 * // Pause by passing null
 * useInterval(() => {
 *   console.log('Running')
 * }, isPaused ? null : 1000)
 * ```
 */
export function useInterval(
  callback: () => void,
  delay: number | null
): void {
  const savedCallback = useRef(callback)

  // Remember the latest callback
  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  // Set up the interval
  useEffect(() => {
    // Don't schedule if no delay is specified (allows pausing)
    if (delay === null) {
      return
    }

    const id = setInterval(() => {
      savedCallback.current()
    }, delay)

    return () => clearInterval(id)
  }, [delay])
}
