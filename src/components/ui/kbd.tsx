"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const kbdVariants = cva(
  "inline-flex items-center justify-center rounded border font-mono text-xs font-medium",
  {
    variants: {
      variant: {
        default: "border-border bg-muted text-muted-foreground shadow-sm",
        outline: "border-border bg-background text-foreground",
        solid: "border-primary/20 bg-primary/10 text-primary",
      },
      size: {
        sm: "h-5 min-w-5 px-1",
        default: "h-6 min-w-6 px-1.5",
        lg: "h-7 min-w-7 px-2",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface KbdProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof kbdVariants> {
  /** The keyboard keys to display (will be split by '+' for combinations) */
  keys?: string | string[]
}

/**
 * Keyboard shortcut display component.
 * Automatically formats modifier keys (⌘, ⌥, ⌃, ⇧) on macOS.
 * 
 * @example
 * ```tsx
 * // Single key
 * <Kbd>K</Kbd>
 * 
 * // Combination (auto-split by +)
 * <Kbd>⌘+K</Kbd>
 * <Kbd>Ctrl+Shift+P</Kbd>
 * 
 * // Array of keys
 * <Kbd keys={['⌘', 'K']} />
 * 
 * // Different variants
 * <Kbd variant="outline">Esc</Kbd>
 * <Kbd variant="solid">Enter</Kbd>
 * 
 * // Different sizes
 * <Kbd size="sm">A</Kbd>
 * <Kbd size="lg">Space</Kbd>
 * 
 * // With text
 * <span>Press <Kbd>⌘+K</Kbd> to search</span>
 * ```
 */
const Kbd = React.forwardRef<HTMLElement, KbdProps>(
  ({ className, variant, size, keys, children, ...props }, ref) => {
    // Parse keys from string or array
    const parsedKeys = React.useMemo(() => {
      if (keys) {
        if (Array.isArray(keys)) {
          return keys
        }
        return keys.split("+").map((k) => k.trim())
      }
      if (typeof children === "string") {
        return children.split("+").map((k) => k.trim())
      }
      return null
    }, [keys, children])

    // Map common key names to symbols
    const formatKey = (key: string): string => {
      const keyMap: Record<string, string> = {
        cmd: "⌘",
        command: "⌘",
        ctrl: "⌃",
        control: "⌃",
        opt: "⌥",
        option: "⌥",
        alt: "⌥",
        shift: "⇧",
        enter: "↵",
        return: "↵",
        delete: "⌫",
        backspace: "⌫",
        escape: "⎋",
        esc: "⎋",
        tab: "⇥",
        space: "␣",
        up: "↑",
        down: "↓",
        left: "←",
        right: "→",
      }
      
      const normalized = key.toLowerCase()
      return keyMap[normalized] ?? key
    }

    // Render multiple keys
    if (parsedKeys && parsedKeys.length > 1) {
      return (
        <span className={cn("inline-flex items-center gap-1", className)} ref={ref as any} {...props}>
          {parsedKeys.map((key, index) => (
            <kbd key={index} className={cn(kbdVariants({ variant, size }))}>
              {formatKey(key)}
            </kbd>
          ))}
        </span>
      )
    }

    // Render single key
    const content = parsedKeys?.[0] ? formatKey(parsedKeys[0]) : children

    return (
      <kbd
        ref={ref}
        className={cn(kbdVariants({ variant, size }), className)}
        {...props}
      >
        {content}
      </kbd>
    )
  }
)
Kbd.displayName = "Kbd"

export { Kbd, kbdVariants }
