"use client"

import * as React from "react"
import { Check, ChevronsUpDown, Loader2, Plus } from "lucide-react"
import * as PopoverPrimitive from "@radix-ui/react-popover"

import { cn } from "@/lib/utils"
import { Button } from "./button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "./command"
import { Avatar } from "./avatar"

export interface ComboboxOption {
  value: string
  label: string
  disabled?: boolean
  /** Optional description for rich display */
  description?: string
  /** Optional avatar/icon URL */
  avatar?: string
  /** Optional avatar/icon component */
  icon?: React.ReactNode
  /** Optional group for categorization */
  group?: string
}

export interface ComboboxProps {
  /** Available options (static mode) */
  options?: ComboboxOption[]
  /** Currently selected value */
  value?: string
  /** Callback when value changes */
  onValueChange?: (value: string) => void
  /** Placeholder text */
  placeholder?: string
  /** Search placeholder */
  searchPlaceholder?: string
  /** Empty state text */
  emptyText?: string
  /** Disabled state */
  disabled?: boolean
  /** Custom className for trigger button */
  className?: string
  /** Allow deselecting by clicking selected item */
  allowDeselect?: boolean
  
  // Async/API Features
  /** Async search function - enables API mode */
  onSearch?: (query: string) => Promise<ComboboxOption[]>
  /** Debounce delay in ms (default: 300) */
  debounceMs?: number
  /** Minimum characters before triggering search (default: 0) */
  minSearchLength?: number
  /** Loading state text */
  loadingText?: string
  /** Error state text */
  errorText?: string
  
  // Rich Display Features
  /** Enable rich option rendering (avatar + description) */
  richDisplay?: boolean
  /** Custom option render function */
  renderOption?: (option: ComboboxOption) => React.ReactNode
  /** Custom selected value render function */
  renderValue?: (option: ComboboxOption) => React.ReactNode
  
  // Grouped Options
  /** Enable grouped display (uses option.group) */
  grouped?: boolean
  
  // Create New Option
  /** Enable "Create new" option */
  allowCreate?: boolean
  /** Create button text (default: "Create") */
  createText?: string
  /** Callback when create is triggered */
  onCreate?: (query: string) => void
  
  // Infinite Scroll
  /** Enable infinite scroll */
  infiniteScroll?: boolean
  /** Callback to load more options */
  onLoadMore?: () => Promise<void>
  /** Whether there are more options to load */
  hasMore?: boolean
  /** Loading more indicator */
  loadingMore?: boolean
}

/**
 * Advanced searchable combobox with async API support, rich display, grouping, 
 * create new option, infinite scroll, and text highlighting.
 * 
 * @example
 * ```tsx
 * // Basic static usage
 * const frameworks = [
 *   { value: "next", label: "Next.js" },
 *   { value: "react", label: "React" },
 * ]
 * <Combobox options={frameworks} onValueChange={setValue} />
 * 
 * // Async API search with debounce
 * <Combobox 
 *   onSearch={async (query) => {
 *     const res = await fetch(`/api/users?q=${query}`)
 *     return res.json()
 *   }}
 *   debounceMs={500}
 *   minSearchLength={2}
 *   onValueChange={setValue}
 * />
 * 
 * // Rich display with avatars
 * <Combobox
 *   options={users.map(u => ({
 *     value: u.id,
 *     label: u.name,
 *     description: u.email,
 *     avatar: u.avatarUrl
 *   }))}
 *   richDisplay
 * />
 * 
 * // Grouped options
 * <Combobox
 *   options={items.map(i => ({ ...i, group: i.category }))}
 *   grouped
 * />
 * 
 * // Create new option
 * <Combobox
 *   options={tags}
 *   allowCreate
 *   onCreate={(query) => createTag(query)}
 * />
 * 
 * // Infinite scroll
 * <Combobox
 *   options={items}
 *   infiniteScroll
 *   onLoadMore={loadMore}
 *   hasMore={hasMore}
 * />
 * ```
 */
export function Combobox({
  options = [],
  value,
  onValueChange,
  placeholder = "Select option...",
  searchPlaceholder = "Search...",
  emptyText = "No results found.",
  disabled = false,
  className,
  allowDeselect = false,
  // Async
  onSearch,
  debounceMs = 300,
  minSearchLength = 0,
  loadingText = "Searching...",
  errorText = "Error loading options.",
  // Rich display
  richDisplay = false,
  renderOption,
  renderValue,
  // Grouped
  grouped = false,
  // Create new
  allowCreate = false,
  createText = "Create",
  onCreate,
  // Infinite scroll
  infiniteScroll = false,
  onLoadMore,
  hasMore = false,
  loadingMore = false,
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false)
  const [internalValue, setInternalValue] = React.useState(value ?? "")
  const [searchQuery, setSearchQuery] = React.useState("")
  const [asyncOptions, setAsyncOptions] = React.useState<ComboboxOption[]>([])
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const debounceTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)
  const listRef = React.useRef<HTMLDivElement>(null)

  // Determine if we're in async mode
  const isAsyncMode = !!onSearch

  // Use async options in async mode, static options otherwise
  const displayOptions = isAsyncMode ? asyncOptions : options

  // Sync with controlled value
  React.useEffect(() => {
    if (value !== undefined) {
      setInternalValue(value)
    }
  }, [value])

  // Debounced async search
  React.useEffect(() => {
    if (!isAsyncMode || !searchQuery) {
      setAsyncOptions([])
      return
    }

    if (searchQuery.length < minSearchLength) {
      return
    }

    // Clear previous timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current)
    }

    // Set new timer
    debounceTimerRef.current = setTimeout(async () => {
      setIsLoading(true)
      setError(null)
      try {
        const results = await onSearch(searchQuery)
        setAsyncOptions(results)
      } catch (err) {
        setError(errorText)
        setAsyncOptions([])
      } finally {
        setIsLoading(false)
      }
    }, debounceMs)

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current)
      }
    }
  }, [searchQuery, onSearch, debounceMs, minSearchLength, isAsyncMode, errorText])

  // Infinite scroll observer
  React.useEffect(() => {
    if (!infiniteScroll || !onLoadMore || !listRef.current) return

    const handleScroll = () => {
      const list = listRef.current
      if (!list || loadingMore || !hasMore) return

      const { scrollTop, scrollHeight, clientHeight } = list
      if (scrollHeight - scrollTop <= clientHeight + 50) {
        onLoadMore()
      }
    }

    const list = listRef.current
    list.addEventListener('scroll', handleScroll)
    return () => list.removeEventListener('scroll', handleScroll)
  }, [infiniteScroll, onLoadMore, hasMore, loadingMore])

  const selectedOption = displayOptions.find((opt) => opt.value === internalValue)

  const handleSelect = (selectedValue: string) => {
    const newValue = allowDeselect && selectedValue === internalValue ? "" : selectedValue
    
    if (value === undefined) {
      setInternalValue(newValue)
    }
    onValueChange?.(newValue)
    setOpen(false)
  }

  const handleCreate = () => {
    if (onCreate && searchQuery) {
      onCreate(searchQuery)
      setOpen(false)
      setSearchQuery("")
    }
  }

  // Group options by group property
  const groupedOptions = React.useMemo(() => {
    if (!grouped) return { "": displayOptions }

    return displayOptions.reduce((acc, option) => {
      const group = option.group || "Other"
      if (!acc[group]) acc[group] = []
      acc[group].push(option)
      return acc
    }, {} as Record<string, ComboboxOption[]>)
  }, [displayOptions, grouped])

  // Highlight matching text
  const highlightMatch = (text: string, query: string) => {
    if (!query) return text
    const parts = text.split(new RegExp(`(${query})`, 'gi'))
    return parts.map((part, i) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <mark key={i} className="bg-primary/20 font-semibold">{part}</mark>
      ) : (
        part
      )
    )
  }

  // Render option content
  const renderOptionContent = (option: ComboboxOption) => {
    if (renderOption) {
      return renderOption(option)
    }

    if (richDisplay) {
      return (
        <div className="flex items-center gap-2">
          {option.avatar && (
            <Avatar className="h-6 w-6">
              <img src={option.avatar} alt={option.label} />
            </Avatar>
          )}
          {option.icon && <div className="flex-shrink-0">{option.icon}</div>}
          <div className="flex flex-col overflow-hidden">
            <span className="truncate">{highlightMatch(option.label, searchQuery)}</span>
            {option.description && (
              <span className="text-xs text-muted-foreground truncate">
                {option.description}
              </span>
            )}
          </div>
        </div>
      )
    }

    return highlightMatch(option.label, searchQuery)
  }

  // Render selected value
  const renderSelectedValue = () => {
    if (!selectedOption) return placeholder

    if (renderValue) {
      return renderValue(selectedOption)
    }

    if (richDisplay && (selectedOption.avatar || selectedOption.icon)) {
      return (
        <div className="flex items-center gap-2">
          {selectedOption.avatar && (
            <Avatar className="h-5 w-5">
              <img src={selectedOption.avatar} alt={selectedOption.label} />
            </Avatar>
          )}
          {selectedOption.icon && <div className="flex-shrink-0">{selectedOption.icon}</div>}
          <span className="truncate">{selectedOption.label}</span>
        </div>
      )
    }

    return selectedOption.label
  }

  return (
    <PopoverPrimitive.Root open={open} onOpenChange={setOpen}>
      <PopoverPrimitive.Trigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          aria-label="Select option"
          disabled={disabled}
          className={cn(
            "w-full justify-between",
            !selectedOption && "text-muted-foreground",
            className
          )}
        >
          <span className="truncate flex-1 text-left">{renderSelectedValue()}</span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" aria-hidden="true" />
        </Button>
      </PopoverPrimitive.Trigger>
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          className={cn(
            "w-[var(--radix-popover-trigger-width)] p-0",
            "rounded-md border bg-popover text-popover-foreground shadow-md outline-none",
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
            "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
            "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
            "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2",
            "data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
          )}
          align="start"
          sideOffset={4}
        >
          <Command shouldFilter={!isAsyncMode}>
            <CommandInput 
              placeholder={searchPlaceholder} 
              value={searchQuery}
              onValueChange={setSearchQuery}
            />
            <CommandList ref={listRef}>
              {isLoading && (
                <div className="flex items-center justify-center py-6">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span className="ml-2 text-sm text-muted-foreground">{loadingText}</span>
                </div>
              )}

              {error && (
                <div className="py-6 text-center text-sm text-destructive">{error}</div>
              )}

              {!isLoading && !error && displayOptions.length === 0 && (
                <CommandEmpty>
                  {minSearchLength > 0 && searchQuery.length < minSearchLength
                    ? `Type ${minSearchLength} or more characters to search`
                    : emptyText}
                </CommandEmpty>
              )}

              {!isLoading && !error && displayOptions.length > 0 && (
                <>
                  {grouped
                    ? Object.entries(groupedOptions).map(([group, opts]) => (
                        <React.Fragment key={group}>
                          <CommandGroup heading={group}>
                            {opts.map((option) => (
                              <CommandItem
                                key={option.value}
                                value={option.value}
                                disabled={option.disabled}
                                onSelect={() => handleSelect(option.value)}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4 flex-shrink-0",
                                    internalValue === option.value ? "opacity-100" : "opacity-0"
                                  )}
                                  aria-hidden="true"
                                />
                                {renderOptionContent(option)}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                          {Object.keys(groupedOptions).indexOf(group) < Object.keys(groupedOptions).length - 1 && (
                            <CommandSeparator />
                          )}
                        </React.Fragment>
                      ))
                    : displayOptions.map((option) => (
                        <CommandItem
                          key={option.value}
                          value={option.value}
                          disabled={option.disabled}
                          onSelect={() => handleSelect(option.value)}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4 flex-shrink-0",
                              internalValue === option.value ? "opacity-100" : "opacity-0"
                            )}
                            aria-hidden="true"
                          />
                          {renderOptionContent(option)}
                        </CommandItem>
                      ))}

                  {loadingMore && (
                    <div className="flex items-center justify-center py-2">
                      <Loader2 className="h-3 w-3 animate-spin" />
                    </div>
                  )}
                </>
              )}

              {allowCreate && searchQuery && !displayOptions.find((o) => o.label.toLowerCase() === searchQuery.toLowerCase()) && (
                <>
                  <CommandSeparator />
                  <CommandGroup>
                    <CommandItem onSelect={handleCreate}>
                      <Plus className="mr-2 h-4 w-4" />
                      {createText} "{searchQuery}"
                    </CommandItem>
                  </CommandGroup>
                </>
              )}
            </CommandList>
          </Command>
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  )
}
