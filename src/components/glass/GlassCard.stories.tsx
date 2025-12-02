import type { Meta, StoryObj } from '@storybook/react'
import { GlassCard } from './GlassCard'
import { CardHeader, CardTitle, CardDescription, CardContent } from '../ui/card'

const meta: Meta<typeof GlassCard> = {
  title: 'Glass/GlassCard',
  component: GlassCard,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'gradient',
      values: [
        { name: 'gradient', value: 'linear-gradient(135deg, #00b3f2 0%, #006f8b 100%)' },
        { name: 'dark', value: '#092b3a' },
        { name: 'image', value: 'url(https://images.unsplash.com/photo-1557683316-973673baf926?w=800)' },
      ],
    },
  },
  tags: ['autodocs'],
  argTypes: {
    intensity: {
      control: 'select',
      options: ['light', 'medium', 'heavy'],
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <GlassCard {...args} className="w-[350px]">
      <CardHeader>
        <CardTitle className="text-white">Glass Card</CardTitle>
        <CardDescription className="text-white/70">With glassmorphism effect</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-white/90">This card has a frosted glass effect with backdrop blur.</p>
      </CardContent>
    </GlassCard>
  ),
  args: {
    intensity: 'medium',
  },
}

export const Light: Story = {
  render: () => (
    <GlassCard intensity="light" className="w-[350px]">
      <CardHeader>
        <CardTitle className="text-white">Light Intensity</CardTitle>
        <CardDescription className="text-white/70">Subtle glass effect</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-white/90">Light blur with minimal opacity.</p>
      </CardContent>
    </GlassCard>
  ),
}

export const Medium: Story = {
  render: () => (
    <GlassCard intensity="medium" className="w-[350px]">
      <CardHeader>
        <CardTitle className="text-white">Medium Intensity</CardTitle>
        <CardDescription className="text-white/70">Balanced glass effect</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-white/90">Medium blur with balanced opacity.</p>
      </CardContent>
    </GlassCard>
  ),
}

export const Heavy: Story = {
  render: () => (
    <GlassCard intensity="heavy" className="w-[350px]">
      <CardHeader>
        <CardTitle className="text-white">Heavy Intensity</CardTitle>
        <CardDescription className="text-white/70">Strong glass effect</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-white/90">Heavy blur with higher opacity.</p>
      </CardContent>
    </GlassCard>
  ),
}

export const AllIntensities: Story = {
  render: () => (
    <div className="flex gap-4">
      <GlassCard intensity="light" className="w-[200px] p-4">
        <p className="text-white font-medium">Light</p>
      </GlassCard>
      <GlassCard intensity="medium" className="w-[200px] p-4">
        <p className="text-white font-medium">Medium</p>
      </GlassCard>
      <GlassCard intensity="heavy" className="w-[200px] p-4">
        <p className="text-white font-medium">Heavy</p>
      </GlassCard>
    </div>
  ),
}
