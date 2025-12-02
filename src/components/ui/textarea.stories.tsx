import type { Meta, StoryObj } from '@storybook/react'
import { Textarea } from './textarea'

const meta: Meta<typeof Textarea> = {
  title: 'UI/Textarea',
  component: Textarea,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['default', 'filled', 'ghost', 'outline'] },
    size: { control: 'select', options: ['sm', 'default', 'lg'] },
    resize: { control: 'select', options: ['none', 'vertical', 'horizontal', 'both'] },
  },
  decorators: [(Story) => <div style={{ width: '320px' }}><Story /></div>],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { args: { placeholder: 'Enter text...' } }
export const WithLabel: Story = { args: { label: 'Description', placeholder: 'Enter description' } }
export const WithHelperText: Story = { args: { label: 'Bio', placeholder: 'Tell us about yourself', helperText: 'Max 500 characters' } }
export const ErrorState: Story = { args: { label: 'Message', defaultValue: 'Too short', error: 'Message must be at least 10 characters' } }
export const SuccessState: Story = { args: { label: 'Message', defaultValue: 'This is a valid message', success: 'Looks good!' } }
export const WithCharacterCount: Story = { args: { label: 'Tweet', placeholder: 'What\'s happening?', showCount: true, maxLength: 280 } }
export const Resizable: Story = { args: { label: 'Notes', placeholder: 'Drag to resize', resize: 'vertical' } }
export const Disabled: Story = { args: { label: 'Disabled', defaultValue: 'Cannot edit', disabled: true } }

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Textarea label="Default" placeholder="Default variant" variant="default" />
      <Textarea label="Filled" placeholder="Filled variant" variant="filled" />
      <Textarea label="Ghost" placeholder="Ghost variant" variant="ghost" />
      <Textarea label="Outline" placeholder="Outline variant" variant="outline" />
    </div>
  ),
}

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Textarea label="Small" placeholder="Small textarea" size="sm" />
      <Textarea label="Default" placeholder="Default textarea" size="default" />
      <Textarea label="Large" placeholder="Large textarea" size="lg" />
    </div>
  ),
}
