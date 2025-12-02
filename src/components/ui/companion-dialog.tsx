"use client"

import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { createPortal } from "react-dom"
import { X } from "lucide-react"
import { motion, AnimatePresence } from "motion/react"

import { cn } from "@/lib/utils"
import { resolveAnimationPair, dialogOverlayVariants, type AnimationProp } from "@/lib/motion"

/* -------------------------------------------------------------------------------------------------
 * CompanionDialog Context
 * -----------------------------------------------------------------------------------------------*/

interface CompanionDialogContextValue {
  open: boolean
  companionOpen: boolean
  setCompanionOpen: (open: boolean) => void
  position: "left" | "right"
  gap: number
}

const CompanionDialogContext = React.createContext<CompanionDialogContextValue | null>(null)

function useCompanionDialog() {
  const context = React.useContext(CompanionDialogContext)
  if (!context) {
    throw new Error("CompanionDialog components must be used within a CompanionDialog")
  }
  return context
}

/* -------------------------------------------------------------------------------------------------
 * CompanionDialog Root
 * -----------------------------------------------------------------------------------------------*/

interface CompanionDialogProps {
  children: React.ReactNode
  /** Controlled open state */
  open?: boolean
  /** Callback when open state changes */
  onOpenChange?: (open: boolean) => void
  /** Default open state */
  defaultOpen?: boolean
  /** Position of primary dialog (companion appears on opposite side) */
  position?: "left" | "right"
  /** Gap between dialogs in pixels */
  gap?: number
}

const CompanionDialog = ({
  children,
  open: controlledOpen,
  onOpenChange,
  defaultOpen = false,
  position = "right",
  gap = 16,
}: CompanionDialogProps) => {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen)
  const [companionOpen, setCompanionOpen] = React.useState(false)

  const isControlled = controlledOpen !== undefined
  const open = isControlled ? controlledOpen : uncontrolledOpen

  const handleOpenChange = React.useCallback((newOpen: boolean) => {
    if (!isControlled) {
      setUncontrolledOpen(newOpen)
    }
    if (!newOpen) {
      setCompanionOpen(false)
    }
    onOpenChange?.(newOpen)
  }, [isControlled, onOpenChange])

  // Handle ESC key - close companion first, then primary
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        e.preventDefault()
        if (companionOpen) {
          setCompanionOpen(false)
        } else {
          handleOpenChange(false)
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [open, companionOpen, handleOpenChange])

  return (
    <CompanionDialogContext.Provider
      value={{ open, companionOpen, setCompanionOpen, position, gap }}
    >
      <DialogPrimitive.Root open={open} onOpenChange={handleOpenChange}>
        {children}
      </DialogPrimitive.Root>
    </CompanionDialogContext.Provider>
  )
}

const CompanionDialogTrigger = DialogPrimitive.Trigger

/* -------------------------------------------------------------------------------------------------
 * CompanionDialogContent (Primary dialog)
 * -----------------------------------------------------------------------------------------------*/

interface CompanionDialogContentProps {
  children: React.ReactNode
  className?: string
  /** Entry animation - preset or custom config */
  animation?: AnimationProp
  /** Exit animation (defaults to same as animation) */
  exitAnimation?: AnimationProp
  /** Width of the dialog */
  width?: string
}

const CompanionDialogContent = ({
  children,
  className,
  animation = "zoom",
  exitAnimation,
  width = "w-[400px]",
}: CompanionDialogContentProps) => {
  const { open, position } = useCompanionDialog()
  const { enter, exit } = resolveAnimationPair(animation, exitAnimation)

  // Calculate position based on whether companion is open
  const getPositionStyle = () => {
    const margin = 24 // margin from screen edge
    
    if (position === "right") {
      return {
        right: margin,
        top: "50%",
        translateY: "-50%",
      }
    } else {
      return {
        left: margin,
        top: "50%",
        translateY: "-50%",
      }
    }
  }

  const posStyle = getPositionStyle()

  return (
    <AnimatePresence mode="wait">
      {open && (
        <DialogPrimitive.Portal forceMount>
          <DialogPrimitive.Overlay forceMount asChild>
            <motion.div
              key="companion-dialog-overlay"
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-[2px]"
              {...dialogOverlayVariants}
            />
          </DialogPrimitive.Overlay>
          <DialogPrimitive.Content forceMount asChild>
            <motion.div
              key="companion-dialog-primary"
              className={cn(
                "fixed z-50 flex flex-col gap-4 border bg-background p-6 shadow-2xl rounded-lg",
                width,
                className
              )}
              style={{
                ...posStyle,
                transform: `translateY(${posStyle.translateY})`,
              }}
              initial={enter.initial}
              animate={enter.animate}
              exit={exit.exit}
              transition={enter.transition}
            >
              {children}
              <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-[opacity,transform] duration-150 hover:opacity-100 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 active:scale-95">
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </DialogPrimitive.Close>
            </motion.div>
          </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
      )}
    </AnimatePresence>
  )
}

/* -------------------------------------------------------------------------------------------------
 * CompanionDialogCompanion (Secondary dialog - appears alongside primary)
 * -----------------------------------------------------------------------------------------------*/

interface CompanionDialogCompanionProps {
  children: React.ReactNode
  className?: string
  /** Entry animation - preset or custom config */
  animation?: AnimationProp
  /** Exit animation (defaults to same as animation) */
  exitAnimation?: AnimationProp
  /** Width of the companion dialog */
  width?: string
  /** Show close button */
  closable?: boolean
  /** Custom close handler */
  onClose?: () => void
}

const CompanionDialogCompanion = ({
  children,
  className,
  animation = "slide-right",
  exitAnimation,
  width = "w-[400px]",
  closable = true,
  onClose,
}: CompanionDialogCompanionProps) => {
  const { open, companionOpen, setCompanionOpen, position, gap } = useCompanionDialog()
  const { enter, exit } = resolveAnimationPair(animation, exitAnimation)

  const handleClose = () => {
    onClose?.()
    setCompanionOpen(false)
  }

  // Calculate position - opposite side of primary with gap
  const getPositionStyle = () => {
    const margin = 24
    // Primary is at `margin` from edge, companion needs to account for primary width + gap
    // We use CSS calc for this
    
    if (position === "right") {
      // Primary is on right, companion goes on left
      return {
        right: `calc(${margin}px + ${width.replace('w-[', '').replace(']', '')} + ${gap}px)`,
        top: "50%",
        translateY: "-50%",
      }
    } else {
      // Primary is on left, companion goes on right
      return {
        left: `calc(${margin}px + ${width.replace('w-[', '').replace(']', '')} + ${gap}px)`,
        top: "50%",
        translateY: "-50%",
      }
    }
  }

  const posStyle = getPositionStyle()

  // Need to render in a portal to escape the primary dialog's DOM tree
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return createPortal(
    <AnimatePresence mode="wait">
      {open && companionOpen && (
        <motion.div
          key="companion-dialog-secondary"
          className={cn(
            "fixed z-50 flex flex-col gap-4 border bg-background p-6 shadow-2xl rounded-lg",
            width,
            className
          )}
          style={{
            ...posStyle,
            transform: `translateY(${posStyle.translateY})`,
          }}
          initial={enter.initial}
          animate={enter.animate}
          exit={exit.exit}
          transition={enter.transition}
        >
          {children}
          {closable && (
            <button
              onClick={handleClose}
              className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-[opacity,transform] duration-150 hover:opacity-100 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 active:scale-95"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close panel</span>
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  )
}

/* -------------------------------------------------------------------------------------------------
 * CompanionDialogTriggerCompanion (Opens the companion dialog)
 * -----------------------------------------------------------------------------------------------*/

interface CompanionDialogTriggerCompanionProps {
  children: React.ReactNode
  asChild?: boolean
  className?: string
}

const CompanionDialogTriggerCompanion = React.forwardRef<
  HTMLButtonElement,
  CompanionDialogTriggerCompanionProps
>(({ children, asChild, className, ...props }, ref) => {
  const { setCompanionOpen, companionOpen } = useCompanionDialog()

  const handleClick = () => {
    setCompanionOpen(!companionOpen)
  }

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement<{ onClick?: () => void }>, {
      onClick: handleClick,
    })
  }

  return (
    <button
      ref={ref}
      type="button"
      onClick={handleClick}
      className={className}
      {...props}
    >
      {children}
    </button>
  )
})
CompanionDialogTriggerCompanion.displayName = "CompanionDialogTriggerCompanion"

/* -------------------------------------------------------------------------------------------------
 * Layout Components
 * -----------------------------------------------------------------------------------------------*/

const CompanionDialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("flex flex-col space-y-1.5 text-center sm:text-left", className)}
    {...props}
  />
)
CompanionDialogHeader.displayName = "CompanionDialogHeader"

const CompanionDialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 mt-auto pt-4", className)}
    {...props}
  />
)
CompanionDialogFooter.displayName = "CompanionDialogFooter"

const CompanionDialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn("text-lg font-semibold leading-none tracking-tight", className)}
    {...props}
  />
))
CompanionDialogTitle.displayName = DialogPrimitive.Title.displayName

const CompanionDialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
CompanionDialogDescription.displayName = DialogPrimitive.Description.displayName

const CompanionDialogClose = DialogPrimitive.Close

export {
  CompanionDialog,
  CompanionDialogTrigger,
  CompanionDialogContent,
  CompanionDialogCompanion,
  CompanionDialogTriggerCompanion,
  CompanionDialogHeader,
  CompanionDialogFooter,
  CompanionDialogTitle,
  CompanionDialogDescription,
  CompanionDialogClose,
  type AnimationProp as CompanionDialogAnimationProp,
}
