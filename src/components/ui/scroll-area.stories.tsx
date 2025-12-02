import type { Meta, StoryObj } from '@storybook/react'
import { ScrollArea, ScrollBar } from './scroll-area'
import { Separator } from './separator'

const meta: Meta<typeof ScrollArea> = {
  title: 'UI/ScrollArea',
  component: ScrollArea,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

const tags = Array.from({ length: 50 }).map((_, i) => `v1.2.${i}-beta`)

export const Vertical: Story = {
  render: () => (
    <ScrollArea className="h-72 w-48 rounded-md border">
      <div className="p-4">
        <h4 className="mb-4 text-sm font-medium leading-none">Tags</h4>
        {tags.map((tag) => (
          <div key={tag}>
            <div className="text-sm">{tag}</div>
            <Separator className="my-2" />
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
}

export const Horizontal: Story = {
  render: () => (
    <ScrollArea className="w-96 whitespace-nowrap rounded-md border">
      <div className="flex w-max space-x-4 p-4">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="w-40 shrink-0 rounded-md border p-4"
          >
            <div className="text-sm font-medium">Card {i + 1}</div>
            <p className="text-xs text-muted-foreground">Description for card {i + 1}</p>
          </div>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  ),
}

export const BothDirections: Story = {
  render: () => (
    <ScrollArea className="h-72 w-72 rounded-md border">
      <div className="p-4" style={{ width: '500px' }}>
        <h4 className="mb-4 text-sm font-medium leading-none">Wide Content</h4>
        {Array.from({ length: 30 }).map((_, i) => (
          <div key={i} className="mb-2 text-sm whitespace-nowrap">
            This is a very long line of text that will require horizontal scrolling to view completely - Item {i + 1}
          </div>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  ),
}

export const ChatMessages: Story = {
  render: () => (
    <div className="w-80 rounded-lg border">
      <div className="border-b p-3">
        <h4 className="font-medium">Messages</h4>
      </div>
      <ScrollArea className="h-64">
        <div className="p-3 space-y-3">
          {Array.from({ length: 15 }).map((_, i) => (
            <div key={i} className={`flex ${i % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
              <div className={`max-w-[80%] rounded-lg p-2 text-sm ${i % 2 === 0 ? 'bg-muted' : 'bg-primary text-primary-foreground'}`}>
                {i % 2 === 0 ? 'Hello! How can I help?' : 'Hi, I have a question.'}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  ),
}
