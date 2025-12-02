import type { Meta, StoryObj } from "@storybook/react"
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from "./sheet"
import { Button } from "./button"
import { Input } from "./input"
import { Label } from "./label"

const meta: Meta<typeof Sheet> = {
  title: "UI/Sheet",
  component: Sheet,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof Sheet>

export const Right: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open Sheet</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" defaultValue="John Doe" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input id="username" defaultValue="@johndoe" className="col-span-3" />
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
}

export const Left: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open Left Sheet</Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Navigation</SheetTitle>
          <SheetDescription>Browse through the menu options.</SheetDescription>
        </SheetHeader>
        <nav className="flex flex-col gap-2 py-4">
          <a href="#" className="rounded-md px-3 py-2 hover:bg-accent">
            Home
          </a>
          <a href="#" className="rounded-md px-3 py-2 hover:bg-accent">
            Profile
          </a>
          <a href="#" className="rounded-md px-3 py-2 hover:bg-accent">
            Settings
          </a>
          <a href="#" className="rounded-md px-3 py-2 hover:bg-accent">
            Logout
          </a>
        </nav>
      </SheetContent>
    </Sheet>
  ),
}

export const Top: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open Top Sheet</Button>
      </SheetTrigger>
      <SheetContent side="top">
        <SheetHeader>
          <SheetTitle>Notification Settings</SheetTitle>
          <SheetDescription>Configure how you receive notifications.</SheetDescription>
        </SheetHeader>
        <div className="py-4">
          <p>Top sheet content goes here.</p>
        </div>
      </SheetContent>
    </Sheet>
  ),
}

export const Bottom: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open Bottom Sheet</Button>
      </SheetTrigger>
      <SheetContent side="bottom">
        <SheetHeader>
          <SheetTitle>Quick Actions</SheetTitle>
          <SheetDescription>Select an action to perform.</SheetDescription>
        </SheetHeader>
        <div className="flex gap-2 py-4">
          <Button variant="outline" className="flex-1">
            Share
          </Button>
          <Button variant="outline" className="flex-1">
            Copy
          </Button>
          <Button variant="outline" className="flex-1">
            Edit
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  ),
}
