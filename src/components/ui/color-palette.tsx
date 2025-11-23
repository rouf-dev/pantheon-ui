"use client"

import * as React from "react"
import { cn } from "../../lib/utils"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./card"

export interface ColorSwatchProps {
  name: string
  value: string
  description?: string
  className?: string
}

const ColorSwatch = React.forwardRef<HTMLDivElement, ColorSwatchProps>(
  ({ name, value, description, className }, ref) => {
    return (
      <div ref={ref} className={cn("flex flex-col gap-2", className)}>
        <div
          className="h-20 rounded-md border shadow-sm"
          style={{ backgroundColor: value }}
        />
        <div>
          <p className="text-sm font-medium">{name}</p>
          <p className="text-xs text-muted-foreground font-mono">{value}</p>
          {description && <p className="text-xs text-muted-foreground mt-1">{description}</p>}
        </div>
      </div>
    )
  }
)
ColorSwatch.displayName = "ColorSwatch"

export interface ColorPaletteProps extends React.HTMLAttributes<HTMLDivElement> {
  colors: Array<{
    name: string
    value: string
    description?: string
  }>
  columns?: 2 | 3 | 4 | 5
}

const ColorPalette = React.forwardRef<HTMLDivElement, ColorPaletteProps>(
  ({ className, colors, columns = 4, ...props }, ref) => {
    const gridCols = {
      2: "grid-cols-2",
      3: "grid-cols-3",
      4: "grid-cols-4",
      5: "grid-cols-5",
    }

    return (
      <Card ref={ref} className={className} {...props}>
        <CardHeader>
          <CardTitle>Color Palette</CardTitle>
          <CardDescription>Design system colors</CardDescription>
        </CardHeader>
        <CardContent>
          <div className={cn("grid gap-4", gridCols[columns])}>
            {colors.map((color, index) => (
              <ColorSwatch
                key={index}
                name={color.name}
                value={color.value}
                description={color.description}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }
)
ColorPalette.displayName = "ColorPalette"

export { ColorPalette, ColorSwatch }
