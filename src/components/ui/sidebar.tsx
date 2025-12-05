import * as React from 'react'
import { cn } from '@/lib/utils'
import { Sheet, SheetContent } from './sheet'
import { Button } from './button'
import { PanelLeft, X } from 'lucide-react'

export type SidebarVariant = 'sidebar' | 'floating' | 'inset'
export type SidebarAnimation = 'slide' | 'scale' | 'fade' | false

export interface SidebarContextValue {
  open: boolean
  setOpen: (open: boolean) => void
  variant: SidebarVariant
  isMobile: boolean
}

const SidebarContext = React.createContext<SidebarContextValue | undefined>(undefined)

export const useSidebar = () => {
  const context = React.useContext(SidebarContext)
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider')
  }
  return context
}

export interface SidebarProviderProps {
  children: React.ReactNode
  /**
   * Default open state for desktop
   * @default true
   */
  defaultOpen?: boolean
  /**
   * Controlled open state
   */
  open?: boolean
  /**
   * Callback when open state changes
   */
  onOpenChange?: (open: boolean) => void
  /**
   * Sidebar variant
   * - 'sidebar': Standard sidebar (pushes content)
   * - 'floating': Floating sidebar (overlays content)
   * - 'inset': Inset sidebar with padding
   * @default 'sidebar'
   */
  variant?: SidebarVariant
}

/**
 * SidebarProvider - Context provider for sidebar state
 * 
 * Handles:
 * - Open/close state management
 * - Mobile detection (< 768px)
 * - Desktop vs mobile rendering (Sheet on mobile, fixed on desktop)
 * 
 * @example
 * ```tsx
 * <SidebarProvider defaultOpen={true} variant="sidebar">
 *   <div className="flex min-h-screen">
 *     <Sidebar>
 *       <SidebarHeader>Logo</SidebarHeader>
 *       <SidebarContent>Nav items</SidebarContent>
 *       <SidebarFooter>Footer</SidebarFooter>
 *     </Sidebar>
 *     <main className="flex-1">
 *       <SidebarTrigger />
 *       Content
 *     </main>
 *   </div>
 * </SidebarProvider>
 * ```
 */
export function SidebarProvider({
  children,
  defaultOpen = true,
  open: controlledOpen,
  onOpenChange,
  variant = 'sidebar',
}: SidebarProviderProps) {
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen)
  const [isMobile, setIsMobile] = React.useState(false)

  // Detect mobile
  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const open = controlledOpen !== undefined ? controlledOpen : internalOpen
  const setOpen = React.useCallback(
    (newOpen: boolean) => {
      if (controlledOpen === undefined) {
        setInternalOpen(newOpen)
      }
      onOpenChange?.(newOpen)
    },
    [controlledOpen, onOpenChange]
  )

  return (
    <SidebarContext.Provider value={{ open, setOpen, variant, isMobile }}>
      {children}
    </SidebarContext.Provider>
  )
}

export interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Sidebar side (only affects mobile)
   * @default 'left'
   */
  side?: 'left' | 'right'
  /**
   * Animation preset
   * - 'slide': Slide in from side
   * - 'scale': Scale + fade
   * - 'fade': Simple fade
   * - false: No animation
   * @default 'slide'
   */
  animation?: SidebarAnimation
  /**
   * Collapsible width (desktop only)
   * @default 256
   */
  collapsibleWidth?: number
  /**
   * Collapsed width (when open=false on desktop)
   * @default 64
   */
  collapsedWidth?: number
}

/**
 * Sidebar - Responsive sidebar component
 * 
 * Features:
 * - Mobile: Renders as Sheet overlay
 * - Desktop: Fixed sidebar that can collapse
 * - Smooth animations with reduced-motion support
 * - Three variants: standard, floating, inset
 * - Configurable widths for expanded/collapsed states
 * 
 * @example
 * ```tsx
 * <Sidebar side="left" animation="slide" collapsibleWidth={280}>
 *   <SidebarHeader>
 *     <h2>My App</h2>
 *   </SidebarHeader>
 *   <SidebarContent>
 *     <nav>Navigation items</nav>
 *   </SidebarContent>
 *   <SidebarFooter>
 *     <Button>Settings</Button>
 *   </SidebarFooter>
 * </Sidebar>
 * ```
 */
export function Sidebar({
  children,
  className,
  side = 'left',
  animation = 'slide',
  collapsibleWidth = 256,
  collapsedWidth = 64,
  ...props
}: SidebarProps) {
  const { open, setOpen, variant, isMobile } = useSidebar()

  const animationClasses = React.useMemo(() => {
    if (animation === false) return ''
    
    switch (animation) {
      case 'slide':
        return 'motion-safe:transition-all motion-safe:duration-300 motion-safe:ease-in-out'
      case 'scale':
        return 'motion-safe:transition-all motion-safe:duration-200 motion-safe:origin-left'
      case 'fade':
        return 'motion-safe:transition-opacity motion-safe:duration-200'
      default:
        return ''
    }
  }, [animation])

  // Mobile: Render as Sheet
  if (isMobile) {
    return (
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent
          side={side}
          className={cn('w-[280px] p-0', className)}
          {...props}
        >
          {children}
        </SheetContent>
      </Sheet>
    )
  }

  // Desktop: Fixed sidebar
  const width = open ? collapsibleWidth : collapsedWidth

  return (
    <aside
      className={cn(
        'relative flex h-screen flex-col border-r bg-background',
        animationClasses,
        variant === 'floating' && 'shadow-lg',
        variant === 'inset' && 'm-2 rounded-lg border',
        className
      )}
      style={{
        width: `${width}px`,
        minWidth: `${width}px`,
      }}
      {...props}
    >
      {children}
    </aside>
  )
}

/**
 * SidebarHeader - Header section of sidebar
 * 
 * @example
 * ```tsx
 * <SidebarHeader>
 *   <div className="flex items-center gap-2 px-4 py-2">
 *     <Logo />
 *     <span className="font-semibold">My App</span>
 *   </div>
 * </SidebarHeader>
 * ```
 */
export function SidebarHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'flex items-center border-b px-4 py-3',
        className
      )}
      {...props}
    />
  )
}

/**
 * SidebarContent - Main scrollable content area
 * 
 * @example
 * ```tsx
 * <SidebarContent>
 *   <nav className="space-y-1 p-2">
 *     <SidebarItem icon={Home}>Home</SidebarItem>
 *     <SidebarItem icon={Settings}>Settings</SidebarItem>
 *   </nav>
 * </SidebarContent>
 * ```
 */
export function SidebarContent({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('flex-1 overflow-y-auto overflow-x-hidden', className)}
      {...props}
    />
  )
}

/**
 * SidebarFooter - Footer section of sidebar
 * 
 * @example
 * ```tsx
 * <SidebarFooter>
 *   <div className="p-4 border-t">
 *     <Button variant="ghost" className="w-full">
 *       <User className="mr-2 h-4 w-4" />
 *       Profile
 *     </Button>
 *   </div>
 * </SidebarFooter>
 * ```
 */
export function SidebarFooter({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('border-t', className)}
      {...props}
    />
  )
}

export interface SidebarItemProps extends React.HTMLAttributes<HTMLButtonElement> {
  /**
   * Icon component (from lucide-react)
   */
  icon?: React.ComponentType<{ className?: string }>
  /**
   * Whether item is active
   */
  active?: boolean
  /**
   * Whether item is disabled
   */
  disabled?: boolean
}

/**
 * SidebarItem - Navigation item for sidebar
 * 
 * Features:
 * - Icon support with auto-sizing
 * - Active state highlighting
 * - Disabled state
 * - Hover animations
 * - Tooltip support when collapsed
 * 
 * @example
 * ```tsx
 * <SidebarItem 
 *   icon={Home} 
 *   active={pathname === '/home'}
 *   onClick={() => router.push('/home')}
 * >
 *   Home
 * </SidebarItem>
 * ```
 */
export const SidebarItem = React.forwardRef<HTMLButtonElement, SidebarItemProps>(
  ({ className, icon: Icon, active, disabled, children, ...props }, ref) => {
    const { open } = useSidebar()

    return (
      <button
        ref={ref}
        type="button"
        disabled={disabled}
        className={cn(
          'flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm',
          'motion-safe:transition-colors',
          'hover:bg-accent hover:text-accent-foreground',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
          active && 'bg-accent text-accent-foreground font-medium',
          disabled && 'pointer-events-none opacity-50',
          !open && 'justify-center',
          className
        )}
        {...props}
      >
        {Icon && <Icon className={cn('h-5 w-5 shrink-0')} />}
        {open && <span className="truncate">{children}</span>}
      </button>
    )
  }
)
SidebarItem.displayName = 'SidebarItem'

export interface SidebarTriggerProps extends React.ComponentPropsWithoutRef<typeof Button> {
  /**
   * Show close icon when sidebar is open
   * @default false
   */
  showCloseIcon?: boolean
}

/**
 * SidebarTrigger - Button to toggle sidebar open/close
 * 
 * @example
 * ```tsx
 * // In your header/navbar
 * <header className="border-b p-4">
 *   <SidebarTrigger />
 *   <h1>Page Title</h1>
 * </header>
 * ```
 */
export const SidebarTrigger = React.forwardRef<HTMLButtonElement, SidebarTriggerProps>(
  ({ className, showCloseIcon = false, ...props }, ref) => {
    const { open, setOpen } = useSidebar()

    return (
      <Button
        ref={ref}
        variant="ghost"
        size="icon"
        onClick={() => setOpen(!open)}
        className={cn('h-9 w-9', className)}
        {...props}
      >
        {showCloseIcon && open ? (
          <X className="h-5 w-5" />
        ) : (
          <PanelLeft className="h-5 w-5" />
        )}
        <span className="sr-only">Toggle Sidebar</span>
      </Button>
    )
  }
)
SidebarTrigger.displayName = 'SidebarTrigger'

export {
  SidebarContext,
}
