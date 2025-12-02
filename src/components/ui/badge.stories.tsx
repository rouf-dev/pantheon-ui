import type { Meta, StoryObj } from '@storybook/react'
import { Badge } from './badge'

const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 6 9 17l-5-5" />
  </svg>
)

const AlertIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" /><path d="M12 9v4" /><path d="M12 17h.01" />
  </svg>
)

const meta: Meta<typeof Badge> = {
  title: 'UI/Badge',
  component: Badge,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['default', 'secondary', 'destructive', 'success', 'warning', 'outline', 'ghost'] },
    size: { control: 'select', options: ['sm', 'default', 'lg'] },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { args: { children: 'Badge' } }
export const Secondary: Story = { args: { children: 'Secondary', variant: 'secondary' } }
export const Destructive: Story = { args: { children: 'Destructive', variant: 'destructive' } }
export const Success: Story = { args: { children: 'Success', variant: 'success' } }
export const Warning: Story = { args: { children: 'Warning', variant: 'warning' } }
export const Outline: Story = { args: { children: 'Outline', variant: 'outline' } }
export const Ghost: Story = { args: { children: 'Ghost', variant: 'ghost' } }

export const WithDot: Story = { args: { children: 'Active', dot: true, variant: 'success' } }
export const WithIcon: Story = { args: { children: 'Verified', icon: <CheckIcon />, variant: 'success' } }
export const WarningWithIcon: Story = { args: { children: 'Warning', icon: <AlertIcon />, variant: 'warning' } }

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="default">Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="ghost">Ghost</Badge>
    </div>
  ),
}

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Badge size="sm">Small</Badge>
      <Badge size="default">Default</Badge>
      <Badge size="lg">Large</Badge>
    </div>
  ),
}

export const StatusBadges: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="success" dot>Active</Badge>
      <Badge variant="warning" dot>Pending</Badge>
      <Badge variant="destructive" dot>Offline</Badge>
      <Badge variant="ghost" dot>Draft</Badge>
    </div>
  ),
}
