import type { Meta, StoryObj } from '@storybook/react'
import { Progress } from './progress'

const meta: Meta<typeof Progress> = {
  title: 'UI/Progress',
  component: Progress,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['default', 'success', 'warning', 'destructive', 'gradient'] },
    size: { control: 'select', options: ['sm', 'default', 'lg', 'xl'] },
    value: { control: { type: 'range', min: 0, max: 100 } },
    labelPosition: { control: 'select', options: ['top', 'right', 'inside'] },
  },
  decorators: [(Story) => <div style={{ width: '300px' }}><Story /></div>],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { args: { value: 60 } }
export const WithLabel: Story = { args: { value: 60, showLabel: true } }
export const LabelTop: Story = { args: { value: 75, showLabel: true, labelPosition: 'top' } }
export const LabelInside: Story = { args: { value: 60, showLabel: true, labelPosition: 'inside', size: 'xl' } }

export const Success: Story = { args: { value: 100, variant: 'success' } }
export const Warning: Story = { args: { value: 50, variant: 'warning' } }
export const Destructive: Story = { args: { value: 25, variant: 'destructive' } }
export const Gradient: Story = { args: { value: 70, variant: 'gradient' } }

export const Animated: Story = { args: { value: 60, animated: true } }

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Progress value={60} size="sm" />
      <Progress value={60} size="default" />
      <Progress value={60} size="lg" />
      <Progress value={60} size="xl" />
    </div>
  ),
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Progress value={60} variant="default" showLabel />
      <Progress value={100} variant="success" showLabel />
      <Progress value={50} variant="warning" showLabel />
      <Progress value={25} variant="destructive" showLabel />
      <Progress value={80} variant="gradient" showLabel />
    </div>
  ),
}

export const UploadExample: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between text-sm">
        <span>Uploading document.pdf</span>
        <span className="text-muted-foreground">2.4 MB / 4.8 MB</span>
      </div>
      <Progress value={50} variant="default" />
    </div>
  ),
}
