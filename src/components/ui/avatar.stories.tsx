import type { Meta, StoryObj } from '@storybook/react'
import { Avatar, AvatarImage, AvatarFallback, SimpleAvatar, AvatarGroup } from './avatar'

const meta: Meta<typeof Avatar> = {
  title: 'UI/Avatar',
  component: Avatar,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  ),
}

export const WithFallback: Story = {
  render: () => (
    <Avatar>
      <AvatarImage src="/broken-image.jpg" alt="John Doe" />
      <AvatarFallback>JD</AvatarFallback>
    </Avatar>
  ),
}

export const Simple: Story = {
  render: () => (
    <SimpleAvatar
      src="https://github.com/shadcn.png"
      alt="Shadcn"
    />
  ),
}

export const SimpleFallback: Story = {
  render: () => (
    <SimpleAvatar alt="John Doe" />
  ),
}

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <SimpleAvatar size="xs" alt="XS" />
      <SimpleAvatar size="sm" alt="SM" />
      <SimpleAvatar size="default" alt="MD" />
      <SimpleAvatar size="lg" alt="LG" />
      <SimpleAvatar size="xl" alt="XL" />
    </div>
  ),
}

export const AllSizesWithImage: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <SimpleAvatar size="xs" src="https://github.com/shadcn.png" alt="User" />
      <SimpleAvatar size="sm" src="https://github.com/shadcn.png" alt="User" />
      <SimpleAvatar size="default" src="https://github.com/shadcn.png" alt="User" />
      <SimpleAvatar size="lg" src="https://github.com/shadcn.png" alt="User" />
      <SimpleAvatar size="xl" src="https://github.com/shadcn.png" alt="User" />
    </div>
  ),
}

export const Group: Story = {
  render: () => (
    <AvatarGroup>
      <SimpleAvatar src="https://github.com/shadcn.png" alt="User 1" />
      <SimpleAvatar src="https://github.com/vercel.png" alt="User 2" />
      <SimpleAvatar alt="User 3" />
      <SimpleAvatar alt="User 4" />
    </AvatarGroup>
  ),
}

export const GroupWithMax: Story = {
  render: () => (
    <AvatarGroup max={3}>
      <SimpleAvatar src="https://github.com/shadcn.png" alt="User 1" />
      <SimpleAvatar src="https://github.com/vercel.png" alt="User 2" />
      <SimpleAvatar alt="User 3" />
      <SimpleAvatar alt="User 4" />
      <SimpleAvatar alt="User 5" />
      <SimpleAvatar alt="User 6" />
    </AvatarGroup>
  ),
}

export const UserProfile: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <SimpleAvatar
        size="lg"
        src="https://github.com/shadcn.png"
        alt="Shadcn"
      />
      <div>
        <p className="font-medium">Shadcn</p>
        <p className="text-sm text-muted-foreground">@shadcn</p>
      </div>
    </div>
  ),
}
