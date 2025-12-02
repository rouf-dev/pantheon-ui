import type { Meta, StoryObj } from '@storybook/react'
import { RadioGroup, RadioGroupItem } from './radio-group'

const meta: Meta<typeof RadioGroup> = {
  title: 'UI/RadioGroup',
  component: RadioGroup,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <RadioGroup defaultValue="option-1">
      <RadioGroupItem value="option-1" label="Option 1" />
      <RadioGroupItem value="option-2" label="Option 2" />
      <RadioGroupItem value="option-3" label="Option 3" />
    </RadioGroup>
  ),
}

export const WithLabel: Story = {
  render: () => (
    <RadioGroup label="Select an option" defaultValue="option-1">
      <RadioGroupItem value="option-1" label="Option 1" />
      <RadioGroupItem value="option-2" label="Option 2" />
      <RadioGroupItem value="option-3" label="Option 3" />
    </RadioGroup>
  ),
}

export const WithDescriptions: Story = {
  render: () => (
    <RadioGroup label="Notification preference" defaultValue="all">
      <RadioGroupItem value="all" label="All notifications" description="Receive all notifications" />
      <RadioGroupItem value="important" label="Important only" description="Only receive important notifications" />
      <RadioGroupItem value="none" label="None" description="Don't receive any notifications" />
    </RadioGroup>
  ),
}

export const ErrorState: Story = {
  render: () => (
    <RadioGroup label="Select a plan" error="Please select a plan to continue">
      <RadioGroupItem value="free" label="Free" description="Basic features" />
      <RadioGroupItem value="pro" label="Pro" description="Advanced features" />
      <RadioGroupItem value="enterprise" label="Enterprise" description="All features" />
    </RadioGroup>
  ),
}

export const Disabled: Story = {
  render: () => (
    <RadioGroup defaultValue="option-1">
      <RadioGroupItem value="option-1" label="Available" />
      <RadioGroupItem value="option-2" label="Disabled" disabled />
      <RadioGroupItem value="option-3" label="Also available" />
    </RadioGroup>
  ),
}

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <RadioGroup label="Small" defaultValue="a">
        <RadioGroupItem value="a" label="Option A" size="sm" />
        <RadioGroupItem value="b" label="Option B" size="sm" />
      </RadioGroup>
      <RadioGroup label="Default" defaultValue="a">
        <RadioGroupItem value="a" label="Option A" size="default" />
        <RadioGroupItem value="b" label="Option B" size="default" />
      </RadioGroup>
      <RadioGroup label="Large" defaultValue="a">
        <RadioGroupItem value="a" label="Option A" size="lg" />
        <RadioGroupItem value="b" label="Option B" size="lg" />
      </RadioGroup>
    </div>
  ),
}

export const Horizontal: Story = {
  render: () => (
    <RadioGroup className="flex flex-row gap-6" defaultValue="option-1">
      <RadioGroupItem value="option-1" label="Option 1" />
      <RadioGroupItem value="option-2" label="Option 2" />
      <RadioGroupItem value="option-3" label="Option 3" />
    </RadioGroup>
  ),
}
