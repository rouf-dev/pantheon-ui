import { useState, useCallback, Dispatch, SetStateAction } from "react"

/**
 * Options for sessionStorage hook
 */
export interface UseSessionStorageOptions<T> {
  /** Serializer function (default: JSON.stringify) */
  serializer?: (value: T) => string
  /** Deserializer function (default: JSON.parse) */
  deserializer?: (value: string) => T
  /** Initial value if sessionStorage is empty */
  initialValue?: T
}

/**
 * Persists state to sessionStorage with SSR safety.
 * Similar to useState but syncs with sessionStorage.
 * Data persists only for the session (cleared when tab closes).
 * 
 * @example
 * ```tsx
 * const [token, setToken, removeToken] = useSessionStorage('auth-token', '')
 * 
 * // Set value
 * setToken('abc123')
 * 
 * // Remove value
 * removeToken()
 * ```
 */
export function useSessionStorage<T>(
  key: string,
  initialValue?: T,
  options: UseSessionStorageOptions<T> = {}
): [T | undefined, Dispatch<SetStateAction<T | undefined>>, () => void] {
  const {
    serializer = JSON.stringify,
    deserializer = JSON.parse,
  } = options

  // Get from sessionStorage or use initial value
  const [storedValue, setStoredValue] = useState<T | undefined>(() => {
    if (typeof window === "undefined") {
      return initialValue
    }

    try {
      const item = window.sessionStorage.getItem(key)
      return item ? deserializer(item) : initialValue
    } catch (error) {
      console.warn(`Error reading sessionStorage key "${key}":`, error)
      return initialValue
    }
  })

  // Wrapped setter that also updates sessionStorage
  const setValue: Dispatch<SetStateAction<T | undefined>> = useCallback(
    (value) => {
      try {
        // Allow value to be a function (same as useState)
        const valueToStore = value instanceof Function ? value(storedValue) : value

        setStoredValue(valueToStore)

        if (typeof window !== "undefined") {
          if (valueToStore === undefined) {
            window.sessionStorage.removeItem(key)
          } else {
            window.sessionStorage.setItem(key, serializer(valueToStore))
          }
        }
      } catch (error) {
        console.warn(`Error setting sessionStorage key "${key}":`, error)
      }
    },
    [key, serializer, storedValue]
  )

  // Remove value from sessionStorage
  const removeValue = useCallback(() => {
    try {
      setStoredValue(undefined)
      if (typeof window !== "undefined") {
        window.sessionStorage.removeItem(key)
      }
    } catch (error) {
      console.warn(`Error removing sessionStorage key "${key}":`, error)
    }
  }, [key])

  return [storedValue, setValue, removeValue]
}

/**
 * Standalone function to remove a sessionStorage item
 */
export function removeSessionStorageItem(key: string): void {
  try {
    if (typeof window !== "undefined") {
      window.sessionStorage.removeItem(key)
    }
  } catch (error) {
    console.warn(`Error removing sessionStorage key "${key}":`, error)
  }
}
