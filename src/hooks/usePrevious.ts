import { useEffect, useRef } from "react"

/**
 * Returns the previous value of a state or prop.
 * Useful for comparisons or animations based on value changes.
 * 
 * @example
 * ```tsx
 * const [count, setCount] = useState(0)
 * const previousCount = usePrevious(count)
 * 
 * return (
 *   <div>
 *     Current: {count}, Previous: {previousCount}
 *     <button onClick={() => setCount(count + 1)}>Increment</button>
 *   </div>
 * )
 * ```
 */
export function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T | undefined>(undefined)

  useEffect(() => {
    ref.current = value
  }, [value])

  return ref.current
}
