import type { Meta, StoryObj } from '@storybook/react'
import { Alert, AlertTitle, AlertDescription } from './alert'

const meta: Meta<typeof Alert> = {
  title: 'UI/Alert',
  component: Alert,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['default', 'info', 'success', 'warning', 'destructive'] },
  },
  decorators: [(Story) => <div style={{ width: '400px' }}><Story /></div>],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Alert>
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>You can add components to your app using the CLI.</AlertDescription>
    </Alert>
  ),
}

export const Info: Story = {
  render: () => (
    <Alert variant="info">
      <AlertTitle>Information</AlertTitle>
      <AlertDescription>This is an informational message for the user.</AlertDescription>
    </Alert>
  ),
}

export const Success: Story = {
  render: () => (
    <Alert variant="success">
      <AlertTitle>Success!</AlertTitle>
      <AlertDescription>Your changes have been saved successfully.</AlertDescription>
    </Alert>
  ),
}

export const Warning: Story = {
  render: () => (
    <Alert variant="warning">
      <AlertTitle>Warning</AlertTitle>
      <AlertDescription>Your session will expire in 5 minutes. Please save your work.</AlertDescription>
    </Alert>
  ),
}

export const Destructive: Story = {
  render: () => (
    <Alert variant="destructive">
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>Something went wrong. Please try again later.</AlertDescription>
    </Alert>
  ),
}

export const TitleOnly: Story = {
  render: () => (
    <Alert variant="info">
      <AlertTitle>Quick tip: Press ⌘K to open the command palette</AlertTitle>
    </Alert>
  ),
}

export const DescriptionOnly: Story = {
  render: () => (
    <Alert variant="success">
      <AlertDescription>Your profile has been updated.</AlertDescription>
    </Alert>
  ),
}

export const NoIcon: Story = {
  render: () => (
    <Alert hideIcon>
      <AlertTitle>Notice</AlertTitle>
      <AlertDescription>This alert has no icon.</AlertDescription>
    </Alert>
  ),
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Alert variant="default">
        <AlertTitle>Default</AlertTitle>
        <AlertDescription>This is a default alert.</AlertDescription>
      </Alert>
      <Alert variant="info">
        <AlertTitle>Info</AlertTitle>
        <AlertDescription>This is an info alert.</AlertDescription>
      </Alert>
      <Alert variant="success">
        <AlertTitle>Success</AlertTitle>
        <AlertDescription>This is a success alert.</AlertDescription>
      </Alert>
      <Alert variant="warning">
        <AlertTitle>Warning</AlertTitle>
        <AlertDescription>This is a warning alert.</AlertDescription>
      </Alert>
      <Alert variant="destructive">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>This is an error alert.</AlertDescription>
      </Alert>
    </div>
  ),
}
