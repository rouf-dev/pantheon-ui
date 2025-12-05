import * as React from 'react'
import { cn } from '@/lib/utils'
import { Button, type ButtonProps } from './button'
import { Check, Copy } from 'lucide-react'
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard'

export interface CopyButtonProps extends Omit<ButtonProps, 'onClick'> {
  /**
   * Text to copy to clipboard
   */
  value: string
  /**
   * Duration to show success state (ms)
   * @default 2000
   */
  successDuration?: number
  /**
   * Custom success icon
   */
  successIcon?: React.ReactNode
  /**
   * Custom copy icon
   */
  copyIcon?: React.ReactNode
  /**
   * Success message (for screen readers)
   * @default 'Copied!'
   */
  successMessage?: string
  /**
   * Callback when copy succeeds
   */
  onCopySuccess?: () => void
  /**
   * Callback when copy fails
   */
  onCopyError?: (error: Error) => void
}

/**
 * CopyButton - One-click copy with visual feedback
 * 
 * Features:
 * - Visual feedback (check icon on success)
 * - Uses clipboard API (useCopyToClipboard hook)
 * - Accessible (screen reader announcements)
 * - Customizable icons and duration
 * - Error handling
 * 
 * @example
 * ```tsx
 * // Basic usage
 * <CopyButton value="npm install @rouf-dev/pantheon-ui" />
 * 
 * // With custom styling
 * <CopyButton 
 *   value={code} 
 *   variant="outline" 
 *   size="sm"
 *   className="absolute top-2 right-2"
 * />
 * 
 * // With callbacks
 * <CopyButton
 *   value={apiKey}
 *   onCopySuccess={() => toast.success('API key copied!')}
 *   onCopyError={(err) => toast.error('Failed to copy')}
 * />
 * ```
 */
export const CopyButton = React.forwardRef<HTMLButtonElement, CopyButtonProps>(
  (
    {
      value,
      successDuration = 2000,
      successIcon,
      copyIcon,
      successMessage = 'Copied!',
      onCopySuccess,
      onCopyError,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const { copy, copied } = useCopyToClipboard({ timeout: successDuration })

    const handleCopy = async () => {
      try {
        await copy(value)
        onCopySuccess?.()
      } catch (error) {
        onCopyError?.(error as Error)
      }
    }

    const defaultCopyIcon = <Copy className="h-4 w-4" />
    const defaultSuccessIcon = <Check className="h-4 w-4" />

    return (
      <Button
        ref={ref}
        type="button"
        variant="ghost"
        size="icon"
        className={cn('h-8 w-8', className)}
        onClick={handleCopy}
        disabled={copied}
        {...props}
      >
        {copied ? (
          <>
            {successIcon || defaultSuccessIcon}
            <span className="sr-only">{successMessage}</span>
          </>
        ) : (
          <>
            {copyIcon || defaultCopyIcon}
            <span className="sr-only">Copy to clipboard</span>
          </>
        )}
        {children}
      </Button>
    )
  }
)
CopyButton.displayName = 'CopyButton'

export interface CopyTextProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Text to display and copy
   */
  value: string
  /**
   * Whether to truncate long text
   * @default true
   */
  truncate?: boolean
  /**
   * Whether to show copy button on hover only
   * @default false
   */
  showOnHover?: boolean
}

/**
 * CopyText - Text with inline copy button
 * 
 * Combines text display with CopyButton for common patterns
 * 
 * @example
 * ```tsx
 * <CopyText value="sk-1234567890abcdef" />
 * 
 * <CopyText 
 *   value="https://example.com/very/long/url" 
 *   showOnHover 
 *   truncate
 * />
 * ```
 */
export const CopyText = React.forwardRef<HTMLDivElement, CopyTextProps>(
  ({ value, truncate = true, showOnHover = false, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'group inline-flex items-center gap-2 rounded-md border bg-muted px-3 py-1.5',
          className
        )}
        {...props}
      >
        <code
          className={cn(
            'font-mono text-sm',
            truncate && 'max-w-[300px] truncate'
          )}
        >
          {value}
        </code>
        <CopyButton
          value={value}
          size="sm"
          className={cn(
            'h-6 w-6 shrink-0',
            showOnHover && 'opacity-0 transition-opacity group-hover:opacity-100'
          )}
        />
      </div>
    )
  }
)
CopyText.displayName = 'CopyText'
