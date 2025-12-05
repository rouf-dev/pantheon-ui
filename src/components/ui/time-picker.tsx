import * as React from 'react'
import { cn } from '@/lib/utils'
import { Input } from './input'
import { Popover, PopoverContent, PopoverTrigger } from './popover'
import { Button } from './button'
import { Clock, ChevronUp, ChevronDown } from 'lucide-react'

export interface TimeValue {
  hours: number
  minutes: number
  seconds?: number
}

export interface TimePickerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /**
   * Current time value
   */
  value?: TimeValue
  /**
   * Callback when time changes
   */
  onChange?: (time: TimeValue) => void
  /**
   * Whether to show seconds
   * @default false
   */
  showSeconds?: boolean
  /**
   * Use 12-hour format (AM/PM)
   * @default false
   */
  use12Hour?: boolean
  /**
   * Minute step interval
   * @default 1
   */
  minuteStep?: number
  /**
   * Second step interval
   * @default 1
   */
  secondStep?: number
  /**
   * Disable time selection
   * @default false
   */
  disabled?: boolean
  /**
   * Placeholder text
   */
  placeholder?: string
  /**
   * Animation preset
   * @default 'scale'
   */
  animation?: 'scale' | 'fade' | 'slide' | false
}

/**
 * TimePicker - Time selection component
 * 
 * Features:
 * - Hours, minutes, seconds selection
 * - 12/24 hour format
 * - Scroll or increment/decrement
 * - Configurable step intervals
 * - Keyboard accessible
 * - Mobile responsive
 * 
 * @example
 * ```tsx
 * // Basic usage
 * <TimePicker
 *   value={{ hours: 14, minutes: 30 }}
 *   onChange={(time) => console.log(time)}
 * />
 * 
 * // With seconds and 12-hour format
 * <TimePicker
 *   value={{ hours: 2, minutes: 30, seconds: 0 }}
 *   onChange={setTime}
 *   showSeconds
 *   use12Hour
 * />
 * 
 * // Custom step intervals
 * <TimePicker
 *   value={time}
 *   onChange={setTime}
 *   minuteStep={15}
 *   placeholder="Select meeting time"
 * />
 * ```
 */
export const TimePicker = React.forwardRef<HTMLDivElement, TimePickerProps>(
  (
    {
      className,
      value,
      onChange,
      showSeconds = false,
      use12Hour = false,
      minuteStep = 1,
      secondStep = 1,
      disabled = false,
      placeholder = 'Select time',
      animation = 'scale',
      ...props
    },
    ref
  ) => {
    const [open, setOpen] = React.useState(false)
    const [period, setPeriod] = React.useState<'AM' | 'PM'>('AM')

    // Convert 24h to 12h if needed
    const displayHours = React.useMemo(() => {
      if (!value) return ''
      if (!use12Hour) return value.hours.toString().padStart(2, '0')
      
      const h = value.hours % 12 || 12
      return h.toString().padStart(2, '0')
    }, [value, use12Hour])

    const displayMinutes = value?.minutes.toString().padStart(2, '0') || ''
    const displaySeconds = value?.seconds?.toString().padStart(2, '0') || ''

    const displayTime = React.useMemo(() => {
      if (!value) return ''
      
      let time = `${displayHours}:${displayMinutes}`
      if (showSeconds) time += `:${displaySeconds}`
      if (use12Hour) time += ` ${value.hours >= 12 ? 'PM' : 'AM'}`
      
      return time
    }, [value, displayHours, displayMinutes, displaySeconds, showSeconds, use12Hour])

    const handleTimeChange = (field: 'hours' | 'minutes' | 'seconds', val: number) => {
      const newTime = { ...value, [field]: val } as TimeValue
      
      // Handle 12-hour to 24-hour conversion
      if (use12Hour && field === 'hours') {
        if (period === 'PM' && val !== 12) {
          newTime.hours = val + 12
        } else if (period === 'AM' && val === 12) {
          newTime.hours = 0
        } else {
          newTime.hours = val
        }
      }
      
      onChange?.(newTime)
    }

    const increment = (field: 'hours' | 'minutes' | 'seconds') => {
      const current = value?.[field] || 0
      const max = field === 'hours' ? (use12Hour ? 12 : 23) : 59
      const step = field === 'minutes' ? minuteStep : field === 'seconds' ? secondStep : 1
      const next = (current + step) % (max + 1)
      handleTimeChange(field, next)
    }

    const decrement = (field: 'hours' | 'minutes' | 'seconds') => {
      const current = value?.[field] || 0
      const max = field === 'hours' ? (use12Hour ? 12 : 23) : 59
      const step = field === 'minutes' ? minuteStep : field === 'seconds' ? secondStep : 1
      const next = current - step < 0 ? max : current - step
      handleTimeChange(field, next)
    }

    return (
      <div ref={ref} className={cn('relative', className)} {...props}>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              disabled={disabled}
              className={cn(
                'w-full justify-start text-left font-normal',
                !value && 'text-muted-foreground'
              )}
            >
              <Clock className="mr-2 h-4 w-4" />
              {displayTime || placeholder}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <div className="flex gap-2 p-3">
              {/* Hours */}
              <TimeColumn
                label="Hours"
                value={use12Hour ? (value?.hours || 0) % 12 || 12 : value?.hours || 0}
                max={use12Hour ? 12 : 23}
                onIncrement={() => increment('hours')}
                onDecrement={() => decrement('hours')}
                onChange={(val) => handleTimeChange('hours', val)}
              />

              {/* Minutes */}
              <TimeColumn
                label="Minutes"
                value={value?.minutes || 0}
                max={59}
                step={minuteStep}
                onIncrement={() => increment('minutes')}
                onDecrement={() => decrement('minutes')}
                onChange={(val) => handleTimeChange('minutes', val)}
              />

              {/* Seconds */}
              {showSeconds && (
                <TimeColumn
                  label="Seconds"
                  value={value?.seconds || 0}
                  max={59}
                  step={secondStep}
                  onIncrement={() => increment('seconds')}
                  onDecrement={() => decrement('seconds')}
                  onChange={(val) => handleTimeChange('seconds', val)}
                />
              )}

              {/* AM/PM */}
              {use12Hour && (
                <div className="flex flex-col items-center gap-2">
                  <span className="text-xs font-medium text-muted-foreground">Period</span>
                  <div className="flex flex-col gap-1">
                    <Button
                      type="button"
                      variant={period === 'AM' ? 'default' : 'outline'}
                      size="sm"
                      className="h-8 w-12"
                      onClick={() => {
                        setPeriod('AM')
                        if (value) {
                          const newHours = value.hours >= 12 ? value.hours - 12 : value.hours
                          handleTimeChange('hours', newHours)
                        }
                      }}
                    >
                      AM
                    </Button>
                    <Button
                      type="button"
                      variant={period === 'PM' ? 'default' : 'outline'}
                      size="sm"
                      className="h-8 w-12"
                      onClick={() => {
                        setPeriod('PM')
                        if (value) {
                          const newHours = value.hours < 12 ? value.hours + 12 : value.hours
                          handleTimeChange('hours', newHours)
                        }
                      }}
                    >
                      PM
                    </Button>
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center justify-end gap-2 border-t p-3">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => {
                  onChange?.({ hours: 0, minutes: 0, seconds: 0 })
                  setOpen(false)
                }}
              >
                Clear
              </Button>
              <Button
                type="button"
                size="sm"
                onClick={() => setOpen(false)}
              >
                Done
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    )
  }
)
TimePicker.displayName = 'TimePicker'

interface TimeColumnProps {
  label: string
  value: number
  max: number
  step?: number
  onIncrement: () => void
  onDecrement: () => void
  onChange: (value: number) => void
}

function TimeColumn({ label, value, max, step = 1, onIncrement, onDecrement, onChange }: TimeColumnProps) {
  return (
    <div className="flex flex-col items-center gap-2">
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
      
      <div className="flex flex-col items-center">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-8 w-12"
          onClick={onIncrement}
        >
          <ChevronUp className="h-4 w-4" />
        </Button>

        <Input
          type="number"
          min={0}
          max={max}
          step={step}
          value={value.toString().padStart(2, '0')}
          onChange={(e) => {
            const val = parseInt(e.target.value, 10)
            if (!isNaN(val) && val >= 0 && val <= max) {
              onChange(val)
            }
          }}
          className="h-12 w-16 text-center text-lg font-medium"
        />

        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-8 w-12"
          onClick={onDecrement}
        >
          <ChevronDown className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

export interface TimeInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value' | 'size'> {
  /**
   * Current time value
   */
  value?: TimeValue
  /**
   * Callback when time changes
   */
  onChange?: (time: TimeValue | undefined) => void
  /**
   * Whether to show seconds
   * @default false
   */
  showSeconds?: boolean
}

/**
 * TimeInput - Direct text input for time (HH:MM:SS format)
 * 
 * @example
 * ```tsx
 * <TimeInput
 *   value={{ hours: 14, minutes: 30 }}
 *   onChange={setTime}
 *   placeholder="14:30"
 * />
 * ```
 */
export const TimeInput = React.forwardRef<HTMLInputElement, TimeInputProps>(
  ({ value, onChange, showSeconds = false, placeholder, ...props }, ref) => {
    const displayValue = React.useMemo(() => {
      if (!value) return ''
      let time = `${value.hours.toString().padStart(2, '0')}:${value.minutes.toString().padStart(2, '0')}`
      if (showSeconds && value.seconds !== undefined) {
        time += `:${value.seconds.toString().padStart(2, '0')}`
      }
      return time
    }, [value, showSeconds])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const input = e.target.value
      const pattern = showSeconds ? /^(\d{1,2}):(\d{1,2}):(\d{1,2})$/ : /^(\d{1,2}):(\d{1,2})$/
      const match = input.match(pattern)

      if (match) {
        const hours = parseInt(match[1], 10)
        const minutes = parseInt(match[2], 10)
        const seconds = showSeconds && match[3] ? parseInt(match[3], 10) : undefined

        if (hours >= 0 && hours <= 23 && minutes >= 0 && minutes <= 59 && (!showSeconds || (seconds !== undefined && seconds >= 0 && seconds <= 59))) {
          onChange?.({ hours, minutes, seconds })
          return
        }
      }

      // If invalid, clear
      if (input === '') {
        onChange?.(undefined)
      }
    }

    return (
      <Input
        ref={ref}
        type="text"
        value={displayValue}
        onChange={handleChange}
        placeholder={placeholder || (showSeconds ? 'HH:MM:SS' : 'HH:MM')}
        {...props}
      />
    )
  }
)
TimeInput.displayName = 'TimeInput'
