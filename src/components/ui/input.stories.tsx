import type { Meta, StoryObj } from '@storybook/react'
import { Input } from './input'

// Example icons for stories
const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
  </svg>
)

const MailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
)

const LockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
)

const EyeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" />
  </svg>
)

const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 6 9 17l-5-5" />
  </svg>
)

const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
  </svg>
)

const meta: Meta<typeof Input> = {
  title: 'UI/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'filled', 'ghost', 'outline'],
    },
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg', 'xl'],
    },
    state: {
      control: 'select',
      options: ['default', 'error', 'success'],
    },
    disabled: {
      control: 'boolean',
    },
    clearable: {
      control: 'boolean',
    },
    fullWidth: {
      control: 'boolean',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: '320px' }}>
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof meta>

// Default
export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
  },
}

// With Label
export const WithLabel: Story = {
  args: {
    label: 'Email',
    placeholder: 'Enter your email',
  },
}

// With Helper Text
export const WithHelperText: Story = {
  args: {
    label: 'Username',
    placeholder: 'Enter username',
    helperText: 'Must be at least 3 characters',
  },
}

// Error State
export const ErrorState: Story = {
  args: {
    label: 'Email',
    placeholder: 'Enter email',
    defaultValue: 'invalid-email',
    error: 'Please enter a valid email address',
  },
}

// Success State
export const SuccessState: Story = {
  args: {
    label: 'Email',
    placeholder: 'Enter email',
    defaultValue: 'valid@email.com',
    success: 'Email is available!',
  },
}

// With Left Icon
export const WithLeftIcon: Story = {
  args: {
    placeholder: 'Search...',
    leftIcon: <SearchIcon />,
  },
}

// With Right Icon
export const WithRightIcon: Story = {
  args: {
    label: 'Password',
    type: 'password',
    placeholder: 'Enter password',
    leftIcon: <LockIcon />,
    rightIcon: <EyeIcon />,
  },
}

// Email Input
export const EmailInput: Story = {
  args: {
    label: 'Email Address',
    type: 'email',
    placeholder: 'you@example.com',
    leftIcon: <MailIcon />,
    helperText: "We'll never share your email",
  },
}

// Clearable
export const Clearable: Story = {
  args: {
    label: 'Search',
    placeholder: 'Type to search...',
    leftIcon: <SearchIcon />,
    clearable: true,
    defaultValue: 'React components',
  },
}

// Disabled
export const Disabled: Story = {
  args: {
    label: 'Disabled Input',
    placeholder: 'Cannot edit',
    defaultValue: 'Disabled value',
    disabled: true,
  },
}

// Variants
export const VariantDefault: Story = {
  args: {
    label: 'Default Variant',
    placeholder: 'Default input style',
    variant: 'default',
  },
}

export const VariantFilled: Story = {
  args: {
    label: 'Filled Variant',
    placeholder: 'Filled input style',
    variant: 'filled',
  },
}

export const VariantGhost: Story = {
  args: {
    label: 'Ghost Variant',
    placeholder: 'Ghost input style',
    variant: 'ghost',
  },
}

export const VariantOutline: Story = {
  args: {
    label: 'Outline Variant',
    placeholder: 'Outline input style',
    variant: 'outline',
  },
}

// Sizes
export const SizeSmall: Story = {
  args: {
    label: 'Small',
    placeholder: 'Small input',
    size: 'sm',
  },
}

export const SizeDefault: Story = {
  args: {
    label: 'Default',
    placeholder: 'Default input',
    size: 'default',
  },
}

export const SizeLarge: Story = {
  args: {
    label: 'Large',
    placeholder: 'Large input',
    size: 'lg',
  },
}

export const SizeXL: Story = {
  args: {
    label: 'Extra Large',
    placeholder: 'Extra large input',
    size: 'xl',
  },
}

// All Sizes Comparison
export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Input label="Small" placeholder="Small input" size="sm" leftIcon={<UserIcon />} />
      <Input label="Default" placeholder="Default input" size="default" leftIcon={<UserIcon />} />
      <Input label="Large" placeholder="Large input" size="lg" leftIcon={<UserIcon />} />
      <Input label="Extra Large" placeholder="Extra large input" size="xl" leftIcon={<UserIcon />} />
    </div>
  ),
}

// All Variants Comparison
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Input label="Default" placeholder="Default variant" variant="default" />
      <Input label="Filled" placeholder="Filled variant" variant="filled" />
      <Input label="Ghost" placeholder="Ghost variant" variant="ghost" />
      <Input label="Outline" placeholder="Outline variant" variant="outline" />
    </div>
  ),
}

// All States
export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Input 
        label="Normal" 
        placeholder="Normal state" 
        helperText="This is helper text"
      />
      <Input 
        label="Error" 
        placeholder="Error state" 
        defaultValue="Invalid input"
        error="This field has an error" 
      />
      <Input 
        label="Success" 
        placeholder="Success state" 
        defaultValue="Valid input"
        success="Looking good!" 
        rightIcon={<CheckIcon />}
      />
      <Input 
        label="Disabled" 
        placeholder="Disabled state" 
        defaultValue="Cannot edit"
        disabled 
      />
    </div>
  ),
}

// Form Example
export const FormExample: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-full">
      <Input 
        label="Full Name" 
        placeholder="John Doe"
        leftIcon={<UserIcon />}
      />
      <Input 
        label="Email" 
        type="email"
        placeholder="john@example.com"
        leftIcon={<MailIcon />}
        helperText="We'll use this for notifications"
      />
      <Input 
        label="Password" 
        type="password"
        placeholder="••••••••"
        leftIcon={<LockIcon />}
        rightIcon={<EyeIcon />}
        helperText="Must be at least 8 characters"
      />
    </div>
  ),
}

// Search Bar Example
export const SearchBarExample: Story = {
  args: {
    placeholder: 'Search components, docs, examples...',
    leftIcon: <SearchIcon />,
    clearable: true,
    variant: 'filled',
    size: 'lg',
  },
}

// Dark Mode Preview (uses Storybook's backgrounds)
export const WithDifferentTypes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Input label="Text" type="text" placeholder="Text input" />
      <Input label="Email" type="email" placeholder="email@example.com" leftIcon={<MailIcon />} />
      <Input label="Password" type="password" placeholder="••••••••" leftIcon={<LockIcon />} />
      <Input label="Number" type="number" placeholder="0" />
      <Input label="Date" type="date" />
      <Input label="Time" type="time" />
    </div>
  ),
}
