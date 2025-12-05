import * as React from 'react'
import { cn } from '@/lib/utils'

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Maximum width breakpoint
   * - 'sm': 640px
   * - 'md': 768px
   * - 'lg': 1024px
   * - 'xl': 1280px
   * - '2xl': 1536px
   * - 'full': 100%
   * @default 'xl'
   */
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'
  /**
   * Whether to center the container
   * @default true
   */
  center?: boolean
  /**
   * Responsive padding
   * @default true
   */
  padding?: boolean
}

/**
 * Container - Max-width wrapper with responsive padding
 * 
 * Features:
 * - Responsive max-width breakpoints
 * - Auto-centering
 * - Responsive horizontal padding
 * 
 * @example
 * ```tsx
 * <Container maxWidth="lg">
 *   <h1>Page Content</h1>
 * </Container>
 * ```
 */
export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, maxWidth = 'xl', center = true, padding = true, ...props }, ref) => {
    const maxWidthClasses = {
      sm: 'max-w-screen-sm',
      md: 'max-w-screen-md',
      lg: 'max-w-screen-lg',
      xl: 'max-w-screen-xl',
      '2xl': 'max-w-screen-2xl',
      full: 'max-w-full',
    }

    return (
      <div
        ref={ref}
        className={cn(
          'w-full',
          maxWidthClasses[maxWidth],
          center && 'mx-auto',
          padding && 'px-4 sm:px-6 lg:px-8',
          className
        )}
        {...props}
      />
    )
  }
)
Container.displayName = 'Container'

export interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Gap between items (Tailwind spacing scale)
   * @default 4
   */
  gap?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16 | 20
  /**
   * Horizontal alignment
   * @default 'start'
   */
  align?: 'start' | 'center' | 'end' | 'stretch'
  /**
   * Vertical alignment (distribution)
   * @default 'start'
   */
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'
  /**
   * Whether to wrap items
   * @default false
   */
  wrap?: boolean
  /**
   * Divider between items
   * @default false
   */
  divider?: boolean
}

/**
 * Stack - Vertical flex container with gap
 * 
 * Features:
 * - Configurable gap (Tailwind spacing)
 * - Alignment control
 * - Optional dividers between items
 * - Wrapping support
 * 
 * @example
 * ```tsx
 * <Stack gap={4} align="center">
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 *   <div>Item 3</div>
 * </Stack>
 * ```
 */
export const Stack = React.forwardRef<HTMLDivElement, StackProps>(
  (
    {
      className,
      gap = 4,
      align = 'start',
      justify = 'start',
      wrap = false,
      divider = false,
      children,
      ...props
    },
    ref
  ) => {
    const gapClasses = {
      0: 'gap-0',
      1: 'gap-1',
      2: 'gap-2',
      3: 'gap-3',
      4: 'gap-4',
      5: 'gap-5',
      6: 'gap-6',
      8: 'gap-8',
      10: 'gap-10',
      12: 'gap-12',
      16: 'gap-16',
      20: 'gap-20',
    }

    const alignClasses = {
      start: 'items-start',
      center: 'items-center',
      end: 'items-end',
      stretch: 'items-stretch',
    }

    const justifyClasses = {
      start: 'justify-start',
      center: 'justify-center',
      end: 'justify-end',
      between: 'justify-between',
      around: 'justify-around',
      evenly: 'justify-evenly',
    }

    const content = divider
      ? React.Children.toArray(children).flatMap((child, index, array) =>
          index < array.length - 1
            ? [
                child,
                <div
                  key={`divider-${index}`}
                  className="h-px w-full bg-border"
                />,
              ]
            : [child]
        )
      : children

    return (
      <div
        ref={ref}
        className={cn(
          'flex flex-col',
          !divider && gapClasses[gap],
          alignClasses[align],
          justifyClasses[justify],
          wrap && 'flex-wrap',
          className
        )}
        {...props}
      >
        {content}
      </div>
    )
  }
)
Stack.displayName = 'Stack'

export interface GroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Gap between items (Tailwind spacing scale)
   * @default 4
   */
  gap?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16 | 20
  /**
   * Vertical alignment
   * @default 'center'
   */
  align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline'
  /**
   * Horizontal alignment (distribution)
   * @default 'start'
   */
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'
  /**
   * Whether to wrap items
   * @default false
   */
  wrap?: boolean
  /**
   * Divider between items
   * @default false
   */
  divider?: boolean
}

/**
 * Group - Horizontal flex container with gap
 * 
 * Features:
 * - Configurable gap (Tailwind spacing)
 * - Alignment control
 * - Optional dividers between items
 * - Wrapping support
 * 
 * @example
 * ```tsx
 * <Group gap={2} wrap>
 *   <Button>Action 1</Button>
 *   <Button>Action 2</Button>
 *   <Button>Action 3</Button>
 * </Group>
 * ```
 */
export const Group = React.forwardRef<HTMLDivElement, GroupProps>(
  (
    {
      className,
      gap = 4,
      align = 'center',
      justify = 'start',
      wrap = false,
      divider = false,
      children,
      ...props
    },
    ref
  ) => {
    const gapClasses = {
      0: 'gap-0',
      1: 'gap-1',
      2: 'gap-2',
      3: 'gap-3',
      4: 'gap-4',
      5: 'gap-5',
      6: 'gap-6',
      8: 'gap-8',
      10: 'gap-10',
      12: 'gap-12',
      16: 'gap-16',
      20: 'gap-20',
    }

    const alignClasses = {
      start: 'items-start',
      center: 'items-center',
      end: 'items-end',
      stretch: 'items-stretch',
      baseline: 'items-baseline',
    }

    const justifyClasses = {
      start: 'justify-start',
      center: 'justify-center',
      end: 'justify-end',
      between: 'justify-between',
      around: 'justify-around',
      evenly: 'justify-evenly',
    }

    const content = divider
      ? React.Children.toArray(children).flatMap((child, index, array) =>
          index < array.length - 1
            ? [
                child,
                <div
                  key={`divider-${index}`}
                  className="h-full w-px bg-border"
                />,
              ]
            : [child]
        )
      : children

    return (
      <div
        ref={ref}
        className={cn(
          'flex flex-row',
          !divider && gapClasses[gap],
          alignClasses[align],
          justifyClasses[justify],
          wrap && 'flex-wrap',
          className
        )}
        {...props}
      >
        {content}
      </div>
    )
  }
)
Group.displayName = 'Group'

export interface CenterProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Whether to center horizontally
   * @default true
   */
  inline?: boolean
}

/**
 * Center - Simple centering utility
 * 
 * Features:
 * - Centers children horizontally and vertically
 * - Inline mode for inline-flex
 * 
 * @example
 * ```tsx
 * <Center className="h-screen">
 *   <Spinner />
 * </Center>
 * ```
 */
export const Center = React.forwardRef<HTMLDivElement, CenterProps>(
  ({ className, inline = false, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          inline ? 'inline-flex' : 'flex',
          'items-center justify-center',
          className
        )}
        {...props}
      />
    )
  }
)
Center.displayName = 'Center'
