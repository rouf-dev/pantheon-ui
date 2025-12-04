import { useEffect, useRef, useState, RefObject } from "react"

/**
 * Options for Intersection Observer
 */
export interface UseIntersectionObserverOptions extends IntersectionObserverInit {
  /** Freeze the observer after first intersection */
  freezeOnceVisible?: boolean
  /** Initial visibility state (for SSR) */
  initialIsIntersecting?: boolean
}

/**
 * Return type for useIntersectionObserver
 */
export interface UseIntersectionObserverReturn {
  /** Whether the element is currently intersecting */
  isIntersecting: boolean
  /** The IntersectionObserver entry */
  entry?: IntersectionObserverEntry
}

/**
 * Observes when an element enters/exits the viewport.
 * Useful for lazy loading, infinite scroll, animations on scroll.
 * 
 * @example
 * ```tsx
 * const ref = useRef<HTMLDivElement>(null)
 * const { isIntersecting } = useIntersectionObserver(ref, {
 *   threshold: 0.5,
 *   freezeOnceVisible: true
 * })
 * 
 * return (
 *   <div ref={ref}>
 *     {isIntersecting ? <LazyImage /> : <Placeholder />}
 *   </div>
 * )
 * ```
 */
export function useIntersectionObserver<T extends HTMLElement = HTMLElement>(
  elementRef: RefObject<T>,
  options: UseIntersectionObserverOptions = {}
): UseIntersectionObserverReturn {
  const {
    threshold = 0,
    root = null,
    rootMargin = "0%",
    freezeOnceVisible = false,
    initialIsIntersecting = false,
  } = options

  const [entry, setEntry] = useState<IntersectionObserverEntry>()
  const frozen = useRef(false)

  useEffect(() => {
    const node = elementRef.current
    const hasIOSupport = typeof IntersectionObserver !== "undefined"

    if (!hasIOSupport || frozen.current || !node) {
      return
    }

    const updateEntry = ([entry]: IntersectionObserverEntry[]): void => {
      setEntry(entry)

      if (freezeOnceVisible && entry.isIntersecting) {
        frozen.current = true
      }
    }

    const observerParams = { threshold, root, rootMargin }
    const observer = new IntersectionObserver(updateEntry, observerParams)

    observer.observe(node)

    return () => observer.disconnect()
  }, [elementRef, threshold, root, rootMargin, freezeOnceVisible])

  return {
    isIntersecting: entry?.isIntersecting ?? initialIsIntersecting,
    entry,
  }
}
