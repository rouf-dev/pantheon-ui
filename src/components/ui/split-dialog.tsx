"use client"

import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { X } from "lucide-react"
import { motion, AnimatePresence } from "motion/react"

import { cn } from "@/lib/utils"
import { resolveAnimationPair, dialogOverlayVariants, type AnimationProp } from "@/lib/motion"

/* -------------------------------------------------------------------------------------------------
 * Split Ratios
 * -----------------------------------------------------------------------------------------------*/

type SplitRatio = "single" | "50/50" | "40/60" | "60/40" | "33/67" | "67/33" | "30/70" | "70/30"

const splitRatioClasses: Record<SplitRatio, { primary: string; secondary: string }> = {
  single: { primary: "w-full", secondary: "hidden" },
  "50/50": { primary: "w-1/2", secondary: "w-1/2" },
  "40/60": { primary: "w-2/5", secondary: "w-3/5" },
  "60/40": { primary: "w-3/5", secondary: "w-2/5" },
  "33/67": { primary: "w-1/3", secondary: "w-2/3" },
  "67/33": { primary: "w-2/3", secondary: "w-1/3" },
  "30/70": { primary: "w-[30%]", secondary: "w-[70%]" },
  "70/30": { primary: "w-[70%]", secondary: "w-[30%]" },
}

/* -------------------------------------------------------------------------------------------------
 * SplitDialog Context
 * -----------------------------------------------------------------------------------------------*/

interface SplitDialogContextValue {
  open: boolean
  secondaryOpen: boolean
  setSecondaryOpen: (open: boolean) => void
  split: SplitRatio
  closeAllOnPrimaryClose: boolean
}

const SplitDialogContext = React.createContext<SplitDialogContextValue | null>(null)

function useSplitDialog() {
  const context = React.useContext(SplitDialogContext)
  if (!context) {
    throw new Error("SplitDialog components must be used within a SplitDialog")
  }
  return context
}

/* -------------------------------------------------------------------------------------------------
 * SplitDialog Root
 * -----------------------------------------------------------------------------------------------*/

interface SplitDialogProps {
  children: React.ReactNode
  /** Controlled open state */
  open?: boolean
  /** Callback when open state changes */
  onOpenChange?: (open: boolean) => void
  /** Default open state for uncontrolled usage */
  defaultOpen?: boolean
  /** Split ratio between panels */
  split?: SplitRatio
  /** Whether closing primary closes secondary too (default: true) */
  closeAllOnPrimaryClose?: boolean
}

const SplitDialog = ({
  children,
  open: controlledOpen,
  onOpenChange,
  defaultOpen = false,
  split = "single",
  closeAllOnPrimaryClose = true,
}: SplitDialogProps) => {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen)
  const [secondaryOpen, setSecondaryOpen] = React.useState(false)

  const isControlled = controlledOpen !== undefined
  const open = isControlled ? controlledOpen : uncontrolledOpen

  const handleOpenChange = React.useCallback((newOpen: boolean) => {
    if (!isControlled) {
      setUncontrolledOpen(newOpen)
    }
    // Close secondary when primary closes
    if (!newOpen && closeAllOnPrimaryClose) {
      setSecondaryOpen(false)
    }
    onOpenChange?.(newOpen)
  }, [isControlled, onOpenChange, closeAllOnPrimaryClose])

  // Handle ESC key - close secondary first, then primary
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        e.preventDefault()
        if (secondaryOpen) {
          setSecondaryOpen(false)
        } else {
          handleOpenChange(false)
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [open, secondaryOpen, handleOpenChange])

  return (
    <SplitDialogContext.Provider
      value={{
        open,
        secondaryOpen,
        setSecondaryOpen,
        split: secondaryOpen ? split : "single",
        closeAllOnPrimaryClose,
      }}
    >
      <DialogPrimitive.Root open={open} onOpenChange={handleOpenChange}>
        {children}
      </DialogPrimitive.Root>
    </SplitDialogContext.Provider>
  )
}

const SplitDialogTrigger = DialogPrimitive.Trigger

/* -------------------------------------------------------------------------------------------------
 * SplitDialogContent (Container for both panels)
 * -----------------------------------------------------------------------------------------------*/

interface SplitDialogContentProps {
  children: React.ReactNode
  className?: string
  /** Max width when in single panel mode */
  maxWidth?: string
  /** Max width when in split mode */
  splitMaxWidth?: string
}

const SplitDialogContent = ({
  children,
  className,
  maxWidth = "max-w-lg",
  splitMaxWidth = "max-w-4xl",
}: SplitDialogContentProps) => {
  const { open, secondaryOpen, split } = useSplitDialog()
  const isSplit = split !== "single" && secondaryOpen

  return (
    <AnimatePresence mode="wait">
      {open && (
        <DialogPrimitive.Portal forceMount>
          <DialogPrimitive.Overlay forceMount asChild>
            <motion.div
              key="split-dialog-overlay"
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-[2px]"
              {...dialogOverlayVariants}
            />
          </DialogPrimitive.Overlay>
          <DialogPrimitive.Content forceMount asChild>
            <motion.div
              key="split-dialog-container"
              className={cn(
                "fixed left-[50%] top-[50%] z-50 flex gap-0 overflow-hidden rounded-lg border bg-background shadow-2xl",
                isSplit ? splitMaxWidth : maxWidth,
                className
              )}
              style={{ translate: "-50% -50%" }}
              {...resolveAnimationPair("zoom").enter}
              animate={{ 
                opacity: 1, 
                scale: 1,
                width: isSplit ? "auto" : undefined,
              }}
              layout
            >
              {children}
            </motion.div>
          </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
      )}
    </AnimatePresence>
  )
}

/* -------------------------------------------------------------------------------------------------
 * SplitDialogPanel (Individual panel - primary or secondary)
 * -----------------------------------------------------------------------------------------------*/

interface SplitDialogPanelProps {
  children: React.ReactNode
  className?: string
  /** Panel type */
  type: "primary" | "secondary"
  /** Entry animation - preset or custom config */
  animation?: AnimationProp
  /** Exit animation (defaults to same as animation) */
  exitAnimation?: AnimationProp
  /** Show close button (default: true for primary, true for secondary) */
  closable?: boolean
  /** Custom close handler for secondary panel */
  onClose?: () => void
}

const SplitDialogPanel = ({
  children,
  className,
  type,
  animation = type === "primary" ? "fade" : "slide-left",
  exitAnimation,
  closable = true,
  onClose,
}: SplitDialogPanelProps) => {
  const { split, secondaryOpen, setSecondaryOpen } = useSplitDialog()
  const ratioClasses = splitRatioClasses[split]
  
  const isPrimary = type === "primary"
  const isSecondary = type === "secondary"
  const shouldShow = isPrimary || (isSecondary && secondaryOpen)

  const handleClose = () => {
    if (isSecondary) {
      onClose?.()
      setSecondaryOpen(false)
    }
  }

  const { enter, exit } = resolveAnimationPair(animation, exitAnimation)

  if (!shouldShow) return null

  return (
    <motion.div
      className={cn(
        "relative flex flex-col p-6",
        isPrimary ? ratioClasses.primary : ratioClasses.secondary,
        isSecondary && "border-l",
        className
      )}
      initial={isSecondary ? enter.initial : undefined}
      animate={isSecondary ? enter.animate : undefined}
      exit={isSecondary ? exit.exit : undefined}
      transition={enter.transition}
      layout
    >
      {children}
      {closable && isSecondary && (
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-[opacity,transform] duration-150 hover:opacity-100 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 active:scale-95"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close panel</span>
        </button>
      )}
    </motion.div>
  )
}

/* -------------------------------------------------------------------------------------------------
 * SplitDialogTriggerSecondary (Opens the secondary panel)
 * -----------------------------------------------------------------------------------------------*/

interface SplitDialogTriggerSecondaryProps {
  children: React.ReactNode
  asChild?: boolean
  className?: string
}

const SplitDialogTriggerSecondary = React.forwardRef<
  HTMLButtonElement,
  SplitDialogTriggerSecondaryProps
>(({ children, asChild, className, ...props }, ref) => {
  const { setSecondaryOpen, secondaryOpen } = useSplitDialog()

  const handleClick = () => {
    setSecondaryOpen(!secondaryOpen)
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
SplitDialogTriggerSecondary.displayName = "SplitDialogTriggerSecondary"

/* -------------------------------------------------------------------------------------------------
 * Layout Components (shared with regular Dialog)
 * -----------------------------------------------------------------------------------------------*/

const SplitDialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("flex flex-col space-y-1.5 text-center sm:text-left", className)}
    {...props}
  />
)
SplitDialogHeader.displayName = "SplitDialogHeader"

const SplitDialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 mt-auto pt-4", className)}
    {...props}
  />
)
SplitDialogFooter.displayName = "SplitDialogFooter"

const SplitDialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn("text-lg font-semibold leading-none tracking-tight", className)}
    {...props}
  />
))
SplitDialogTitle.displayName = DialogPrimitive.Title.displayName

const SplitDialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
SplitDialogDescription.displayName = DialogPrimitive.Description.displayName

const SplitDialogClose = DialogPrimitive.Close

export {
  SplitDialog,
  SplitDialogTrigger,
  SplitDialogContent,
  SplitDialogPanel,
  SplitDialogTriggerSecondary,
  SplitDialogHeader,
  SplitDialogFooter,
  SplitDialogTitle,
  SplitDialogDescription,
  SplitDialogClose,
  type SplitRatio,
  type AnimationProp as SplitDialogAnimationProp,
}
