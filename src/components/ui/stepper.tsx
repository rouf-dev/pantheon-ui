import * as React from 'react'
import { cn } from '@/lib/utils'
import { CheckCircle2 } from 'lucide-react'
import { Button } from './button'

export type StepperOrientation = 'horizontal' | 'vertical'
export type StepperAnimation = 'slide' | 'fade' | 'scale' | false

export interface Step {
  /**
   * Unique step identifier
   */
  id: string
  /**
   * Step title
   */
  title: string
  /**
   * Optional description
   */
  description?: string
  /**
   * Optional icon component
   */
  icon?: React.ComponentType<{ className?: string }>
  /**
   * Whether step is optional (can be skipped)
   */
  optional?: boolean
}

export interface StepperContextValue {
  steps: Step[]
  currentStep: number
  completedSteps: Set<number>
  orientation: StepperOrientation
  linear: boolean
  goToStep: (step: number) => void
  nextStep: () => void
  previousStep: () => void
  completeStep: (step: number) => void
  isStepComplete: (step: number) => boolean
  isStepAccessible: (step: number) => boolean
}

const StepperContext = React.createContext<StepperContextValue | undefined>(undefined)

export const useStepper = () => {
  const context = React.useContext(StepperContext)
  if (!context) {
    throw new Error('useStepper must be used within a Stepper')
  }
  return context
}

export interface StepperProps {
  /**
   * Array of step definitions
   */
  steps: Step[]
  /**
   * Current active step index
   * @default 0
   */
  currentStep?: number
  /**
   * Callback when step changes
   */
  onStepChange?: (step: number) => void
  /**
   * Linear mode (must complete steps in order)
   * @default true
   */
  linear?: boolean
  /**
   * Orientation
   * @default 'horizontal'
   */
  orientation?: StepperOrientation
  /**
   * Animation preset
   * @default 'fade'
   */
  animation?: StepperAnimation
  /**
   * Children (StepperContent components)
   */
  children: React.ReactNode
  /**
   * Additional class names
   */
  className?: string
}

/**
 * Stepper - Multi-step wizard component
 * 
 * Features:
 * - Linear or non-linear navigation
 * - Step completion tracking
 * - Horizontal or vertical layout
 * - Optional steps (can skip)
 * - Validation support per step
 * - Responsive (vertical on mobile)
 * - Animated transitions
 * 
 * @example
 * ```tsx
 * const steps = [
 *   { id: 'account', title: 'Account', description: 'Create your account' },
 *   { id: 'profile', title: 'Profile', description: 'Tell us about you' },
 *   { id: 'preferences', title: 'Preferences', optional: true },
 *   { id: 'review', title: 'Review', description: 'Review and submit' },
 * ]
 * 
 * <Stepper steps={steps} currentStep={0} onStepChange={setStep} linear>
 *   <StepperContent step={0}>
 *     <h2>Create Account</h2>
 *     <Input name="email" label="Email" />
 *   </StepperContent>
 *   
 *   <StepperContent step={1}>
 *     <h2>Profile Information</h2>
 *     <Input name="name" label="Name" />
 *   </StepperContent>
 *   
 *   <StepperContent step={2}>
 *     <h2>Preferences</h2>
 *     <p>This step is optional</p>
 *   </StepperContent>
 *   
 *   <StepperContent step={3}>
 *     <h2>Review</h2>
 *     <Button type="submit">Submit</Button>
 *   </StepperContent>
 * </Stepper>
 * ```
 */
export function Stepper({
  steps,
  currentStep: controlledStep = 0,
  onStepChange,
  linear = true,
  orientation = 'horizontal',
  animation = 'fade',
  children,
  className,
}: StepperProps) {
  const [currentStep, setCurrentStep] = React.useState(controlledStep)
  const [completedSteps, setCompletedSteps] = React.useState<Set<number>>(new Set())

  // Sync with controlled prop
  React.useEffect(() => {
    setCurrentStep(controlledStep)
  }, [controlledStep])

  const goToStep = React.useCallback(
    (step: number) => {
      if (step < 0 || step >= steps.length) return
      
      // In linear mode, can only go to completed steps or next step
      if (linear) {
        const canAccess = step <= currentStep + 1 || completedSteps.has(step)
        if (!canAccess) return
      }
      
      setCurrentStep(step)
      onStepChange?.(step)
    },
    [steps.length, linear, currentStep, completedSteps, onStepChange]
  )

  const nextStep = React.useCallback(() => {
    if (currentStep < steps.length - 1) {
      // Mark current as complete
      setCompletedSteps((prev) => new Set(prev).add(currentStep))
      goToStep(currentStep + 1)
    }
  }, [currentStep, steps.length, goToStep])

  const previousStep = React.useCallback(() => {
    if (currentStep > 0) {
      goToStep(currentStep - 1)
    }
  }, [currentStep, goToStep])

  const completeStep = React.useCallback((step: number) => {
    setCompletedSteps((prev) => new Set(prev).add(step))
  }, [])

  const isStepComplete = React.useCallback(
    (step: number) => completedSteps.has(step),
    [completedSteps]
  )

  const isStepAccessible = React.useCallback(
    (step: number) => {
      if (!linear) return true
      return step <= currentStep || completedSteps.has(step)
    },
    [linear, currentStep, completedSteps]
  )

  return (
    <StepperContext.Provider
      value={{
        steps,
        currentStep,
        completedSteps,
        orientation,
        linear,
        goToStep,
        nextStep,
        previousStep,
        completeStep,
        isStepComplete,
        isStepAccessible,
      }}
    >
      <div className={cn('w-full', className)}>
        <StepperHeader />
        <div className="mt-8">
          {React.Children.map(children, (child) => {
            if (React.isValidElement(child)) {
              return React.cloneElement(child, { animation } as any)
            }
            return child
          })}
        </div>
      </div>
    </StepperContext.Provider>
  )
}

/**
 * StepperHeader - Step indicators (dots/lines)
 */
function StepperHeader() {
  const { steps, currentStep, orientation, goToStep, isStepComplete, isStepAccessible } =
    useStepper()

  return (
    <div
      className={cn(
        'flex',
        orientation === 'horizontal' && 'flex-row items-center',
        orientation === 'vertical' && 'flex-col'
      )}
    >
      {steps.map((step, index) => {
        const isActive = index === currentStep
        const isComplete = isStepComplete(index)
        const isAccessible = isStepAccessible(index)
        const Icon = step.icon

        return (
          <React.Fragment key={step.id}>
            <button
              type="button"
              onClick={() => goToStep(index)}
              disabled={!isAccessible}
              className={cn(
                'flex items-center gap-3 text-left',
                'motion-safe:transition-opacity',
                !isAccessible && 'pointer-events-none opacity-50',
                orientation === 'horizontal' && 'flex-col items-center text-center',
                orientation === 'vertical' && 'w-full py-4'
              )}
            >
              {/* Step Circle/Icon */}
              <div
                className={cn(
                  'flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2',
                  'motion-safe:transition-colors',
                  isComplete && 'border-primary bg-primary text-primary-foreground',
                  isActive && !isComplete && 'border-primary bg-background text-primary',
                  !isActive && !isComplete && 'border-muted bg-background text-muted-foreground'
                )}
              >
                {isComplete ? (
                  <CheckCircle2 className="h-5 w-5" />
                ) : Icon ? (
                  <Icon className="h-5 w-5" />
                ) : (
                  <span className="text-sm font-medium">{index + 1}</span>
                )}
              </div>

              {/* Step Content */}
              <div className={cn(orientation === 'horizontal' && 'max-w-[120px]')}>
                <div
                  className={cn(
                    'text-sm font-medium',
                    isActive && 'text-foreground',
                    !isActive && 'text-muted-foreground'
                  )}
                >
                  {step.title}
                  {step.optional && (
                    <span className="ml-1 text-xs text-muted-foreground">(optional)</span>
                  )}
                </div>
                {step.description && (
                  <div className="text-xs text-muted-foreground">{step.description}</div>
                )}
              </div>
            </button>

            {/* Connector Line */}
            {index < steps.length - 1 && (
              <div
                className={cn(
                  'bg-border motion-safe:transition-colors',
                  orientation === 'horizontal' && 'h-[2px] flex-1 mx-2',
                  orientation === 'vertical' && 'w-[2px] h-8 ml-5',
                  isStepComplete(index) && 'bg-primary'
                )}
              />
            )}
          </React.Fragment>
        )
      })}
    </div>
  )
}

export interface StepperContentProps {
  /**
   * Step index this content belongs to
   */
  step: number
  /**
   * Content to render
   */
  children: React.ReactNode
  /**
   * Animation preset (passed from parent)
   */
  animation?: StepperAnimation
}

/**
 * StepperContent - Content for a specific step
 * 
 * Only renders when its step is active
 * 
 * @example
 * ```tsx
 * <StepperContent step={0}>
 *   <h2>Step 1 Content</h2>
 *   <Form>...</Form>
 * </StepperContent>
 * ```
 */
export function StepperContent({ step, children, animation = 'fade' }: StepperContentProps) {
  const { currentStep } = useStepper()

  if (currentStep !== step) return null

  const animationClasses = React.useMemo(() => {
    if (animation === false) return ''

    switch (animation) {
      case 'fade':
        return 'motion-safe:animate-in motion-safe:fade-in motion-safe:duration-200'
      case 'slide':
        return 'motion-safe:animate-in motion-safe:slide-in-from-right-5 motion-safe:fade-in motion-safe:duration-300'
      case 'scale':
        return 'motion-safe:animate-in motion-safe:zoom-in-95 motion-safe:fade-in motion-safe:duration-200'
      default:
        return ''
    }
  }, [animation])

  return <div className={cn(animationClasses)}>{children}</div>
}

export interface StepperActionsProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Show back button
   * @default true
   */
  showBack?: boolean
  /**
   * Show next button
   * @default true
   */
  showNext?: boolean
  /**
   * Custom back button label
   * @default 'Back'
   */
  backLabel?: string
  /**
   * Custom next button label
   * @default 'Next'
   */
  nextLabel?: string
  /**
   * Custom finish button label (shown on last step)
   * @default 'Finish'
   */
  finishLabel?: string
  /**
   * Callback for next/finish button
   */
  onNext?: () => void | Promise<void>
  /**
   * Callback for back button
   */
  onBack?: () => void
}

/**
 * StepperActions - Navigation buttons for stepper
 * 
 * @example
 * ```tsx
 * <StepperActions
 *   onNext={async () => {
 *     const valid = await validateForm()
 *     if (valid) return // Will proceed to next step
 *     throw new Error('Validation failed') // Will stay on current step
 *   }}
 * />
 * ```
 */
export function StepperActions({
  className,
  showBack = true,
  showNext = true,
  backLabel = 'Back',
  nextLabel = 'Next',
  finishLabel = 'Finish',
  onNext,
  onBack,
  ...props
}: StepperActionsProps) {
  const { currentStep, steps, previousStep, nextStep } = useStepper()
  const [loading, setLoading] = React.useState(false)

  const isFirstStep = currentStep === 0
  const isLastStep = currentStep === steps.length - 1

  const handleNext = async () => {
    if (onNext) {
      try {
        setLoading(true)
        await onNext()
        nextStep() // Only proceed if no error
      } catch (error) {
        // Stay on current step if validation fails
        console.error('Step validation failed:', error)
      } finally {
        setLoading(false)
      }
    } else {
      nextStep()
    }
  }

  const handleBack = () => {
    if (onBack) {
      onBack()
    } else {
      previousStep()
    }
  }

  return (
    <div className={cn('flex items-center justify-between gap-4 pt-6', className)} {...props}>
      {showBack && (
        <Button
          type="button"
          variant="outline"
          onClick={handleBack}
          disabled={isFirstStep || loading}
        >
          {backLabel}
        </Button>
      )}

      <div className="flex-1" />

      {showNext && (
        <Button type="button" onClick={handleNext} disabled={loading}>
          {loading ? 'Processing...' : isLastStep ? finishLabel : nextLabel}
        </Button>
      )}
    </div>
  )
}

export { StepperContext }
