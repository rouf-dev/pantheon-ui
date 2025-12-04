import { useEffect, EffectCallback } from "react"

/**
 * Runs an effect only once when the component mounts.
 * Syntactic sugar for useEffect with empty dependency array.
 * 
 * @example
 * ```tsx
 * useOnMount(() => {
 *   console.log('Component mounted')
 *   fetchInitialData()
 * })
 * ```
 */
export function useOnMount(effect: EffectCallback): void {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(effect, [])
}
