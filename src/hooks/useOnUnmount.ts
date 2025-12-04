import { useEffect, useRef } from "react"

/**
 * Runs a cleanup function only when the component unmounts.
 * Useful for cleanup operations like removing event listeners.
 * 
 * @example
 * ```tsx
 * useOnUnmount(() => {
 *   console.log('Component unmounting')
 *   cleanupResources()
 * })
 * ```
 */
export function useOnUnmount(cleanup: () => void): void {
  const cleanupRef = useRef(cleanup)

  // Update cleanup function if it changes
  useEffect(() => {
    cleanupRef.current = cleanup
  }, [cleanup])

  // Run cleanup only on unmount
  useEffect(() => {
    return () => {
      cleanupRef.current()
    }
  }, [])
}
