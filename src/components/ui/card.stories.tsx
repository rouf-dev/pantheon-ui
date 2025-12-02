import type { Meta, StoryObj } from '@storybook/react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './card'
import { Button } from './button'

const meta: Meta<typeof Card> = {
  title: 'UI/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'elevated', 'outline', 'ghost', 'glass', 'interactive'],
    },
    glassIntensity: {
      control: 'select',
      options: ['light', 'medium', 'heavy'],
    },
    animated: {
      control: 'boolean',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <Card {...args} className="w-[350px]">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card description goes here.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card content goes here. You can put any content inside.</p>
      </CardContent>
      <CardFooter>
        <Button>Action</Button>
      </CardFooter>
    </Card>
  ),
  args: {
    variant: 'default',
  },
}

export const Elevated: Story = {
  render: () => (
    <Card variant="elevated" className="w-[350px]">
      <CardHeader>
        <CardTitle>Elevated Card</CardTitle>
        <CardDescription>With enhanced shadow.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>This card has a larger shadow and hover effect.</p>
      </CardContent>
    </Card>
  ),
}

export const Outline: Story = {
  render: () => (
    <Card variant="outline" className="w-[350px]">
      <CardHeader>
        <CardTitle>Outline Card</CardTitle>
        <CardDescription>Border only, no background.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>This card has a thicker border and transparent background.</p>
      </CardContent>
    </Card>
  ),
}

export const Ghost: Story = {
  render: () => (
    <Card variant="ghost" className="w-[350px]">
      <CardHeader>
        <CardTitle>Ghost Card</CardTitle>
        <CardDescription>No border or shadow.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>This card is completely transparent.</p>
      </CardContent>
    </Card>
  ),
}

export const Glass: Story = {
  parameters: {
    backgrounds: {
      default: 'gradient',
      values: [
        { name: 'gradient', value: 'linear-gradient(135deg, #00b3f2 0%, #006f8b 100%)' },
      ],
    },
  },
  render: () => (
    <Card variant="glass" glassIntensity="medium" className="w-[350px]">
      <CardHeader>
        <CardTitle className="text-white">Glass Card</CardTitle>
        <CardDescription className="text-white/70">With glassmorphism effect.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-white/90">This card has a frosted glass effect with backdrop blur.</p>
      </CardContent>
      <CardFooter>
        <Button variant="secondary">Action</Button>
      </CardFooter>
    </Card>
  ),
}

export const GlassIntensities: Story = {
  parameters: {
    backgrounds: {
      default: 'gradient',
      values: [
        { name: 'gradient', value: 'linear-gradient(135deg, #00b3f2 0%, #006f8b 100%)' },
      ],
    },
  },
  render: () => (
    <div className="flex gap-4">
      <Card variant="glass" glassIntensity="light" className="w-[200px] p-4">
        <p className="text-white font-medium">Light</p>
      </Card>
      <Card variant="glass" glassIntensity="medium" className="w-[200px] p-4">
        <p className="text-white font-medium">Medium</p>
      </Card>
      <Card variant="glass" glassIntensity="heavy" className="w-[200px] p-4">
        <p className="text-white font-medium">Heavy</p>
      </Card>
    </div>
  ),
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Card variant="default" className="w-[300px] p-4">
        <p className="font-medium">Default</p>
      </Card>
      <Card variant="elevated" className="w-[300px] p-4">
        <p className="font-medium">Elevated (hover me!)</p>
      </Card>
      <Card variant="outline" className="w-[300px] p-4">
        <p className="font-medium">Outline</p>
      </Card>
      <Card variant="ghost" className="w-[300px] p-4">
        <p className="font-medium">Ghost</p>
      </Card>
      <Card variant="interactive" className="w-[300px] p-4">
        <p className="font-medium">Interactive (click me!)</p>
      </Card>
    </div>
  ),
}

export const Interactive: Story = {
  render: () => (
    <Card variant="interactive" className="w-[350px]">
      <CardHeader>
        <CardTitle>Interactive Card</CardTitle>
        <CardDescription>Click or hover for motion effects.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>This card lifts on hover and presses on click using physics-based spring animations.</p>
      </CardContent>
      <CardFooter>
        <Button>Learn More</Button>
      </CardFooter>
    </Card>
  ),
}

export const AnimatedDefault: Story = {
  render: () => (
    <Card animated className="w-[350px]">
      <CardHeader>
        <CardTitle>Animated Card</CardTitle>
        <CardDescription>Default variant with animations enabled.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Use the `animated` prop to add hover lift to any card variant.</p>
      </CardContent>
    </Card>
  ),
}
