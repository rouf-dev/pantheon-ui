"use client"

import * as React from "react"
import { Search, Loader2 } from "lucide-react"

import { cn } from "@/lib/utils"
import { Input, type InputProps } from "./input"

export interface SearchInputProps extends Omit<InputProps, "type" | "leftIcon" | "clearable"> {
  /** Show loading spinner instead of search icon */
  loading?: boolean
  /** Custom search icon */
  searchIcon?: React.ReactNode
  /** Custom loading icon */
  loadingIcon?: React.ReactNode
  /** Debounce delay in ms for onChange (0 = no debounce) */
  debounce?: number
  /** Callback for debounced value changes */
  onSearch?: (value: string) => void
  /** Hide the clear button */
  hideClear?: boolean
}

/**
 * Search input with icon, loading state, and optional debounce.
 * Extends Input with all its features (variants, sizes, error states, etc.)
 * 
 * @example
 * ```tsx
 * // Basic usage
 * <SearchInput placeholder="Search..." />
 * 
 * // With loading state
 * <SearchInput loading placeholder="Searching..." />
 * 
 * // With debounced search callback
 * <SearchInput 
 *   debounce={300}
 *   onSearch={(value) => console.log('Search:', value)}
 *   placeholder="Type to search..."
 * />
 * 
 * // Different sizes
 * <SearchInput size="sm" placeholder="Small search" />
 * <SearchInput size="lg" placeholder="Large search" />
 * ```
 */
const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  (
    {
      className,
      loading = false,
      searchIcon,
      loadingIcon,
      debounce = 0,
      onSearch,
      onChange,
      onClear,
      hideClear = false,
      value: controlledValue,
      defaultValue,
      ...props
    },
    ref
  ) => {
    // Track internal value for debouncing
    const [internalValue, setInternalValue] = React.useState(
      (controlledValue as string) ?? (defaultValue as string) ?? ""
    )
    const debounceRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)
    
    // Sync with controlled value
    React.useEffect(() => {
      if (controlledValue !== undefined) {
        setInternalValue(controlledValue as string)
      }
    }, [controlledValue])

    // Cleanup debounce on unmount
    React.useEffect(() => {
      return () => {
        if (debounceRef.current) {
          clearTimeout(debounceRef.current)
        }
      }
    }, [])

    const handleChange = React.useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value
        setInternalValue(newValue)
        
        // Call original onChange immediately
        onChange?.(e)
        
        // Handle debounced search
        if (onSearch && debounce > 0) {
          if (debounceRef.current) {
            clearTimeout(debounceRef.current)
          }
          debounceRef.current = setTimeout(() => {
            onSearch(newValue)
          }, debounce)
        } else if (onSearch) {
          onSearch(newValue)
        }
      },
      [onChange, onSearch, debounce]
    )

    const handleClear = React.useCallback(() => {
      setInternalValue("")
      onClear?.()
      onSearch?.("")
      
      // Clear any pending debounce
      if (debounceRef.current) {
        clearTimeout(debounceRef.current)
      }
    }, [onClear, onSearch])

    const SearchIcon = loading
      ? (loadingIcon ?? <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" aria-hidden="true" />)
      : (searchIcon ?? <Search className="h-4 w-4 text-muted-foreground" aria-hidden="true" />)

    return (
      <Input
        ref={ref}
        type="search"
        leftIcon={SearchIcon}
        clearable={!hideClear && internalValue.length > 0}
        onClear={handleClear}
        value={controlledValue !== undefined ? controlledValue : internalValue}
        onChange={handleChange}
        className={cn(
          // Hide native search cancel button (Chrome/Safari)
          "[&::-webkit-search-cancel-button]:hidden [&::-webkit-search-decoration]:hidden",
          className
        )}
        {...props}
      />
    )
  }
)
SearchInput.displayName = "SearchInput"

export { SearchInput }
