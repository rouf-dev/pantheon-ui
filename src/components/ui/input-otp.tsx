import * as React from 'react'
import { OTPInput, OTPInputContext } from 'input-otp'
import { Dot } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface InputOTPProps {
  /**
   * Maximum number of characters
   */
  maxLength: number
  /**
   * Current value
   */
  value?: string
  /**
   * Callback when value changes
   */
  onChange?: (value: string) => void
  /**
   * Pattern for validation (regex string)
   */
  pattern?: string
  /**
   * Disable the input
   */
  disabled?: boolean
  /**
   * Text alignment in slots
   * @default 'left'
   */
  textAlign?: 'left' | 'center' | 'right'
  /**
   * Custom class name
   */
  className?: string
  /**
   * Container class name
   */
  containerClassName?: string
  /**
   * Animation on value change
   * @default 'scale'
   */
  animation?: 'scale' | 'fade' | false
  /**
   * Children (InputOTPGroup components)
   */
  children: React.ReactNode
}

/**
 * InputOTP - One-time password/2FA code input
 * 
 * Features:
 * - Auto-focus and auto-submit
 * - Paste support (splits into slots)
 * - Keyboard navigation (arrow keys)
 * - Number/text modes
 * - Animated feedback
 * - Mobile-friendly
 * 
 * @example
 * ```tsx
 * // Basic 6-digit OTP
 * <InputOTP maxLength={6} value={code} onChange={setCode}>
 *   <InputOTPGroup>
 *     <InputOTPSlot index={0} />
 *     <InputOTPSlot index={1} />
 *     <InputOTPSlot index={2} />
 *     <InputOTPSlot index={3} />
 *     <InputOTPSlot index={4} />
 *     <InputOTPSlot index={5} />
 *   </InputOTPGroup>
 * </InputOTP>
 * 
 * // With separator
 * <InputOTP maxLength={6} value={code} onChange={setCode}>
 *   <InputOTPGroup>
 *     <InputOTPSlot index={0} />
 *     <InputOTPSlot index={1} />
 *     <InputOTPSlot index={2} />
 *   </InputOTPGroup>
 *   <InputOTPSeparator />
 *   <InputOTPGroup>
 *     <InputOTPSlot index={3} />
 *     <InputOTPSlot index={4} />
 *     <InputOTPSlot index={5} />
 *   </InputOTPGroup>
 * </InputOTP>
 * 
 * // Pattern validation (digits only)
 * <InputOTP
 *   maxLength={6}
 *   pattern="^[0-9]+$"
 *   value={code}
 *   onChange={setCode}
 * >
 *   <InputOTPGroup>
 *     {Array.from({ length: 6 }).map((_, i) => (
 *       <InputOTPSlot key={i} index={i} />
 *     ))}
 *   </InputOTPGroup>
 * </InputOTP>
 * ```
 */
const InputOTP = React.forwardRef<
  React.ElementRef<typeof OTPInput>,
  InputOTPProps
>(({ className, containerClassName, animation = 'scale', ...props }, ref) => (
  <OTPInput
    ref={ref}
    containerClassName={cn(
      'flex items-center gap-2 has-[:disabled]:opacity-50',
      containerClassName
    )}
    className={cn('disabled:cursor-not-allowed', className)}
    {...props}
  />
))
InputOTP.displayName = 'InputOTP'

export interface InputOTPGroupProps extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * InputOTPGroup - Container for OTP slots
 */
const InputOTPGroup = React.forwardRef<HTMLDivElement, InputOTPGroupProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex items-center', className)} {...props} />
  )
)
InputOTPGroup.displayName = 'InputOTPGroup'

export interface InputOTPSlotProps extends React.HTMLAttributes<HTMLDivElement> {
  index: number
  /**
   * Animation on value change
   * @default 'scale'
   */
  animation?: 'scale' | 'fade' | false
}

/**
 * InputOTPSlot - Individual slot for one character
 */
const InputOTPSlot = React.forwardRef<HTMLDivElement, InputOTPSlotProps>(
  ({ index, className, animation = 'scale', ...props }, ref) => {
    const inputOTPContext = React.useContext(OTPInputContext)
    const { char, hasFakeCaret, isActive } = inputOTPContext.slots[index]

    const animationClasses = React.useMemo(() => {
      if (animation === false || !char) return ''

      switch (animation) {
        case 'scale':
          return 'motion-safe:animate-in motion-safe:zoom-in-95 motion-safe:duration-100'
        case 'fade':
          return 'motion-safe:animate-in motion-safe:fade-in motion-safe:duration-100'
        default:
          return ''
      }
    }, [animation, char])

    return (
      <div
        ref={ref}
        className={cn(
          'relative flex h-12 w-12 items-center justify-center',
          'border-y border-r border-input',
          'text-sm font-medium',
          'transition-all',
          'first:rounded-l-md first:border-l',
          'last:rounded-r-md',
          isActive && 'z-10 ring-2 ring-ring ring-offset-background',
          className
        )}
        {...props}
      >
        {char && <div className={cn('text-lg', animationClasses)}>{char}</div>}
        {hasFakeCaret && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="h-6 w-px animate-caret-blink bg-foreground duration-1000" />
          </div>
        )}
      </div>
    )
  }
)
InputOTPSlot.displayName = 'InputOTPSlot'

export interface InputOTPSeparatorProps extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * InputOTPSeparator - Visual separator between groups
 */
const InputOTPSeparator = React.forwardRef<HTMLDivElement, InputOTPSeparatorProps>(
  ({ ...props }, ref) => (
    <div ref={ref} role="separator" {...props}>
      <Dot />
    </div>
  )
)
InputOTPSeparator.displayName = 'InputOTPSeparator'

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator }
