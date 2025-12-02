import type { Meta, StoryObj } from "@storybook/react"
import * as React from "react"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "./dialog"
import { Button } from "./button"
import { Input } from "./input"
import { Label } from "./label"

const meta: Meta<typeof Dialog> = {
  title: "UI/Dialog",
  component: Dialog,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof Dialog>

/**
 * Default Dialog with spring physics animations.
 * Motion-powered with smooth zoom animation.
 */
export const Default: Story = {
  render: function DefaultDialog() {
    const [open, setOpen] = React.useState(false)
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">Open Dialog</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Motion-Powered Dialog</DialogTitle>
            <DialogDescription>
              This dialog uses spring physics for smooth, natural animations via motion/react.
              Watch the subtle bounce effect!
            </DialogDescription>
          </DialogHeader>
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
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  },
}

/**
 * Uncontrolled Dialog - still works, but without exit animation.
 * For full exit animation, use controlled mode with open/onOpenChange.
 */
export const Uncontrolled: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Open (Uncontrolled)</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
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
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
}

export const Simple: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>View Details</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Item Details</DialogTitle>
          <DialogDescription>
            Here are the details for the selected item.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <p className="text-sm text-muted-foreground">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  ),
}

export const WithForm: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Create Account</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create account</DialogTitle>
          <DialogDescription>
            Enter your details below to create a new account.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="m@example.com" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="confirm">Confirm Password</Label>
            <Input id="confirm" type="password" />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit">Create</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
}

export const Destructive: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">Delete Account</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button variant="destructive">Delete Account</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
}

export const LongContent: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Terms of Service</Button>
      </DialogTrigger>
      <DialogContent className="max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Terms of Service</DialogTitle>
          <DialogDescription>
            Please read our terms of service carefully.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 space-y-4">
          <p className="text-sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
          <p className="text-sm">
            Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
            cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum.
          </p>
          <p className="text-sm">
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
            quae ab illo inventore veritatis et quasi architecto beatae vitae
            dicta sunt explicabo.
          </p>
          <p className="text-sm">
            Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit
            aut fugit, sed quia consequuntur magni dolores eos qui ratione
            voluptatem sequi nesciunt.
          </p>
          <p className="text-sm">
            Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet,
            consectetur, adipisci velit, sed quia non numquam eius modi tempora
            incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
          </p>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Decline</Button>
          </DialogClose>
          <Button>Accept</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
}

export const CustomWidth: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Wide Dialog</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Dashboard Settings</DialogTitle>
          <DialogDescription>
            Configure your dashboard preferences.
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4 py-4">
          <div className="space-y-2">
            <Label>Display Name</Label>
            <Input placeholder="Your name" />
          </div>
          <div className="space-y-2">
            <Label>Email</Label>
            <Input type="email" placeholder="your@email.com" />
          </div>
          <div className="space-y-2">
            <Label>Company</Label>
            <Input placeholder="Company name" />
          </div>
          <div className="space-y-2">
            <Label>Role</Label>
            <Input placeholder="Your role" />
          </div>
        </div>
        <DialogFooter>
          <Button>Save Settings</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
}

/* -------------------------------------------------------------------------------------------------
 * Animation Variants
 * -----------------------------------------------------------------------------------------------*/

/**
 * Slide up animation - great for mobile-style dialogs
 */
export const SlideUp: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Slide Up</Button>
      </DialogTrigger>
      <DialogContent animation="slide-up">
        <DialogHeader>
          <DialogTitle>Slide Up Animation</DialogTitle>
          <DialogDescription>
            This dialog slides up from the bottom - perfect for mobile-style interactions.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button>Got it</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
}

/**
 * Slide down animation - great for dropdown-style dialogs
 */
export const SlideDown: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Slide Down</Button>
      </DialogTrigger>
      <DialogContent animation="slide-down">
        <DialogHeader>
          <DialogTitle>Slide Down Animation</DialogTitle>
          <DialogDescription>
            This dialog slides down from the top - useful for notifications or alerts.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button>Dismiss</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
}

/**
 * Slide left animation - enters from right
 */
export const SlideLeft: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Slide Left</Button>
      </DialogTrigger>
      <DialogContent animation="slide-left">
        <DialogHeader>
          <DialogTitle>Slide Left Animation</DialogTitle>
          <DialogDescription>
            This dialog slides in from the right side.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button>Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
}

/**
 * Slide right animation - enters from left
 */
export const SlideRight: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Slide Right</Button>
      </DialogTrigger>
      <DialogContent animation="slide-right">
        <DialogHeader>
          <DialogTitle>Slide Right Animation</DialogTitle>
          <DialogDescription>
            This dialog slides in from the left side.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button>Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
}

/**
 * Fade only animation - subtle and elegant
 */
export const FadeOnly: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Fade</Button>
      </DialogTrigger>
      <DialogContent animation="fade">
        <DialogHeader>
          <DialogTitle>Fade Animation</DialogTitle>
          <DialogDescription>
            This dialog uses a simple fade animation - minimal and elegant.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button>Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
}

/**
 * Custom enter/exit animations - mix and match!
 */
export const CustomEnterExit: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Custom (Slide Up → Fade Out)</Button>
      </DialogTrigger>
      <DialogContent animation="slide-up" exitAnimation="fade">
        <DialogHeader>
          <DialogTitle>Custom Enter/Exit</DialogTitle>
          <DialogDescription>
            This dialog slides up when opening, but fades out when closing.
            Mix and match animations for unique effects!
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button>Close me</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
}

/**
 * Controlled slide-up with proper exit animation
 */
export const MotionSlideUp: Story = {
  render: function MotionSlideUpDialog() {
    const [open, setOpen] = React.useState(false)
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>Motion Slide Up</Button>
        </DialogTrigger>
        <DialogContent animation="slide-up">
          <DialogHeader>
            <DialogTitle>Motion + Slide Up</DialogTitle>
            <DialogDescription>
              Spring physics combined with slide-up animation.
              Notice the smooth, natural feel!
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => setOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  },
}

/**
 * All animation variants in a gallery - using controlled dialogs for proper exit animations
 */
export const AnimationGallery: Story = {
  render: function AnimationGalleryDemo() {
    const [openDialog, setOpenDialog] = React.useState<string | null>(null)
    
    const animations = [
      { name: "zoom", label: "Zoom (Default)" },
      { name: "fade", label: "Fade" },
      { name: "slide-up", label: "Slide Up" },
      { name: "slide-down", label: "Slide Down" },
      { name: "slide-left", label: "Slide Left" },
      { name: "slide-right", label: "Slide Right" },
    ] as const

    return (
      <div className="flex flex-wrap gap-4">
        {animations.map(({ name, label }) => (
          <Dialog 
            key={name} 
            open={openDialog === name} 
            onOpenChange={(open) => setOpenDialog(open ? name : null)}
          >
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">{label}</Button>
            </DialogTrigger>
            <DialogContent animation={name}>
              <DialogHeader>
                <DialogTitle>{label}</DialogTitle>
                <DialogDescription>
                  This dialog uses the "{name}" animation with spring physics.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button onClick={() => setOpenDialog(null)}>Close</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    )
  },
}

