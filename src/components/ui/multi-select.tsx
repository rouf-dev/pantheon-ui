import * as React from 'react'
import { cn } from '@/lib/utils'
import { Badge } from './badge'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from './command'
import { X } from 'lucide-react'

export interface MultiSelectOption {
  label: string
  value: string
  disabled?: boolean
}

export interface MultiSelectProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /**
   * Available options
   */
  options: MultiSelectOption[]
  /**
   * Selected values
   */
  value?: string[]
  /**
   * Callback when selection changes
   */
  onChange?: (values: string[]) => void
  /**
   * Placeholder text
   * @default 'Select items...'
   */
  placeholder?: string
  /**
   * Empty state text
   * @default 'No items found.'
   */
  emptyText?: string
  /**
   * Maximum number of selections (0 = unlimited)
   * @default 0
   */
  maxSelections?: number
  /**
   * Disable the input
   * @default false
   */
  disabled?: boolean
  /**
   * Animation for tags
   * @default 'scale'
   */
  animation?: 'scale' | 'fade' | false
}

/**
 * MultiSelect - Multiple selection with tags
 * 
 * Features:
 * - Tag-based selection display
 * - Search/filter options
 * - Remove individual tags
 * - Max selections limit
 * - Keyboard navigation
 * - Animated tags
 * 
 * @example
 * ```tsx
 * const options = [
 *   { label: 'React', value: 'react' },
 *   { label: 'Vue', value: 'vue' },
 *   { label: 'Angular', value: 'angular' },
 *   { label: 'Svelte', value: 'svelte' },
 * ]
 * 
 * <MultiSelect
 *   options={options}
 *   value={selected}
 *   onChange={setSelected}
 *   placeholder="Select frameworks..."
 *   maxSelections={3}
 * />
 * ```
 */
export const MultiSelect = React.forwardRef<HTMLDivElement, MultiSelectProps>(
  (
    {
      className,
      options,
      value = [],
      onChange,
      placeholder = 'Select items...',
      emptyText = 'No items found.',
      maxSelections = 0,
      disabled = false,
      animation = 'scale',
      ...props
    },
    ref
  ) => {
    const [open, setOpen] = React.useState(false)
    const [search, setSearch] = React.useState('')

    const handleSelect = (selectedValue: string) => {
      const isSelected = value.includes(selectedValue)
      
      if (isSelected) {
        onChange?.(value.filter((v) => v !== selectedValue))
      } else {
        if (maxSelections > 0 && value.length >= maxSelections) {
          return // Limit reached
        }
        onChange?.([...value, selectedValue])
      }
    }

    const handleRemove = (valueToRemove: string) => {
      onChange?.(value.filter((v) => v !== valueToRemove))
    }

    const selectedOptions = options.filter((opt) => value.includes(opt.value))
    const availableOptions = options.filter((opt) => !value.includes(opt.value))

    return (
      <div ref={ref} className={cn('space-y-2', className)} {...props}>
        {/* Selected Tags */}
        {selectedOptions.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {selectedOptions.map((option) => (
              <Tag
                key={option.value}
                label={option.label}
                onRemove={() => handleRemove(option.value)}
                disabled={disabled}
                animation={animation}
              />
            ))}
          </div>
        )}

        {/* Command Input */}
        <Command className="overflow-visible bg-transparent">
          <div className="group rounded-md border border-input px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
            <div className="flex flex-wrap gap-1">
              <CommandInput
                placeholder={placeholder}
                value={search}
                onValueChange={setSearch}
                onFocus={() => setOpen(true)}
                onBlur={() => setTimeout(() => setOpen(false), 200)}
                disabled={disabled || (maxSelections > 0 && value.length >= maxSelections)}
                className="flex-1 bg-transparent outline-none placeholder:text-muted-foreground"
              />
            </div>
          </div>

          <div className="relative mt-2">
            {open && availableOptions.length > 0 && (
              <div className="absolute top-0 z-10 w-full rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in fade-in-0 zoom-in-95">
                <CommandList>
                  <CommandGroup className="max-h-[300px] overflow-auto p-1">
                    {availableOptions.map((option) => (
                      <CommandItem
                        key={option.value}
                        value={option.value}
                        disabled={option.disabled}
                        onSelect={handleSelect}
                        className="cursor-pointer"
                      >
                        <span>{option.label}</span>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                  <CommandEmpty>{emptyText}</CommandEmpty>
                </CommandList>
              </div>
            )}
          </div>
        </Command>
      </div>
    )
  }
)
MultiSelect.displayName = 'MultiSelect'

interface TagProps {
  label: string
  onRemove: () => void
  disabled?: boolean
  animation?: 'scale' | 'fade' | false
}

function Tag({ label, onRemove, disabled, animation }: TagProps) {
  const animationClasses = React.useMemo(() => {
    if (animation === false) return ''

    switch (animation) {
      case 'scale':
        return 'motion-safe:animate-in motion-safe:zoom-in-95 motion-safe:duration-100'
      case 'fade':
        return 'motion-safe:animate-in motion-safe:fade-in motion-safe:duration-100'
      default:
        return ''
    }
  }, [animation])

  return (
    <Badge
      variant="secondary"
      className={cn(
        'gap-1 pr-1',
        !disabled && 'motion-safe:transition-all motion-safe:hover:bg-secondary/80',
        animationClasses
      )}
    >
      <span className="text-xs">{label}</span>
      {!disabled && (
        <button
          type="button"
          onClick={onRemove}
          className="ml-1 rounded-sm hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        >
          <X className="h-3 w-3" />
          <span className="sr-only">Remove {label}</span>
        </button>
      )}
    </Badge>
  )
}

export interface TagInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> {
  /**
   * Current tags
   */
  value?: string[]
  /**
   * Callback when tags change
   */
  onChange?: (tags: string[]) => void
  /**
   * Separator to split input into tags
   * @default ','
   */
  separator?: string
  /**
   * Allow duplicates
   * @default false
   */
  allowDuplicates?: boolean
  /**
   * Maximum number of tags
   * @default 0 (unlimited)
   */
  maxTags?: number
}

/**
 * TagInput - Free-form text input that creates tags
 * 
 * @example
 * ```tsx
 * <TagInput
 *   value={tags}
 *   onChange={setTags}
 *   placeholder="Type and press Enter..."
 *   separator=","
 *   maxTags={10}
 * />
 * ```
 */
export const TagInput = React.forwardRef<HTMLInputElement, TagInputProps>(
  (
    {
      className,
      value = [],
      onChange,
      separator = ',',
      allowDuplicates = false,
      maxTags = 0,
      onKeyDown,
      ...props
    },
    ref
  ) => {
    const [inputValue, setInputValue] = React.useState('')

    const addTag = (tag: string) => {
      const trimmed = tag.trim()
      if (!trimmed) return

      if (!allowDuplicates && value.includes(trimmed)) return
      if (maxTags > 0 && value.length >= maxTags) return

      onChange?.([...value, trimmed])
      setInputValue('')
    }

    const removeTag = (index: number) => {
      onChange?.(value.filter((_, i) => i !== index))
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' || e.key === separator) {
        e.preventDefault()
        addTag(inputValue)
      } else if (e.key === 'Backspace' && !inputValue && value.length > 0) {
        e.preventDefault()
        removeTag(value.length - 1)
      }

      onKeyDown?.(e)
    }

    return (
      <div className={cn('rounded-md border border-input', className)}>
        <div className="flex flex-wrap gap-1 p-2">
          {value.map((tag, index) => (
            <Badge key={index} variant="secondary" className="gap-1 pr-1">
              <span className="text-xs">{tag}</span>
              <button
                type="button"
                onClick={() => removeTag(index)}
                className="ml-1 rounded-sm hover:bg-accent hover:text-accent-foreground"
              >
                <X className="h-3 w-3" />
                <span className="sr-only">Remove {tag}</span>
              </button>
            </Badge>
          ))}

          <input
            ref={ref}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={maxTags > 0 && value.length >= maxTags}
            className="flex-1 bg-transparent px-2 py-1 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
            {...props}
          />
        </div>
      </div>
    )
  }
)
TagInput.displayName = 'TagInput'
