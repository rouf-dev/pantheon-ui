import type { Meta, StoryObj } from '@storybook/react'
import { Checkbox } from './checkbox'

const meta: Meta<typeof Checkbox> = {
  title: 'UI/Checkbox',
  component: Checkbox,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'default', 'lg'] },
    variant: { control: 'select', options: ['default', 'error', 'success'] },
    checked: { control: 'select', options: [true, false, 'indeterminate'] },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { args: {} }
export const Checked: Story = { args: { defaultChecked: true } }
export const WithLabel: Story = { args: { label: 'Accept terms and conditions' } }
export const WithDescription: Story = { args: { label: 'Marketing emails', description: 'Receive emails about new products and features' } }
export const ErrorState: Story = { args: { label: 'Accept terms', error: 'You must accept the terms to continue' } }
export const Indeterminate: Story = { args: { label: 'Select all', checked: 'indeterminate' } }
export const Disabled: Story = { args: { label: 'Disabled option', disabled: true } }
export const DisabledChecked: Story = { args: { label: 'Disabled checked', disabled: true, defaultChecked: true } }

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Checkbox size="sm" label="Small checkbox" />
      <Checkbox size="default" label="Default checkbox" />
      <Checkbox size="lg" label="Large checkbox" />
    </div>
  ),
}

export const FormExample: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-[300px]">
      <Checkbox label="Email notifications" description="Get notified when someone mentions you" defaultChecked />
      <Checkbox label="Push notifications" description="Receive push notifications on your device" />
      <Checkbox label="SMS notifications" description="Get text messages for urgent updates" disabled />
    </div>
  ),
}
