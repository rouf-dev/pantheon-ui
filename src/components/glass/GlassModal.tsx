import { DialogContent } from "../ui/dialog"
import { cn } from "@/lib/utils"

export interface GlassModalProps extends React.ComponentPropsWithoutRef<typeof DialogContent> {
  intensity?: 'light' | 'medium' | 'heavy'
}

export function GlassModal({ 
  className, 
  intensity = 'medium',
  children, 
  ...props 
}: GlassModalProps) {
  return (
    <DialogContent
      className={cn(
        'backdrop-blur-glass border-white/20',
        intensity === 'light' && 'bg-glass-light',
        intensity === 'medium' && 'bg-glass-medium',
        intensity === 'heavy' && 'bg-white/30',
        className
      )}
      {...props}
    >
      {children}
    </DialogContent>
  )
}
