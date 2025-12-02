import type { Meta, StoryObj } from "@storybook/react"
import * as React from "react"
import {
  SplitDialog,
  SplitDialogTrigger,
  SplitDialogContent,
  SplitDialogPanel,
  SplitDialogTriggerSecondary,
  SplitDialogHeader,
  SplitDialogFooter,
  SplitDialogTitle,
  SplitDialogDescription,
  SplitDialogClose,
} from "./split-dialog"
import { Button } from "./button"
import { Input } from "./input"
import { Label } from "./label"

const meta: Meta<typeof SplitDialog> = {
  title: "UI/SplitDialog",
  component: SplitDialog,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof SplitDialog>

/**
 * Default SplitDialog - starts as single panel, can expand to split view
 */
export const Default: Story = {
  render: function DefaultDemo() {
    const [open, setOpen] = React.useState(false)
    return (
      <SplitDialog open={open} onOpenChange={setOpen} split="50/50">
        <SplitDialogTrigger asChild>
          <Button>Open Split Dialog</Button>
        </SplitDialogTrigger>
        <SplitDialogContent>
          <SplitDialogPanel type="primary">
            <SplitDialogHeader>
              <SplitDialogTitle>Main Panel</SplitDialogTitle>
              <SplitDialogDescription>
                This is the primary panel. Click the button below to reveal the secondary panel.
              </SplitDialogDescription>
            </SplitDialogHeader>
            <div className="py-4">
              <p className="text-sm text-muted-foreground">
                The dialog will smoothly expand to show both panels side by side.
              </p>
            </div>
            <SplitDialogFooter>
              <SplitDialogTriggerSecondary asChild>
                <Button variant="outline">Show Details →</Button>
              </SplitDialogTriggerSecondary>
              <SplitDialogClose asChild>
                <Button>Done</Button>
              </SplitDialogClose>
            </SplitDialogFooter>
          </SplitDialogPanel>
          
          <SplitDialogPanel type="secondary">
            <SplitDialogHeader>
              <SplitDialogTitle>Details Panel</SplitDialogTitle>
              <SplitDialogDescription>
                Additional information appears here.
              </SplitDialogDescription>
            </SplitDialogHeader>
            <div className="py-4 flex-1">
              <p className="text-sm">
                Press ESC to close this panel first, then ESC again to close the dialog.
              </p>
            </div>
          </SplitDialogPanel>
        </SplitDialogContent>
      </SplitDialog>
    )
  },
}

/**
 * Master-Detail pattern - common for list/detail views
 */
export const MasterDetail: Story = {
  render: function MasterDetailDemo() {
    const [open, setOpen] = React.useState(false)
    const [selectedItem, setSelectedItem] = React.useState<string | null>(null)
    
    const items = [
      { id: "1", name: "Project Alpha", status: "Active" },
      { id: "2", name: "Project Beta", status: "Pending" },
      { id: "3", name: "Project Gamma", status: "Completed" },
    ]

    return (
      <SplitDialog open={open} onOpenChange={setOpen} split="40/60">
        <SplitDialogTrigger asChild>
          <Button>Open Projects</Button>
        </SplitDialogTrigger>
        <SplitDialogContent splitMaxWidth="max-w-5xl">
          <SplitDialogPanel type="primary" className="min-h-[400px]">
            <SplitDialogHeader>
              <SplitDialogTitle>Projects</SplitDialogTitle>
              <SplitDialogDescription>
                Select a project to view details
              </SplitDialogDescription>
            </SplitDialogHeader>
            <div className="py-4 space-y-2">
              {items.map((item) => (
                <SplitDialogTriggerSecondary key={item.id} asChild>
                  <button
                    className={`w-full p-3 text-left rounded-lg border transition-colors ${
                      selectedItem === item.id 
                        ? "border-primary bg-primary/5" 
                        : "hover:bg-muted"
                    }`}
                    onClick={() => setSelectedItem(item.id)}
                  >
                    <div className="font-medium">{item.name}</div>
                    <div className="text-sm text-muted-foreground">{item.status}</div>
                  </button>
                </SplitDialogTriggerSecondary>
              ))}
            </div>
          </SplitDialogPanel>
          
          <SplitDialogPanel type="secondary" animation="slide-left" className="min-h-[400px]">
            <SplitDialogHeader>
              <SplitDialogTitle>
                {items.find(i => i.id === selectedItem)?.name ?? "Details"}
              </SplitDialogTitle>
              <SplitDialogDescription>
                Project information and settings
              </SplitDialogDescription>
            </SplitDialogHeader>
            <div className="py-4 flex-1 space-y-4">
              <div className="space-y-2">
                <Label>Project Name</Label>
                <Input defaultValue={items.find(i => i.id === selectedItem)?.name} />
              </div>
              <div className="space-y-2">
                <Label>Status</Label>
                <Input defaultValue={items.find(i => i.id === selectedItem)?.status} />
              </div>
            </div>
            <SplitDialogFooter>
              <Button>Save Changes</Button>
            </SplitDialogFooter>
          </SplitDialogPanel>
        </SplitDialogContent>
      </SplitDialog>
    )
  },
}

/**
 * Settings with Preview - edit on left, preview on right
 */
export const SettingsWithPreview: Story = {
  render: function SettingsDemo() {
    const [open, setOpen] = React.useState(false)
    const [title, setTitle] = React.useState("My Awesome Project")
    const [description, setDescription] = React.useState("A brief description of the project")

    return (
      <SplitDialog open={open} onOpenChange={setOpen} split="50/50">
        <SplitDialogTrigger asChild>
          <Button variant="outline">Edit Card Settings</Button>
        </SplitDialogTrigger>
        <SplitDialogContent splitMaxWidth="max-w-4xl">
          <SplitDialogPanel type="primary">
            <SplitDialogHeader>
              <SplitDialogTitle>Card Settings</SplitDialogTitle>
              <SplitDialogDescription>
                Customize your card appearance
              </SplitDialogDescription>
            </SplitDialogHeader>
            <div className="py-4 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input 
                  id="title" 
                  value={title} 
                  onChange={(e) => setTitle(e.target.value)} 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="desc">Description</Label>
                <Input 
                  id="desc" 
                  value={description} 
                  onChange={(e) => setDescription(e.target.value)} 
                />
              </div>
            </div>
            <SplitDialogFooter>
              <SplitDialogTriggerSecondary asChild>
                <Button variant="outline">Preview →</Button>
              </SplitDialogTriggerSecondary>
              <Button>Save</Button>
            </SplitDialogFooter>
          </SplitDialogPanel>
          
          <SplitDialogPanel type="secondary" animation="slide-left">
            <SplitDialogHeader>
              <SplitDialogTitle>Preview</SplitDialogTitle>
              <SplitDialogDescription>
                Live preview of your changes
              </SplitDialogDescription>
            </SplitDialogHeader>
            <div className="py-4 flex-1 flex items-center justify-center">
              <div className="w-full max-w-xs p-6 rounded-lg border bg-card shadow-sm">
                <h3 className="font-semibold text-lg">{title || "Untitled"}</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  {description || "No description"}
                </p>
              </div>
            </div>
          </SplitDialogPanel>
        </SplitDialogContent>
      </SplitDialog>
    )
  },
}

/**
 * Different split ratios
 */
export const SplitRatios: Story = {
  render: function SplitRatiosDemo() {
    const ratios = ["50/50", "40/60", "60/40", "33/67", "67/33", "30/70", "70/30"] as const
    const [selectedRatio, setSelectedRatio] = React.useState<typeof ratios[number]>("50/50")
    const [open, setOpen] = React.useState(false)

    return (
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {ratios.map((ratio) => (
            <Button
              key={ratio}
              variant={selectedRatio === ratio ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedRatio(ratio)}
            >
              {ratio}
            </Button>
          ))}
        </div>
        
        <SplitDialog open={open} onOpenChange={setOpen} split={selectedRatio}>
          <SplitDialogTrigger asChild>
            <Button>Open with {selectedRatio} split</Button>
          </SplitDialogTrigger>
          <SplitDialogContent splitMaxWidth="max-w-5xl">
            <SplitDialogPanel type="primary" className="min-h-[300px]">
              <SplitDialogHeader>
                <SplitDialogTitle>Primary Panel</SplitDialogTitle>
                <SplitDialogDescription>
                  This panel takes {selectedRatio.split("/")[0]}% of the width
                </SplitDialogDescription>
              </SplitDialogHeader>
              <div className="py-4 flex-1 flex items-center justify-center bg-muted/30 rounded-lg">
                <span className="text-4xl font-bold text-muted-foreground">
                  {selectedRatio.split("/")[0]}%
                </span>
              </div>
              <SplitDialogFooter>
                <SplitDialogTriggerSecondary asChild>
                  <Button variant="outline">Show Secondary</Button>
                </SplitDialogTriggerSecondary>
              </SplitDialogFooter>
            </SplitDialogPanel>
            
            <SplitDialogPanel type="secondary" className="min-h-[300px]">
              <SplitDialogHeader>
                <SplitDialogTitle>Secondary Panel</SplitDialogTitle>
                <SplitDialogDescription>
                  This panel takes {selectedRatio.split("/")[1]}% of the width
                </SplitDialogDescription>
              </SplitDialogHeader>
              <div className="py-4 flex-1 flex items-center justify-center bg-muted/30 rounded-lg">
                <span className="text-4xl font-bold text-muted-foreground">
                  {selectedRatio.split("/")[1]}%
                </span>
              </div>
            </SplitDialogPanel>
          </SplitDialogContent>
        </SplitDialog>
      </div>
    )
  },
}

/**
 * Confirmation flow - action on left, confirmation on right
 */
export const ConfirmationFlow: Story = {
  render: function ConfirmationDemo() {
    const [open, setOpen] = React.useState(false)

    return (
      <SplitDialog open={open} onOpenChange={setOpen} split="50/50">
        <SplitDialogTrigger asChild>
          <Button variant="destructive">Delete Account</Button>
        </SplitDialogTrigger>
        <SplitDialogContent>
          <SplitDialogPanel type="primary">
            <SplitDialogHeader>
              <SplitDialogTitle>Delete Account</SplitDialogTitle>
              <SplitDialogDescription>
                This action cannot be undone.
              </SplitDialogDescription>
            </SplitDialogHeader>
            <div className="py-4">
              <p className="text-sm text-muted-foreground">
                All your data, projects, and settings will be permanently deleted.
                Please review what will be removed before confirming.
              </p>
            </div>
            <SplitDialogFooter>
              <SplitDialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </SplitDialogClose>
              <SplitDialogTriggerSecondary asChild>
                <Button variant="destructive">Review & Delete</Button>
              </SplitDialogTriggerSecondary>
            </SplitDialogFooter>
          </SplitDialogPanel>
          
          <SplitDialogPanel type="secondary" animation="slide-left">
            <SplitDialogHeader>
              <SplitDialogTitle className="text-destructive">Final Confirmation</SplitDialogTitle>
              <SplitDialogDescription>
                Type "DELETE" to confirm
              </SplitDialogDescription>
            </SplitDialogHeader>
            <div className="py-4 space-y-4">
              <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                <p className="text-sm font-medium text-destructive">
                  ⚠️ This will delete:
                </p>
                <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                  <li>• 12 projects</li>
                  <li>• 847 files</li>
                  <li>• All API keys</li>
                  <li>• Payment history</li>
                </ul>
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm">Type DELETE to confirm</Label>
                <Input id="confirm" placeholder="DELETE" />
              </div>
            </div>
            <SplitDialogFooter>
              <Button variant="destructive" className="w-full">
                Permanently Delete Account
              </Button>
            </SplitDialogFooter>
          </SplitDialogPanel>
        </SplitDialogContent>
      </SplitDialog>
    )
  },
}
