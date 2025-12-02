import type { Meta, StoryObj } from '@storybook/react'
import { Skeleton, SkeletonText, SkeletonCard, SkeletonAvatar, SkeletonButton, SkeletonInput, SkeletonTableRow } from './skeleton'

const meta: Meta<typeof Skeleton> = {
  title: 'UI/Skeleton',
  component: Skeleton,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['default', 'circular', 'text'] },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { className: 'h-12 w-48' },
}

export const Circular: Story = {
  args: { variant: 'circular', className: 'h-12 w-12' },
}

export const Text: Story = {
  args: { variant: 'text', className: 'w-48' },
}

export const TextBlock: Story = {
  render: () => <SkeletonText lines={4} className="w-64" />,
}

export const CardSkeleton: Story = {
  render: () => <SkeletonCard className="w-64" />,
}

export const AvatarSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <SkeletonAvatar size="sm" />
      <SkeletonAvatar size="default" />
      <SkeletonAvatar size="lg" />
    </div>
  ),
}

export const ButtonSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <SkeletonButton size="sm" />
      <SkeletonButton size="default" />
      <SkeletonButton size="lg" />
    </div>
  ),
}

export const FormSkeleton: Story = {
  render: () => (
    <div className="w-64 space-y-4">
      <div className="space-y-2">
        <Skeleton className="h-4 w-16" />
        <SkeletonInput />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-20" />
        <SkeletonInput />
      </div>
      <SkeletonButton />
    </div>
  ),
}

export const TableSkeleton: Story = {
  render: () => (
    <div className="w-96 space-y-1">
      <SkeletonTableRow columns={4} />
      <SkeletonTableRow columns={4} />
      <SkeletonTableRow columns={4} />
      <SkeletonTableRow columns={4} />
    </div>
  ),
}

export const ProfileSkeleton: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <SkeletonAvatar size="lg" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-3 w-24" />
      </div>
    </div>
  ),
}

export const ListItemSkeleton: Story = {
  render: () => (
    <div className="w-64 space-y-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex items-center gap-3">
          <SkeletonAvatar size="sm" />
          <div className="flex-1 space-y-1">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        </div>
      ))}
    </div>
  ),
}
