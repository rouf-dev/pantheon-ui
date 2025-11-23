"use client"

import { Card } from "../ui/card"
import { cn } from "@/lib/utils"

export interface GlassCardProps extends React.ComponentPropsWithoutRef<typeof Card> {
  intensity?: 'light' | 'medium' | 'heavy'
}

export function GlassCard({ 
  className, 
  intensity = 'medium',
  children, 
  ...props 
}: GlassCardProps) {
  return (
    <Card
      className={cn(
        'shadow-xl border transition-all duration-300',
        // Blue-tinted glass effects
        intensity === 'light' && 'bg-glass-light backdrop-blur-md border-primary-100/40 hover:border-primary-200/50',
        intensity === 'medium' && 'bg-glass-medium backdrop-blur-lg border-primary-200/50 hover:border-primary-300/60',
        intensity === 'heavy' && 'bg-glass-heavy backdrop-blur-xl border-primary-300/60 hover:border-primary-400/70',
        className
      )}
      style={{
        backdropFilter: intensity === 'light' ? 'blur(12px)' : intensity === 'medium' ? 'blur(16px)' : 'blur(24px)',
        WebkitBackdropFilter: intensity === 'light' ? 'blur(12px)' : intensity === 'medium' ? 'blur(16px)' : 'blur(24px)',
      }}
      {...props}
    >
      {children}
    </Card>
  )
}
