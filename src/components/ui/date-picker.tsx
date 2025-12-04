"use client"

import * as React from "react"
import { DayPicker } from "react-day-picker"
import { format } from "date-fns"
import { Calendar as CalendarIcon, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "./button"
import { Popover, PopoverContent, PopoverTrigger } from "./popover"

// ============================================================================
// Calendar Component (reusable day picker)
// ============================================================================

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell:
          "text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: cn(
          "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-r-md",
          props.mode === "range"
            ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
            : "[&:has([aria-selected])]:rounded-md"
        ),
        day: cn(
          "h-8 w-8 p-0 font-normal aria-selected:opacity-100 hover:bg-accent hover:text-accent-foreground rounded-md inline-flex items-center justify-center"
        ),
        day_range_start: "day-range-start",
        day_range_end: "day-range-end",
        day_selected:
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        day_today: "bg-accent text-accent-foreground",
        day_outside:
          "day-outside text-muted-foreground opacity-50  aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      {...props}
    />
  )
}
Calendar.displayName = "Calendar"

// ============================================================================
// DatePicker (single date)
// ============================================================================

export interface DatePickerProps {
  /** Selected date */
  date?: Date
  /** Callback when date changes */
  onDateChange?: (date: Date | undefined) => void
  /** Placeholder text */
  placeholder?: string
  /** Date format string (date-fns format) */
  dateFormat?: string
  /** Disabled dates (function, array, or single date) */
  disabled?: CalendarProps["disabled"]
  /** Allow clearing the date */
  clearable?: boolean
  /** Custom className for trigger button */
  className?: string
  /** Minimum selectable date */
  fromDate?: Date
  /** Maximum selectable date */
  toDate?: Date
}

/**
 * Date picker with calendar popover.
 * 
 * @example
 * ```tsx
 * // Basic usage
 * <DatePicker onDateChange={(date) => console.log(date)} />
 * 
 * // Controlled
 * const [date, setDate] = useState<Date>()
 * <DatePicker date={date} onDateChange={setDate} />
 * 
 * // With date range limits
 * <DatePicker 
 *   fromDate={new Date()}
 *   toDate={addDays(new Date(), 30)}
 * />
 * 
 * // Clearable
 * <DatePicker clearable />
 * ```
 */
export function DatePicker({
  date,
  onDateChange,
  placeholder = "Pick a date",
  dateFormat = "PPP",
  disabled,
  clearable = false,
  className,
  fromDate,
  toDate,
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false)

  const handleSelect = (selectedDate: Date | undefined) => {
    onDateChange?.(selectedDate)
    setOpen(false)
  }

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation()
    onDateChange?.(undefined)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground",
            className
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" aria-hidden="true" />
          {date ? format(date, dateFormat) : placeholder}
          {clearable && date && (
            <X
              className="ml-auto h-4 w-4 opacity-50 hover:opacity-100"
              onClick={handleClear}
              aria-label="Clear date"
            />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleSelect}
          disabled={disabled}
          fromDate={fromDate}
          toDate={toDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}

// ============================================================================
// DateRangePicker
// ============================================================================

export interface DateRangePickerProps {
  /** Selected date range */
  dateRange?: { from?: Date; to?: Date }
  /** Callback when date range changes */
  onDateRangeChange?: (range: { from?: Date; to?: Date } | undefined) => void
  /** Placeholder text */
  placeholder?: string
  /** Date format string (date-fns format) */
  dateFormat?: string
  /** Disabled dates (function, array, or single date) */
  disabled?: CalendarProps["disabled"]
  /** Allow clearing the range */
  clearable?: boolean
  /** Custom className for trigger button */
  className?: string
  /** Minimum selectable date */
  fromDate?: Date
  /** Maximum selectable date */
  toDate?: Date
}

/**
 * Date range picker with calendar popover.
 * 
 * @example
 * ```tsx
 * // Basic usage
 * <DateRangePicker onDateRangeChange={(range) => console.log(range)} />
 * 
 * // Controlled
 * const [range, setRange] = useState<{ from?: Date; to?: Date }>()
 * <DateRangePicker dateRange={range} onDateRangeChange={setRange} />
 * ```
 */
export function DateRangePicker({
  dateRange,
  onDateRangeChange,
  placeholder = "Pick a date range",
  dateFormat = "PPP",
  disabled,
  clearable = false,
  className,
  fromDate,
  toDate,
}: DateRangePickerProps) {
  const [open, setOpen] = React.useState(false)

  const handleSelect = (range: { from?: Date; to?: Date } | undefined) => {
    onDateRangeChange?.(range)
    // Only close if both dates are selected
    if (range?.from && range?.to) {
      setOpen(false)
    }
  }

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation()
    onDateRangeChange?.(undefined)
  }

  const displayText = React.useMemo(() => {
    if (!dateRange?.from) return placeholder
    if (!dateRange.to) return format(dateRange.from, dateFormat)
    return `${format(dateRange.from, dateFormat)} - ${format(dateRange.to, dateFormat)}`
  }, [dateRange, dateFormat, placeholder])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal",
            !dateRange?.from && "text-muted-foreground",
            className
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" aria-hidden="true" />
          {displayText}
          {clearable && dateRange?.from && (
            <X
              className="ml-auto h-4 w-4 opacity-50 hover:opacity-100"
              onClick={handleClear}
              aria-label="Clear date range"
            />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="range"
          selected={dateRange?.from ? dateRange as { from: Date; to?: Date } : undefined}
          onSelect={handleSelect}
          disabled={disabled}
          fromDate={fromDate}
          toDate={toDate}
          numberOfMonths={2}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}

export { Calendar }
