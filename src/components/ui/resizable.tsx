import * as React from 'react'
import * as ResizablePrimitive from 'react-resizable-panels'
import { cn } from '@/lib/utils'
import { GripVertical } from 'lucide-react'

/**
 * ResizablePanelGroup - Container for resizable panels
 * 
 * @example
 * ```tsx
 * <ResizablePanelGroup direction="horizontal" className="min-h-[200px]">
 *   <ResizablePanel defaultSize={50}>
 *     <div>Left Panel</div>
 *   </ResizablePanel>
 *   <ResizableHandle />
 *   <ResizablePanel defaultSize={50}>
 *     <div>Right Panel</div>
 *   </ResizablePanel>
 * </ResizablePanelGroup>
 * ```
 */
const ResizablePanelGroup = React.forwardRef<
  React.ElementRef<typeof ResizablePrimitive.PanelGroup>,
  React.ComponentPropsWithoutRef<typeof ResizablePrimitive.PanelGroup>
>(({ className, ...props }, ref) => (
  <ResizablePrimitive.PanelGroup
    ref={ref}
    className={cn(
      'flex h-full w-full data-[panel-group-direction=vertical]:flex-col',
      className
    )}
    {...props}
  />
))
ResizablePanelGroup.displayName = 'ResizablePanelGroup'

/**
 * ResizablePanel - Individual resizable panel
 * 
 * Supports:
 * - defaultSize: Initial size percentage (0-100)
 * - minSize: Minimum size percentage
 * - maxSize: Maximum size percentage
 * - collapsible: Allow panel to collapse to 0
 * - collapsedSize: Size when collapsed (default: 0)
 * - onCollapse/onExpand: Callbacks for collapse state
 * 
 * @example
 * ```tsx
 * <ResizablePanel 
 *   defaultSize={30} 
 *   minSize={20} 
 *   maxSize={80}
 *   collapsible
 *   onCollapse={() => console.log('Collapsed')}
 * >
 *   <div>Resizable content</div>
 * </ResizablePanel>
 * ```
 */
const ResizablePanel = React.forwardRef<
  React.ElementRef<typeof ResizablePrimitive.Panel>,
  React.ComponentPropsWithoutRef<typeof ResizablePrimitive.Panel>
>(({ className, ...props }, ref) => (
  <ResizablePrimitive.Panel
    ref={ref}
    className={cn('relative', className)}
    {...props}
  />
))
ResizablePanel.displayName = 'ResizablePanel'

export type ResizableHandleProps = React.ComponentPropsWithoutRef<
  typeof ResizablePrimitive.PanelResizeHandle
> & {
  /**
   * Whether to show the drag handle indicator
   * @default true
   */
  withHandle?: boolean
  /**
   * Animation preset for hover/active states
   * - 'scale': Subtle scale on hover
   * - 'glow': Glow effect on hover
   * - 'pulse': Pulsing animation
   * - false: No animation
   * @default 'scale'
   */
  animation?: 'scale' | 'glow' | 'pulse' | false
}

/**
 * ResizableHandle - Draggable handle between panels
 * 
 * Features:
 * - Animated hover/active states
 * - Touch-friendly (larger hit area on mobile)
 * - Visual grip indicator (optional)
 * - Keyboard accessible (arrow keys to resize)
 * - Respects prefers-reduced-motion
 * 
 * @example
 * ```tsx
 * // Simple handle
 * <ResizableHandle />
 * 
 * // Without grip indicator
 * <ResizableHandle withHandle={false} />
 * 
 * // Custom animation
 * <ResizableHandle animation="glow" />
 * 
 * // Disabled animations
 * <ResizableHandle animation={false} />
 * ```
 */
const ResizableHandle = ({
  className,
  withHandle = true,
  animation = 'scale',
  ...props
}: ResizableHandleProps) => {
  const animationClasses = React.useMemo(() => {
    if (animation === false) return ''
    
    switch (animation) {
      case 'scale':
        return 'motion-safe:hover:scale-110 motion-safe:active:scale-95 motion-safe:transition-transform'
      case 'glow':
        return 'motion-safe:hover:shadow-lg motion-safe:hover:shadow-primary/20 motion-safe:transition-shadow'
      case 'pulse':
        return 'motion-safe:hover:animate-pulse'
      default:
        return ''
    }
  }, [animation])

  return (
    <ResizablePrimitive.PanelResizeHandle
      className={cn(
        'relative flex w-px items-center justify-center bg-border',
        'after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2',
        'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1',
        'data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full',
        'data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-1',
        'data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:-translate-y-1/2',
        'data-[panel-group-direction=vertical]:after:translate-x-0',
        // Touch-friendly hit area on mobile
        '[&[data-panel-group-direction=horizontal]]:after:w-3',
        '[&[data-panel-group-direction=vertical]]:after:h-3',
        'sm:[&[data-panel-group-direction=horizontal]]:after:w-1.5',
        'sm:[&[data-panel-group-direction=vertical]]:after:h-1.5',
        className
      )}
      {...props}
    >
      {withHandle && (
        <div
          className={cn(
            'z-10 flex h-4 w-3 items-center justify-center rounded-sm border bg-border',
            'data-[panel-group-direction=vertical]:h-3 data-[panel-group-direction=vertical]:w-4',
            'data-[panel-group-direction=vertical]:rotate-90',
            animationClasses
          )}
        >
          <GripVertical className="h-2.5 w-2.5" />
        </div>
      )}
    </ResizablePrimitive.PanelResizeHandle>
  )
}
ResizableHandle.displayName = 'ResizableHandle'

export { ResizablePanelGroup, ResizablePanel, ResizableHandle }
