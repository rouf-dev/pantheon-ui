"use client"

import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { X } from "lucide-react"
import { motion, AnimatePresence } from "motion/react"

import { cn } from "@/lib/utils"
import { 
  resolveAnimationPair, 
  dialogOverlayVariants,
  type AnimationProp 
} from "@/lib/motion"

/* -------------------------------------------------------------------------------------------------
 * Dialog Context for sharing open state
 * -----------------------------------------------------------------------------------------------*/

interface DialogContextValue {
  open: boolean
}

const DialogContext = React.createContext<DialogContextValue | null>(null)

/* -------------------------------------------------------------------------------------------------
 * Dialog Root (wraps Radix to provide context)
 * -----------------------------------------------------------------------------------------------*/

interface DialogProps extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Root> {}

const Dialog = ({ children, open: controlledOpen, onOpenChange, ...props }: DialogProps) => {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(props.defaultOpen ?? false)
  
  const isControlled = controlledOpen !== undefined
  const open = isControlled ? controlledOpen : uncontrolledOpen
  
  const handleOpenChange = React.useCallback((newOpen: boolean) => {
    if (!isControlled) {
      setUncontrolledOpen(newOpen)
    }
    onOpenChange?.(newOpen)
  }, [isControlled, onOpenChange])

  return (
    <DialogContext.Provider value={{ open }}>
      <DialogPrimitive.Root open={open} onOpenChange={handleOpenChange} {...props}>
        {children}
      </DialogPrimitive.Root>
    </DialogContext.Provider>
  )
}

const DialogTrigger = DialogPrimitive.Trigger

const DialogPortal = DialogPrimitive.Portal

const DialogClose = DialogPrimitive.Close

/* -------------------------------------------------------------------------------------------------
 * Dialog Content (Motion-powered, auto-detects open state)
 * -----------------------------------------------------------------------------------------------*/

interface DialogContentProps extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> {
  /** Entry animation - preset or custom config */
  animation?: AnimationProp
  /** Exit animation (defaults to same as animation) */
  exitAnimation?: AnimationProp
}

/**
 * Motion-powered Dialog Content with spring physics animations.
 * Automatically detects open state from Dialog context - no manual state passing needed!
 * 
 * @example
 * ```tsx
 * // Simple preset
 * <DialogContent animation="slide-up">...</DialogContent>
 * 
 * // With intensity
 * <DialogContent animation={{ preset: "slide-up", intensity: "dramatic" }}>...</DialogContent>
 * 
 * // With custom config
 * <DialogContent animation={{ preset: "slide-up", config: { distance: 40 } }}>...</DialogContent>
 * 
 * // Different exit animation
 * <DialogContent animation="slide-up" exitAnimation="fade">...</DialogContent>
 * ```
 */
const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  DialogContentProps
>(({ className, children, animation = "zoom", exitAnimation, ...props }, ref) => {
  const context = React.useContext(DialogContext)
  const isOpen = context?.open ?? false
  
  const { enter, exit } = resolveAnimationPair(animation, exitAnimation)

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <DialogPortal forceMount>
          <DialogPrimitive.Overlay forceMount asChild>
            <motion.div
              key="dialog-overlay"
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-[2px]"
              {...dialogOverlayVariants}
            />
          </DialogPrimitive.Overlay>
          <DialogPrimitive.Content ref={ref} forceMount asChild {...props}>
            <motion.div
              key="dialog-content"
              className={cn(
                "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg gap-4 border bg-background p-6 shadow-2xl sm:rounded-lg",
                className
              )}
              style={{ translate: "-50% -50%" }}
              initial={enter.initial}
              animate={enter.animate}
              exit={exit.exit}
              transition={enter.transition}
            >
              {children}
              <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-[opacity,transform] duration-150 hover:opacity-100 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 active:scale-95 disabled:pointer-events-none">
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </DialogPrimitive.Close>
            </motion.div>
          </DialogPrimitive.Content>
        </DialogPortal>
      )}
    </AnimatePresence>
  )
})
DialogContent.displayName = DialogPrimitive.Content.displayName

/* -------------------------------------------------------------------------------------------------
 * Layout Components
 * -----------------------------------------------------------------------------------------------*/

const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-1.5 text-center sm:text-left",
      className
    )}
    {...props}
  />
)
DialogHeader.displayName = "DialogHeader"

const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    )}
    {...props}
  />
)
DialogFooter.displayName = "DialogFooter"

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
DialogTitle.displayName = DialogPrimitive.Title.displayName

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
DialogDescription.displayName = DialogPrimitive.Description.displayName

export {
  Dialog,
  DialogPortal,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  type AnimationProp as DialogAnimationProp,
}
