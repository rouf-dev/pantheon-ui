import * as React from 'react'
import { cn } from '@/lib/utils'
import { Button } from './button'
import { Sheet, SheetContent, SheetTrigger } from './sheet'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './dropdown-menu'
import { Menu, ChevronDown } from 'lucide-react'

export type NavigationAnimation = 'slide' | 'fade' | 'scale' | false

export interface NavigationProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Whether navigation is sticky
   * @default false
   */
  sticky?: boolean
  /**
   * Animation preset for mobile menu
   * @default 'slide'
   */
  animation?: NavigationAnimation
  /**
   * Show border bottom
   * @default true
   */
  border?: boolean
}

/**
 * Navigation - Responsive navigation bar
 * 
 * Features:
 * - Responsive: Desktop horizontal, Mobile hamburger menu
 * - Sticky positioning option
 * - Dropdown menu support
 * - Active state highlighting
 * - Smooth animations
 * 
 * @example
 * ```tsx
 * <Navigation sticky>
 *   <NavigationBrand>
 *     <Logo />
 *     <span>My App</span>
 *   </NavigationBrand>
 *   
 *   <NavigationContent>
 *     <NavigationItem href="/" active>Home</NavigationItem>
 *     <NavigationItem href="/about">About</NavigationItem>
 *     <NavigationDropdown label="Products">
 *       <NavigationDropdownItem href="/product-a">Product A</NavigationDropdownItem>
 *       <NavigationDropdownItem href="/product-b">Product B</NavigationDropdownItem>
 *     </NavigationDropdown>
 *   </NavigationContent>
 *   
 *   <NavigationActions>
 *     <Button variant="ghost">Login</Button>
 *     <Button>Sign Up</Button>
 *   </NavigationActions>
 * </Navigation>
 * ```
 */
export const Navigation = React.forwardRef<HTMLElement, NavigationProps>(
  ({ className, sticky = false, animation = 'slide', border = true, children, ...props }, ref) => {
    const [mobileOpen, setMobileOpen] = React.useState(false)

    return (
      <nav
        ref={ref}
        className={cn(
          'flex items-center justify-between bg-background px-4 py-3',
          sticky && 'sticky top-0 z-50',
          border && 'border-b',
          className
        )}
        {...props}
      >
        {/* Mobile Menu Toggle */}
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[280px] p-0">
            <div className="flex flex-col space-y-1 p-4">
              {children}
            </div>
          </SheetContent>
        </Sheet>

        {/* Desktop Layout */}
        <div className="hidden md:flex md:w-full md:items-center md:justify-between">
          {children}
        </div>
      </nav>
    )
  }
)
Navigation.displayName = 'Navigation'

export interface NavigationBrandProps extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * NavigationBrand - Logo/brand section
 * 
 * @example
 * ```tsx
 * <NavigationBrand>
 *   <Image src="/logo.svg" alt="Logo" width={32} height={32} />
 *   <span className="font-bold text-lg">Brand</span>
 * </NavigationBrand>
 * ```
 */
export const NavigationBrand = React.forwardRef<HTMLDivElement, NavigationBrandProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('flex items-center gap-2', className)}
        {...props}
      />
    )
  }
)
NavigationBrand.displayName = 'NavigationBrand'

export interface NavigationContentProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Alignment
   * @default 'start'
   */
  align?: 'start' | 'center' | 'end'
}

/**
 * NavigationContent - Main navigation links container
 * 
 * @example
 * ```tsx
 * <NavigationContent align="center">
 *   <NavigationItem href="/">Home</NavigationItem>
 *   <NavigationItem href="/about">About</NavigationItem>
 * </NavigationContent>
 * ```
 */
export const NavigationContent = React.forwardRef<HTMLDivElement, NavigationContentProps>(
  ({ className, align = 'start', ...props }, ref) => {
    const alignClasses = {
      start: 'justify-start',
      center: 'justify-center',
      end: 'justify-end',
    }

    return (
      <div
        ref={ref}
        className={cn(
          'flex flex-1 flex-col gap-1 md:flex-row md:items-center md:gap-1',
          alignClasses[align],
          className
        )}
        {...props}
      />
    )
  }
)
NavigationContent.displayName = 'NavigationContent'

export interface NavigationActionsProps extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * NavigationActions - Action buttons (login, signup, etc.)
 * 
 * @example
 * ```tsx
 * <NavigationActions>
 *   <Button variant="ghost">Login</Button>
 *   <Button>Sign Up</Button>
 * </NavigationActions>
 * ```
 */
export const NavigationActions = React.forwardRef<HTMLDivElement, NavigationActionsProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('flex items-center gap-2', className)}
        {...props}
      />
    )
  }
)
NavigationActions.displayName = 'NavigationActions'

export interface NavigationItemProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /**
   * Whether item is active/current
   */
  active?: boolean
  /**
   * Icon component
   */
  icon?: React.ComponentType<{ className?: string }>
}

/**
 * NavigationItem - Single navigation link
 * 
 * @example
 * ```tsx
 * <NavigationItem 
 *   href="/dashboard" 
 *   active={pathname === '/dashboard'}
 *   icon={Home}
 * >
 *   Dashboard
 * </NavigationItem>
 * ```
 */
export const NavigationItem = React.forwardRef<HTMLAnchorElement, NavigationItemProps>(
  ({ className, active, icon: Icon, children, ...props }, ref) => {
    return (
      <a
        ref={ref}
        className={cn(
          'flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium',
          'motion-safe:transition-colors',
          'hover:bg-accent hover:text-accent-foreground',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
          active && 'bg-accent text-accent-foreground',
          className
        )}
        {...props}
      >
        {Icon && <Icon className="h-4 w-4" />}
        {children}
      </a>
    )
  }
)
NavigationItem.displayName = 'NavigationItem'

export interface NavigationDropdownProps {
  /**
   * Dropdown trigger label
   */
  label: string
  /**
   * Icon component
   */
  icon?: React.ComponentType<{ className?: string }>
  /**
   * Dropdown items
   */
  children: React.ReactNode
}

/**
 * NavigationDropdown - Dropdown menu in navigation
 * 
 * @example
 * ```tsx
 * <NavigationDropdown label="Products" icon={Package}>
 *   <NavigationDropdownItem href="/product-a">Product A</NavigationDropdownItem>
 *   <NavigationDropdownItem href="/product-b">Product B</NavigationDropdownItem>
 * </NavigationDropdown>
 * ```
 */
export function NavigationDropdown({ label, icon: Icon, children }: NavigationDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            'flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium',
            'motion-safe:transition-colors',
            'hover:bg-accent hover:text-accent-foreground',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
          )}
        >
          {Icon && <Icon className="h-4 w-4" />}
          {label}
          <ChevronDown className="h-4 w-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-48">
        {children}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export interface NavigationDropdownItemProps extends React.ComponentPropsWithoutRef<'a'> {
  /**
   * Icon component
   */
  icon?: React.ComponentType<{ className?: string }>
}

/**
 * NavigationDropdownItem - Item in dropdown menu
 * 
 * @example
 * ```tsx
 * <NavigationDropdownItem href="/settings" icon={Settings}>
 *   Settings
 * </NavigationDropdownItem>
 * ```
 */
export const NavigationDropdownItem = React.forwardRef<
  HTMLAnchorElement,
  NavigationDropdownItemProps
>(({ className, icon: Icon, children, ...props }, ref) => {
  return (
    <DropdownMenuItem asChild>
      <a
        ref={ref}
        className={cn('flex items-center gap-2', className)}
        {...props}
      >
        {Icon && <Icon className="h-4 w-4" />}
        {children}
      </a>
    </DropdownMenuItem>
  )
})
NavigationDropdownItem.displayName = 'NavigationDropdownItem'
