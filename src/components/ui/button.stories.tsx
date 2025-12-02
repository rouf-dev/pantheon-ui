import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './button'

// Example icons for stories
const PlusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14" /><path d="M12 5v14" />
  </svg>
)

const ArrowRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
  </svg>
)

const DownloadIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" x2="12" y1="15" y2="3" />
  </svg>
)

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link', 'success', 'warning'],
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg', 'xl', 'icon'],
    },
    disabled: {
      control: 'boolean',
    },
    loading: {
      control: 'boolean',
    },
    fullWidth: {
      control: 'boolean',
    },
    asChild: {
      control: 'boolean',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

// Default
export const Default: Story = {
  args: {
    children: 'Button',
  },
}

// Variants
export const Primary: Story = {
  args: {
    variant: 'default',
    children: 'Primary Button',
  },
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary Button',
  },
}

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    children: 'Destructive Button',
  },
}

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Outline Button',
  },
}

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: 'Ghost Button',
  },
}

export const Link: Story = {
  args: {
    variant: 'link',
    children: 'Link Button',
  },
}

export const Success: Story = {
  args: {
    variant: 'success',
    children: 'Success Button',
  },
}

export const Warning: Story = {
  args: {
    variant: 'warning',
    children: 'Warning Button',
  },
}

// Sizes
export const Small: Story = {
  args: {
    size: 'sm',
    children: 'Small Button',
  },
}

export const Large: Story = {
  args: {
    size: 'lg',
    children: 'Large Button',
  },
}

export const ExtraLarge: Story = {
  args: {
    size: 'xl',
    children: 'Extra Large Button',
  },
}

// States
export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Disabled Button',
  },
}

// All Variants
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button variant="default">Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
      <Button variant="success">Success</Button>
      <Button variant="warning">Warning</Button>
    </div>
  ),
}

// All Sizes
export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
      <Button size="xl">Extra Large</Button>
    </div>
  ),
}

// Loading States
export const Loading: Story = {
  args: {
    loading: true,
    children: 'Loading...',
  },
}

export const LoadingWithText: Story = {
  args: {
    loading: true,
    loadingText: 'Submitting...',
    children: 'Submit',
  },
}

export const LoadingVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button loading>Default</Button>
      <Button variant="secondary" loading>Secondary</Button>
      <Button variant="destructive" loading>Destructive</Button>
      <Button variant="outline" loading>Outline</Button>
      <Button variant="success" loading>Success</Button>
    </div>
  ),
}

// With Icons
export const WithLeftIcon: Story = {
  args: {
    leftIcon: <PlusIcon />,
    children: 'Add Item',
  },
}

export const WithRightIcon: Story = {
  args: {
    rightIcon: <ArrowRightIcon />,
    children: 'Continue',
  },
}

export const WithBothIcons: Story = {
  args: {
    leftIcon: <DownloadIcon />,
    rightIcon: <ArrowRightIcon />,
    children: 'Download',
  },
}

export const IconVariations: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button leftIcon={<PlusIcon />}>Create</Button>
      <Button rightIcon={<ArrowRightIcon />}>Next</Button>
      <Button variant="outline" leftIcon={<DownloadIcon />}>Download</Button>
      <Button variant="secondary" leftIcon={<PlusIcon />} rightIcon={<ArrowRightIcon />}>Both Icons</Button>
    </div>
  ),
}

// Full Width
export const FullWidth: Story = {
  args: {
    fullWidth: true,
    children: 'Full Width Button',
  },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
}

export const FullWidthWithIcon: Story = {
  args: {
    fullWidth: true,
    leftIcon: <PlusIcon />,
    children: 'Create New Item',
  },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
}

// Combined States
export const LoadingWithIcon: Story = {
  args: {
    loading: true,
    loadingText: 'Saving...',
    leftIcon: <PlusIcon />,
    children: 'Save',
  },
}

// Interactive Demo
export const InteractiveDemo: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="text-sm font-medium mb-2 text-muted-foreground">Hover to see lift animation</h3>
        <div className="flex gap-4">
          <Button>Hover me</Button>
          <Button variant="secondary">Hover me</Button>
          <Button variant="success">Hover me</Button>
        </div>
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2 text-muted-foreground">Click to see press animation</h3>
        <div className="flex gap-4">
          <Button>Click me</Button>
          <Button variant="destructive">Click me</Button>
          <Button variant="warning">Click me</Button>
        </div>
      </div>
    </div>
  ),
}
