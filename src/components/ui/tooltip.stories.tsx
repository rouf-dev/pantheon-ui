import type { Meta, StoryObj } from '@storybook/react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, SimpleTooltip } from './tooltip'
import { Button } from './button'

const meta: Meta<typeof SimpleTooltip> = {
  title: 'UI/Tooltip',
  component: SimpleTooltip,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <SimpleTooltip content="This is a tooltip">
      <Button variant="outline">Hover me</Button>
    </SimpleTooltip>
  ),
}

export const Positions: Story = {
  render: () => (
    <div className="flex gap-4">
      <SimpleTooltip content="Top tooltip" side="top">
        <Button variant="outline">Top</Button>
      </SimpleTooltip>
      <SimpleTooltip content="Right tooltip" side="right">
        <Button variant="outline">Right</Button>
      </SimpleTooltip>
      <SimpleTooltip content="Bottom tooltip" side="bottom">
        <Button variant="outline">Bottom</Button>
      </SimpleTooltip>
      <SimpleTooltip content="Left tooltip" side="left">
        <Button variant="outline">Left</Button>
      </SimpleTooltip>
    </div>
  ),
}

export const WithDelay: Story = {
  render: () => (
    <SimpleTooltip content="Appears after 500ms" delayDuration={500}>
      <Button variant="outline">Long delay</Button>
    </SimpleTooltip>
  ),
}

export const InstantTooltip: Story = {
  render: () => (
    <SimpleTooltip content="No delay!" delayDuration={0}>
      <Button variant="outline">Instant</Button>
    </SimpleTooltip>
  ),
}

export const ComposedTooltip: Story = {
  render: () => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Composed API</Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Use this for more control</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),
}

export const OnIcon: Story = {
  render: () => (
    <SimpleTooltip content="More information">
      <button className="inline-flex h-8 w-8 items-center justify-center rounded-full border hover:bg-muted">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" />
        </svg>
      </button>
    </SimpleTooltip>
  ),
}
