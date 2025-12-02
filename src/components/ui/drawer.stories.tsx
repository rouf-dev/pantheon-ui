import type { Meta, StoryObj } from '@storybook/react'
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
  DrawerClose,
} from './drawer'
import { Button } from './button'
import { Input } from './input'

const meta: Meta = {
  title: 'UI/Drawer',
  component: Drawer,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">Open Drawer</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Edit Profile</DrawerTitle>
          <DrawerDescription>Make changes to your profile here.</DrawerDescription>
        </DrawerHeader>
        <div className="p-4">
          <Input label="Name" defaultValue="John Doe" />
        </div>
        <DrawerFooter>
          <Button>Save changes</Button>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
}

export const WithForm: Story = {
  render: () => (
    <Drawer>
      <DrawerTrigger asChild>
        <Button>Add New Item</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Create New Item</DrawerTitle>
          <DrawerDescription>Fill in the details below.</DrawerDescription>
        </DrawerHeader>
        <div className="p-4 space-y-4">
          <Input label="Title" placeholder="Enter title" />
          <Input label="Description" placeholder="Enter description" />
          <Input label="Category" placeholder="Select category" />
        </div>
        <DrawerFooter>
          <Button>Create</Button>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
}

export const Confirmation: Story = {
  render: () => (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="destructive">Delete Account</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Are you sure?</DrawerTitle>
          <DrawerDescription>
            This action cannot be undone. This will permanently delete your account
            and remove all your data from our servers.
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <Button variant="destructive">Yes, delete my account</Button>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
}
