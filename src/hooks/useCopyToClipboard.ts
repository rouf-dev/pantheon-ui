"use client"

import * as React from "react"

export interface UseCopyToClipboardReturn {
  /** Copy text to clipboard */
  copy: (text: string) => Promise<boolean>
  /** Whether the last copy was successful */
  copied: boolean
  /** Error if copy failed */
  error: Error | null
  /** Reset the copied state */
  reset: () => void
}

export interface UseCopyToClipboardOptions {
  /** Duration in ms to show "copied" state (default: 2000) */
  timeout?: number
  /** Callback on successful copy */
  onSuccess?: (text: string) => void
  /** Callback on failed copy */
  onError?: (error: Error) => void
}

/**
 * Hook for copying text to clipboard with feedback state.
 * 
 * @example
 * ```tsx
 * // Basic usage
 * const { copy, copied } = useCopyToClipboard()
 * 
 * <Button onClick={() => copy('Hello World!')}>
 *   {copied ? 'Copied!' : 'Copy'}
 * </Button>
 * 
 * // With callbacks
 * const { copy } = useCopyToClipboard({
 *   onSuccess: () => toast.success('Copied!'),
 *   onError: () => toast.error('Failed to copy'),
 * })
 * 
 * // Custom timeout
 * const { copy, copied } = useCopyToClipboard({ timeout: 3000 })
 * ```
 */
export function useCopyToClipboard(
  options: UseCopyToClipboardOptions = {}
): UseCopyToClipboardReturn {
  const { timeout = 2000, onSuccess, onError } = options
  
  const [copied, setCopied] = React.useState(false)
  const [error, setError] = React.useState<Error | null>(null)
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)
  
  // Cleanup timeout on unmount
  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])
  
  const copy = React.useCallback(async (text: string): Promise<boolean> => {
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    
    // Reset states
    setCopied(false)
    setError(null)
    
    try {
      // Check for clipboard API support
      if (!navigator?.clipboard) {
        throw new Error("Clipboard API not supported")
      }
      
      await navigator.clipboard.writeText(text)
      setCopied(true)
      onSuccess?.(text)
      
      // Auto-reset after timeout
      timeoutRef.current = setTimeout(() => {
        setCopied(false)
      }, timeout)
      
      return true
    } catch (err) {
      const error = err instanceof Error ? err : new Error("Failed to copy")
      setError(error)
      onError?.(error)
      return false
    }
  }, [timeout, onSuccess, onError])
  
  const reset = React.useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    setCopied(false)
    setError(null)
  }, [])
  
  return {
    copy,
    copied,
    error,
    reset,
  }
}
