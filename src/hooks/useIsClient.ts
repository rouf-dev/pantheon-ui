import { useState, useEffect } from "react"

/**
 * SSR-safe check if code is running in a browser environment.
 * Returns false during server-side rendering, true in client.
 * 
 * @example
 * ```tsx
 * const isClient = useIsClient()
 * 
 * if (!isClient) {
 *   return <div>Loading...</div>
 * }
 * 
 * // Safe to use window, document, localStorage, etc.
 * return <div>Client-side content</div>
 * ```
 */
export function useIsClient(): boolean {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return isClient
}
