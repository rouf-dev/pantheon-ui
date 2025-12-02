import type { Meta, StoryObj } from '@storybook/react'
import { Glass } from './glass'
import { Button } from './button'

const meta: Meta<typeof Glass> = {
  title: 'UI/Glass',
  component: Glass,
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
    rounded: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'xl', 'full'],
    },
    asChild: {
      control: 'boolean',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <Glass {...args} className="p-6 w-[300px]">
      <p className="text-white font-medium">Glass Container</p>
      <p className="text-white/70 text-sm mt-2">
        A generic glass wrapper that can be used with any content.
      </p>
    </Glass>
  ),
  args: {
    intensity: 'medium',
    rounded: 'lg',
  },
}

export const Intensities: Story = {
  render: () => (
    <div className="flex gap-4">
      <Glass intensity="light" className="p-4 w-[150px]">
        <p className="text-white font-medium text-center">Light</p>
      </Glass>
      <Glass intensity="medium" className="p-4 w-[150px]">
        <p className="text-white font-medium text-center">Medium</p>
      </Glass>
      <Glass intensity="heavy" className="p-4 w-[150px]">
        <p className="text-white font-medium text-center">Heavy</p>
      </Glass>
    </div>
  ),
}

export const RoundedVariants: Story = {
  render: () => (
    <div className="flex gap-4 items-center">
      <Glass rounded="none" className="p-4 w-[100px]">
        <p className="text-white text-sm text-center">none</p>
      </Glass>
      <Glass rounded="sm" className="p-4 w-[100px]">
        <p className="text-white text-sm text-center">sm</p>
      </Glass>
      <Glass rounded="md" className="p-4 w-[100px]">
        <p className="text-white text-sm text-center">md</p>
      </Glass>
      <Glass rounded="lg" className="p-4 w-[100px]">
        <p className="text-white text-sm text-center">lg</p>
      </Glass>
      <Glass rounded="xl" className="p-4 w-[100px]">
        <p className="text-white text-sm text-center">xl</p>
      </Glass>
      <Glass rounded="full" className="p-4 w-[100px]">
        <p className="text-white text-sm text-center">full</p>
      </Glass>
    </div>
  ),
}

export const AsChildWrapper: Story = {
  render: () => (
    <Glass asChild intensity="medium">
      <button className="px-6 py-3 text-white font-medium">
        Glass Button (asChild)
      </button>
    </Glass>
  ),
}

export const WithContent: Story = {
  render: () => (
    <Glass intensity="medium" className="p-6 w-[350px]">
      <h3 className="text-white text-xl font-semibold mb-2">Glass Panel</h3>
      <p className="text-white/80 text-sm mb-4">
        This is a versatile glass container that can wrap any content.
        Use it for overlays, panels, or decorative elements.
      </p>
      <div className="flex gap-2">
        <Button variant="secondary" size="sm">Cancel</Button>
        <Button size="sm">Confirm</Button>
      </div>
    </Glass>
  ),
}

export const Navbar: Story = {
  render: () => (
    <Glass intensity="medium" rounded="none" className="w-full px-6 py-4 flex items-center justify-between">
      <span className="text-white font-bold text-lg">Logo</span>
      <div className="flex gap-4">
        <a href="#" className="text-white/80 hover:text-white transition-colors">Home</a>
        <a href="#" className="text-white/80 hover:text-white transition-colors">About</a>
        <a href="#" className="text-white/80 hover:text-white transition-colors">Contact</a>
      </div>
      <Button variant="secondary" size="sm">Sign In</Button>
    </Glass>
  ),
}
