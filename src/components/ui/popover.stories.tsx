import type { Meta, StoryObj } from '@storybook/react'
import { Popover, PopoverTrigger, PopoverContent } from './popover'
import { Button } from './button'
import { Input } from './input'

const meta: Meta = {
  title: 'UI/Popover',
  component: Popover,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Open popover</Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Dimensions</h4>
            <p className="text-sm text-muted-foreground">Set the dimensions for the layer.</p>
          </div>
          <div className="grid gap-2">
            <Input label="Width" defaultValue="100%" />
            <Input label="Height" defaultValue="auto" />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  ),
}

export const Positions: Story = {
  render: () => (
    <div className="flex gap-4">
      <Popover>
        <PopoverTrigger asChild><Button variant="outline">Top</Button></PopoverTrigger>
        <PopoverContent side="top"><p className="text-sm">Popover on top</p></PopoverContent>
      </Popover>
      <Popover>
        <PopoverTrigger asChild><Button variant="outline">Right</Button></PopoverTrigger>
        <PopoverContent side="right"><p className="text-sm">Popover on right</p></PopoverContent>
      </Popover>
      <Popover>
        <PopoverTrigger asChild><Button variant="outline">Bottom</Button></PopoverTrigger>
        <PopoverContent side="bottom"><p className="text-sm">Popover on bottom</p></PopoverContent>
      </Popover>
      <Popover>
        <PopoverTrigger asChild><Button variant="outline">Left</Button></PopoverTrigger>
        <PopoverContent side="left"><p className="text-sm">Popover on left</p></PopoverContent>
      </Popover>
    </div>
  ),
}

export const UserCard: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 rounded-full p-0">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">JD</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64">
        <div className="flex gap-4">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm text-primary-foreground">JD</span>
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">John Doe</h4>
            <p className="text-sm text-muted-foreground">john@example.com</p>
          </div>
        </div>
        <div className="mt-4 flex gap-2">
          <Button size="sm" variant="outline" className="flex-1">Profile</Button>
          <Button size="sm" variant="outline" className="flex-1">Sign out</Button>
        </div>
      </PopoverContent>
    </Popover>
  ),
}
