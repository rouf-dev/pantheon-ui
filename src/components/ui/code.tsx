import * as React from 'react'
import { cn } from '@/lib/utils'

export interface CodeProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Display as block (pre + code) or inline (code only)
   * @default 'inline'
   */
  variant?: 'inline' | 'block'
  /**
   * Language for syntax highlighting class
   */
  language?: string
  /**
   * Show line numbers (block only)
   * @default false
   */
  showLineNumbers?: boolean
}

/**
 * Code - Code display component
 * 
 * Features:
 * - Inline code: `<code>` styling
 * - Block code: `<pre><code>` with optional line numbers
 * - Language classes for syntax highlighters
 * - Scrollable overflow
 * 
 * @example
 * ```tsx
 * // Inline code
 * <Code>npm install pantheon-ui</Code>
 * 
 * // Block code
 * <Code variant="block" language="typescript">
 *   const greeting = "Hello World"
 *   console.log(greeting)
 * </Code>
 * 
 * // With line numbers
 * <Code variant="block" showLineNumbers>
 *   Line 1
 *   Line 2
 *   Line 3
 * </Code>
 * ```
 */
export const Code = React.forwardRef<HTMLElement, CodeProps>(
  (
    { className, variant = 'inline', language, showLineNumbers = false, children, ...props },
    ref
  ) => {
    if (variant === 'block') {
      return (
        <pre
          className={cn(
            'relative rounded-lg border bg-muted p-4',
            'overflow-x-auto',
            'text-sm',
            '[&>code]:block [&>code]:w-fit [&>code]:min-w-full',
            className
          )}
        >
          <code
            ref={ref as any}
            className={cn(
              'font-mono',
              language && `language-${language}`,
              showLineNumbers && 'pl-12'
            )}
            {...props}
          >
            {showLineNumbers ? (
              <span className="absolute left-0 top-4 flex flex-col items-end pr-4 text-muted-foreground/50 select-none">
                {children?.toString().split('\n').map((_, i) => (
                  <span key={i} className="leading-[1.5rem]">
                    {i + 1}
                  </span>
                ))}
              </span>
            ) : null}
            {children}
          </code>
        </pre>
      )
    }

    // Inline variant
    return (
      <code
        ref={ref}
        className={cn(
          'relative rounded border bg-muted px-[0.4rem] py-[0.2rem] font-mono text-sm',
          language && `language-${language}`,
          className
        )}
        {...props}
      >
        {children}
      </code>
    )
  }
)
Code.displayName = 'Code'

/**
 * InlineCode - Alias for inline code
 * 
 * @example
 * ```tsx
 * <p>Install with <InlineCode>npm install</InlineCode></p>
 * ```
 */
export const InlineCode = React.forwardRef<HTMLElement, Omit<CodeProps, 'variant'>>(
  (props, ref) => <Code ref={ref} variant="inline" {...props} />
)
InlineCode.displayName = 'InlineCode'

/**
 * CodeBlock - Alias for block code
 * 
 * @example
 * ```tsx
 * <CodeBlock language="bash" showLineNumbers>
 *   npm install @rouf-dev/pantheon-ui
 *   npm run dev
 * </CodeBlock>
 * ```
 */
export const CodeBlock = React.forwardRef<HTMLElement, Omit<CodeProps, 'variant'>>(
  (props, ref) => <Code ref={ref} variant="block" {...props} />
)
CodeBlock.displayName = 'CodeBlock'
