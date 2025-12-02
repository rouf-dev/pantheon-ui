import type { Meta, StoryObj } from '@storybook/react'
import * as React from 'react'
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from './collapsible'
import { Button } from './button'

const ChevronDownIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m6 9 6 6 6-6" />
  </svg>
)

const meta: Meta = {
  title: 'UI/Collapsible',
  component: Collapsible,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [(Story) => <div style={{ width: '350px' }}><Story /></div>],
}

export default meta
type Story = StoryObj

export const Default: Story = {
  render: function DefaultStory() {
    const [isOpen, setIsOpen] = React.useState(false)
    
    return (
      <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full space-y-2">
        <div className="flex items-center justify-between space-x-4 px-4">
          <h4 className="text-sm font-semibold">@peduarte starred 3 repositories</h4>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm">
              <ChevronDownIcon />
              <span className="sr-only">Toggle</span>
            </Button>
          </CollapsibleTrigger>
        </div>
        <div className="rounded-md border px-4 py-2 text-sm">@radix-ui/primitives</div>
        <CollapsibleContent className="space-y-2">
          <div className="rounded-md border px-4 py-2 text-sm">@radix-ui/colors</div>
          <div className="rounded-md border px-4 py-2 text-sm">@stitches/react</div>
        </CollapsibleContent>
      </Collapsible>
    )
  },
}

export const Sidebar: Story = {
  render: function SidebarStory() {
    const [settingsOpen, setSettingsOpen] = React.useState(true)
    const [accountOpen, setAccountOpen] = React.useState(false)
    
    return (
      <div className="space-y-2">
        <Collapsible open={settingsOpen} onOpenChange={setSettingsOpen}>
          <CollapsibleTrigger className="flex w-full items-center justify-between rounded-md p-2 hover:bg-muted">
            <span className="text-sm font-medium">Settings</span>
            <ChevronDownIcon />
          </CollapsibleTrigger>
          <CollapsibleContent className="pl-4 space-y-1">
            <div className="rounded-md p-2 text-sm hover:bg-muted cursor-pointer">General</div>
            <div className="rounded-md p-2 text-sm hover:bg-muted cursor-pointer">Security</div>
            <div className="rounded-md p-2 text-sm hover:bg-muted cursor-pointer">Notifications</div>
          </CollapsibleContent>
        </Collapsible>
        
        <Collapsible open={accountOpen} onOpenChange={setAccountOpen}>
          <CollapsibleTrigger className="flex w-full items-center justify-between rounded-md p-2 hover:bg-muted">
            <span className="text-sm font-medium">Account</span>
            <ChevronDownIcon />
          </CollapsibleTrigger>
          <CollapsibleContent className="pl-4 space-y-1">
            <div className="rounded-md p-2 text-sm hover:bg-muted cursor-pointer">Profile</div>
            <div className="rounded-md p-2 text-sm hover:bg-muted cursor-pointer">Billing</div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    )
  },
}
