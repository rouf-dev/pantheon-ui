"use client"

import * as React from "react"

export interface UseLocalStorageOptions<T> {
  /** Serializer function (default: JSON.stringify) */
  serializer?: (value: T) => string
  /** Deserializer function (default: JSON.parse) */
  deserializer?: (value: string) => T
  /** Called when storage read/write fails */
  onError?: (error: Error) => void
}

type SetValue<T> = React.Dispatch<React.SetStateAction<T>>

/**
 * Hook for persisting state to localStorage with SSR safety.
 * 
 * @example
 * ```tsx
 * // Basic usage
 * const [theme, setTheme] = useLocalStorage('theme', 'light')
 * 
 * // With complex objects
 * const [settings, setSettings] = useLocalStorage('settings', {
 *   notifications: true,
 *   darkMode: false,
 * })
 * 
 * // Update like normal useState
 * setSettings(prev => ({ ...prev, darkMode: true }))
 * 
 * // Custom serialization
 * const [date, setDate] = useLocalStorage('lastVisit', new Date(), {
 *   serializer: (d) => d.toISOString(),
 *   deserializer: (s) => new Date(s),
 * })
 * ```
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T,
  options: UseLocalStorageOptions<T> = {}
): [T, SetValue<T>] {
  const {
    serializer = JSON.stringify,
    deserializer = JSON.parse,
    onError,
  } = options
  
  // Get value from storage (SSR-safe)
  const readValue = React.useCallback((): T => {
    // Server-side: return initial value
    if (typeof window === "undefined") {
      return initialValue
    }
    
    try {
      const item = window.localStorage.getItem(key)
      return item ? (deserializer(item) as T) : initialValue
    } catch (error) {
      const err = error instanceof Error ? error : new Error("Failed to read localStorage")
      onError?.(err)
      return initialValue
    }
  }, [key, initialValue, deserializer, onError])
  
  // State to store our value
  const [storedValue, setStoredValue] = React.useState<T>(readValue)
  
  // Use ref to track if we've hydrated
  const isFirstMount = React.useRef(true)
  
  // Read from storage on mount (handles SSR hydration)
  React.useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false
      const value = readValue()
      if (value !== storedValue) {
        setStoredValue(value)
      }
    }
  }, [readValue, storedValue])
  
  // Return a wrapped version of useState's setter that persists to localStorage
  const setValue: SetValue<T> = React.useCallback(
    (value) => {
      try {
        // Allow value to be a function (like useState)
        const valueToStore = value instanceof Function ? value(storedValue) : value
        
        // Save to state
        setStoredValue(valueToStore)
        
        // Save to localStorage
        if (typeof window !== "undefined") {
          window.localStorage.setItem(key, serializer(valueToStore))
          
          // Dispatch storage event for cross-tab sync
          window.dispatchEvent(new StorageEvent("storage", {
            key,
            newValue: serializer(valueToStore),
          }))
        }
      } catch (error) {
        const err = error instanceof Error ? error : new Error("Failed to write localStorage")
        onError?.(err)
      }
    },
    [key, storedValue, serializer, onError]
  )
  
  // Listen for changes in other tabs/windows
  React.useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === key && event.newValue !== null) {
        try {
          setStoredValue(deserializer(event.newValue) as T)
        } catch (error) {
          const err = error instanceof Error ? error : new Error("Failed to parse storage event")
          onError?.(err)
        }
      }
    }
    
    window.addEventListener("storage", handleStorageChange)
    return () => window.removeEventListener("storage", handleStorageChange)
  }, [key, deserializer, onError])
  
  return [storedValue, setValue]
}

/**
 * Remove an item from localStorage.
 * Standalone function for use outside React components.
 */
export function removeLocalStorageItem(key: string): void {
  if (typeof window !== "undefined") {
    window.localStorage.removeItem(key)
    window.dispatchEvent(new StorageEvent("storage", { key, newValue: null }))
  }
}
