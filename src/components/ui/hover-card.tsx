import * as React from 'react'
import * as HoverCardPrimitive from '@radix-ui/react-hover-card'
import { cn } from '@/lib/utils'

export type HoverCardAnimation = 'scale' | 'fade' | 'slide' | false

export interface HoverCardProps extends React.ComponentPropsWithoutRef<typeof HoverCardPrimitive.Root> {
  /**
   * Animation preset
   * @default 'scale'
   */
  animation?: HoverCardAnimation
}

/**
 * HoverCard - Popover triggered by hover
 * 
 * Perfect for:
 * - User profile previews (Twitter/GitHub style)
 * - Rich tooltips with images/actions
 * - Preview cards for links
 * 
 * @example
 * ```tsx
 * <HoverCard>
 *   <HoverCardTrigger asChild>
 *     <a href="/user/john">@john</a>
 *   </HoverCardTrigger>
 *   <HoverCardContent>
 *     <div className="flex gap-4">
 *       <Avatar>
 *         <AvatarImage src="/john.jpg" />
 *         <AvatarFallback>JD</AvatarFallback>
 *       </Avatar>
 *       <div>
 *         <h4 className="font-semibold">John Doe</h4>
 *         <p className="text-sm text-muted-foreground">
 *           Software Engineer at Acme Inc.
 *         </p>
 *       </div>
 *     </div>
 *   </HoverCardContent>
 * </HoverCard>
 * ```
 */
const HoverCard = HoverCardPrimitive.Root

const HoverCardTrigger = HoverCardPrimitive.Trigger

export interface HoverCardContentProps
  extends React.ComponentPropsWithoutRef<typeof HoverCardPrimitive.Content> {
  /**
   * Animation preset
   * @default 'scale'
   */
  animation?: HoverCardAnimation
}

/**
 * HoverCardContent - Content displayed on hover
 * 
 * Features:
 * - Animated entrance
 * - Portal rendering (above other content)
 * - Collision detection (stays on screen)
 * - Configurable side/alignment
 * - Respects reduced-motion
 */
const HoverCardContent = React.forwardRef<
  React.ElementRef<typeof HoverCardPrimitive.Content>,
  HoverCardContentProps
>(({ className, align = 'center', sideOffset = 4, animation = 'scale', ...props }, ref) => {
  const animationClasses = React.useMemo(() => {
    if (animation === false) return ''

    switch (animation) {
      case 'scale':
        return cn(
          'motion-safe:data-[state=open]:animate-in motion-safe:data-[state=closed]:animate-out',
          'motion-safe:data-[state=closed]:fade-out-0 motion-safe:data-[state=open]:fade-in-0',
          'motion-safe:data-[state=closed]:zoom-out-95 motion-safe:data-[state=open]:zoom-in-95',
          'motion-safe:data-[side=bottom]:slide-in-from-top-2',
          'motion-safe:data-[side=left]:slide-in-from-right-2',
          'motion-safe:data-[side=right]:slide-in-from-left-2',
          'motion-safe:data-[side=top]:slide-in-from-bottom-2'
        )
      case 'fade':
        return cn(
          'motion-safe:data-[state=open]:animate-in motion-safe:data-[state=closed]:animate-out',
          'motion-safe:data-[state=closed]:fade-out-0 motion-safe:data-[state=open]:fade-in-0'
        )
      case 'slide':
        return cn(
          'motion-safe:data-[state=open]:animate-in motion-safe:data-[state=closed]:animate-out',
          'motion-safe:data-[state=closed]:fade-out-0 motion-safe:data-[state=open]:fade-in-0',
          'motion-safe:data-[side=bottom]:slide-in-from-top-4',
          'motion-safe:data-[side=left]:slide-in-from-right-4',
          'motion-safe:data-[side=right]:slide-in-from-left-4',
          'motion-safe:data-[side=top]:slide-in-from-bottom-4'
        )
      default:
        return ''
    }
  }, [animation])

  return (
    <HoverCardPrimitive.Portal>
      <HoverCardPrimitive.Content
        ref={ref}
        align={align}
        sideOffset={sideOffset}
        className={cn(
          'z-50 w-64 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none',
          animationClasses,
          className
        )}
        {...props}
      />
    </HoverCardPrimitive.Portal>
  )
})
HoverCardContent.displayName = HoverCardPrimitive.Content.displayName

export { HoverCard, HoverCardTrigger, HoverCardContent }
