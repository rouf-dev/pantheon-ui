import { useEffect, useState } from "react"

export type ColorScheme = "light" | "dark"

/**
 * Detects the user's system color scheme preference.
 * Automatically updates when the system preference changes.
 * 
 * @example
 * ```tsx
 * const colorScheme = usePrefersColorScheme()
 * // Returns 'light' or 'dark' based on system preference
 * 
 * return (
 *   <div className={colorScheme === 'dark' ? 'dark-theme' : 'light-theme'}>
 *     Content
 *   </div>
 * )
 * ```
 */
export function usePrefersColorScheme(): ColorScheme {
  const [colorScheme, setColorScheme] = useState<ColorScheme>(() => {
    // SSR safety
    if (typeof window === "undefined") {
      return "light"
    }

    // Check system preference
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light"
  })

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")

    const handleChange = (e: MediaQueryListEvent) => {
      setColorScheme(e.matches ? "dark" : "light")
    }

    // Modern browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleChange)
      return () => mediaQuery.removeEventListener("change", handleChange)
    }
    // Legacy browsers
    else {
      // @ts-ignore - deprecated but needed for old browsers
      mediaQuery.addListener(handleChange)
      // @ts-ignore
      return () => mediaQuery.removeListener(handleChange)
    }
  }, [])

  return colorScheme
}
