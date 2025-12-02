import type { Meta, StoryObj } from '@storybook/react'
import { Switch } from './switch'

const meta: Meta<typeof Switch> = {
  title: 'UI/Switch',
  component: Switch,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'default', 'lg'] },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { args: {} }
export const Checked: Story = { args: { defaultChecked: true } }
export const WithLabel: Story = { args: { label: 'Airplane Mode' } }
export const WithDescription: Story = { args: { label: 'Dark Mode', description: 'Toggle dark mode on or off' } }
export const Disabled: Story = { args: { label: 'Disabled', disabled: true } }
export const DisabledChecked: Story = { args: { label: 'Disabled On', disabled: true, defaultChecked: true } }

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Switch size="sm" label="Small" />
      <Switch size="default" label="Default" />
      <Switch size="lg" label="Large" />
    </div>
  ),
}

export const SettingsExample: Story = {
  decorators: [(Story) => <div style={{ width: '300px' }}><Story /></div>],
  render: () => (
    <div className="flex flex-col gap-4">
      <Switch label="Push Notifications" description="Receive push notifications" defaultChecked />
      <Switch label="Email Notifications" description="Receive email updates" defaultChecked />
      <Switch label="SMS Notifications" description="Receive text messages" />
      <Switch label="Marketing" description="Receive marketing emails" disabled />
    </div>
  ),
}
