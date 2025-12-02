import type { Meta, StoryObj } from '@storybook/react'
import { Toaster, toast } from './toast'
import { Button } from './button'

const meta: Meta<typeof Toaster> = {
  title: 'UI/Toast',
  component: Toaster,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <>
        <Story />
        <Toaster position="bottom-right" />
      </>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Button onClick={() => toast('Event has been created')}>
      Show Toast
    </Button>
  ),
}

export const WithDescription: Story = {
  render: () => (
    <Button onClick={() => toast('Event Created', { description: 'Your event has been scheduled for tomorrow at 3pm.' })}>
      With Description
    </Button>
  ),
}

export const Success: Story = {
  render: () => (
    <Button variant="success" onClick={() => toast.success('Successfully saved!', { description: 'Your changes have been saved.' })}>
      Success Toast
    </Button>
  ),
}

export const Error: Story = {
  render: () => (
    <Button variant="destructive" onClick={() => toast.error('Error occurred', { description: 'Something went wrong. Please try again.' })}>
      Error Toast
    </Button>
  ),
}

export const Warning: Story = {
  render: () => (
    <Button variant="warning" onClick={() => toast.warning('Warning', { description: 'Your session will expire in 5 minutes.' })}>
      Warning Toast
    </Button>
  ),
}

export const WithAction: Story = {
  render: () => (
    <Button onClick={() => toast('File deleted', {
      description: 'The file has been moved to trash.',
      action: { label: 'Undo', onClick: () => console.log('Undo') },
    })}>
      With Action
    </Button>
  ),
}

export const PromiseToast: Story = {
  render: () => (
    <Button onClick={() => {
      const promise = (): Promise<void> => new Promise((resolve) => setTimeout(resolve, 2000))
      toast.promise(promise(), {
        loading: 'Loading...',
        success: 'Data loaded successfully!',
        error: 'Error loading data',
      })
    }}>
      Promise Toast
    </Button>
  ),
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Button variant="outline" onClick={() => toast('Default toast message')}>Default</Button>
      <Button variant="success" onClick={() => toast.success('Success message')}>Success</Button>
      <Button variant="destructive" onClick={() => toast.error('Error message')}>Error</Button>
      <Button variant="warning" onClick={() => toast.warning('Warning message')}>Warning</Button>
      <Button variant="secondary" onClick={() => toast.info('Info message')}>Info</Button>
    </div>
  ),
}
