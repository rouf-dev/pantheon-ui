import type { Meta, StoryObj } from "@storybook/react"
import * as React from "react"
import {
  CompanionDialog,
  CompanionDialogTrigger,
  CompanionDialogContent,
  CompanionDialogCompanion,
  CompanionDialogTriggerCompanion,
  CompanionDialogHeader,
  CompanionDialogFooter,
  CompanionDialogTitle,
  CompanionDialogDescription,
  CompanionDialogClose,
} from "./companion-dialog"
import { Button } from "./button"
import { Input } from "./input"
import { Label } from "./label"

const meta: Meta<typeof CompanionDialog> = {
  title: "UI/CompanionDialog",
  component: CompanionDialog,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof CompanionDialog>

/**
 * Default: Primary dialog on right, companion slides in from left (SEPARATED)
 */
export const Default: Story = {
  render: function DefaultDemo() {
    const [open, setOpen] = React.useState(false)
    return (
      <CompanionDialog open={open} onOpenChange={setOpen} position="right" gap={24}>
        <CompanionDialogTrigger asChild>
          <Button>Open Dialog</Button>
        </CompanionDialogTrigger>
        
        <CompanionDialogContent width="w-[400px]">
          <CompanionDialogHeader>
            <CompanionDialogTitle>Main Dialog</CompanionDialogTitle>
            <CompanionDialogDescription>
              This dialog is positioned on the right side of the screen.
            </CompanionDialogDescription>
          </CompanionDialogHeader>
          <div className="py-4">
            <p className="text-sm text-muted-foreground">
              Click the button below to open a companion dialog that appears as a separate panel to the left.
            </p>
          </div>
          <CompanionDialogFooter>
            <CompanionDialogTriggerCompanion asChild>
              <Button variant="outline">← Open Companion</Button>
            </CompanionDialogTriggerCompanion>
            <CompanionDialogClose asChild>
              <Button>Done</Button>
            </CompanionDialogClose>
          </CompanionDialogFooter>
        </CompanionDialogContent>

        <CompanionDialogCompanion width="w-[400px]" animation="slide-right">
          <CompanionDialogHeader>
            <CompanionDialogTitle>Companion Dialog</CompanionDialogTitle>
            <CompanionDialogDescription>
              A separate dialog that appears alongside the main one.
            </CompanionDialogDescription>
          </CompanionDialogHeader>
          <div className="py-4 flex-1">
            <p className="text-sm text-muted-foreground">
              This is a completely separate dialog panel. Press ESC to close this first, then ESC again to close the main dialog.
            </p>
          </div>
        </CompanionDialogCompanion>
      </CompanionDialog>
    )
  },
}

/**
 * Primary on Left - companion appears on right
 */
export const PrimaryOnLeft: Story = {
  render: function PrimaryLeftDemo() {
    const [open, setOpen] = React.useState(false)
    return (
      <CompanionDialog open={open} onOpenChange={setOpen} position="left" gap={24}>
        <CompanionDialogTrigger asChild>
          <Button>Open Dialog (Left)</Button>
        </CompanionDialogTrigger>
        
        <CompanionDialogContent width="w-[400px]">
          <CompanionDialogHeader>
            <CompanionDialogTitle>Main Dialog</CompanionDialogTitle>
            <CompanionDialogDescription>
              Positioned on the left side of the screen.
            </CompanionDialogDescription>
          </CompanionDialogHeader>
          <div className="py-4">
            <p className="text-sm text-muted-foreground">
              The companion will appear to the right of this dialog.
            </p>
          </div>
          <CompanionDialogFooter>
            <CompanionDialogTriggerCompanion asChild>
              <Button variant="outline">Open Companion →</Button>
            </CompanionDialogTriggerCompanion>
          </CompanionDialogFooter>
        </CompanionDialogContent>

        <CompanionDialogCompanion width="w-[400px]" animation="slide-left">
          <CompanionDialogHeader>
            <CompanionDialogTitle>Companion</CompanionDialogTitle>
            <CompanionDialogDescription>
              Appears on the right side.
            </CompanionDialogDescription>
          </CompanionDialogHeader>
          <div className="py-4">
            <p className="text-sm">Content for the companion dialog.</p>
          </div>
        </CompanionDialogCompanion>
      </CompanionDialog>
    )
  },
}

/**
 * Master-Detail Pattern - select item on right, details on left
 */
export const MasterDetail: Story = {
  render: function MasterDetailDemo() {
    const [open, setOpen] = React.useState(false)
    const [selectedItem, setSelectedItem] = React.useState<string | null>(null)
    
    const items = [
      { id: "1", name: "Document A", type: "PDF", size: "2.4 MB" },
      { id: "2", name: "Image B", type: "PNG", size: "1.2 MB" },
      { id: "3", name: "Spreadsheet C", type: "XLSX", size: "856 KB" },
    ]

    return (
      <CompanionDialog open={open} onOpenChange={setOpen} position="right" gap={24}>
        <CompanionDialogTrigger asChild>
          <Button>Browse Files</Button>
        </CompanionDialogTrigger>
        
        <CompanionDialogContent width="w-[350px]">
          <CompanionDialogHeader>
            <CompanionDialogTitle>Files</CompanionDialogTitle>
            <CompanionDialogDescription>
              Select a file to view details
            </CompanionDialogDescription>
          </CompanionDialogHeader>
          <div className="py-4 space-y-2">
            {items.map((item) => (
              <CompanionDialogTriggerCompanion key={item.id} asChild>
                <button
                  className={`w-full p-3 text-left rounded-lg border transition-colors ${
                    selectedItem === item.id 
                      ? "border-primary bg-primary/5" 
                      : "hover:bg-muted"
                  }`}
                  onClick={() => setSelectedItem(item.id)}
                >
                  <div className="font-medium">{item.name}</div>
                  <div className="text-xs text-muted-foreground">{item.type} • {item.size}</div>
                </button>
              </CompanionDialogTriggerCompanion>
            ))}
          </div>
          <CompanionDialogFooter>
            <CompanionDialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </CompanionDialogClose>
            <Button>Upload New</Button>
          </CompanionDialogFooter>
        </CompanionDialogContent>

        <CompanionDialogCompanion width="w-[400px]" animation="slide-right">
          <CompanionDialogHeader>
            <CompanionDialogTitle>
              {items.find(i => i.id === selectedItem)?.name ?? "File Details"}
            </CompanionDialogTitle>
            <CompanionDialogDescription>
              File information and actions
            </CompanionDialogDescription>
          </CompanionDialogHeader>
          {selectedItem && (
            <div className="py-4 space-y-4 flex-1">
              <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                <span className="text-4xl text-muted-foreground">
                  {items.find(i => i.id === selectedItem)?.type}
                </span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Type</span>
                  <span>{items.find(i => i.id === selectedItem)?.type}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Size</span>
                  <span>{items.find(i => i.id === selectedItem)?.size}</span>
                </div>
              </div>
            </div>
          )}
          <CompanionDialogFooter>
            <Button variant="outline">Download</Button>
            <Button>Open</Button>
          </CompanionDialogFooter>
        </CompanionDialogCompanion>
      </CompanionDialog>
    )
  },
}

/**
 * Settings with Live Preview
 */
export const SettingsPreview: Story = {
  render: function SettingsDemo() {
    const [open, setOpen] = React.useState(false)
    const [name, setName] = React.useState("My Project")
    const [color, setColor] = React.useState("#00b3f2")

    return (
      <CompanionDialog open={open} onOpenChange={setOpen} position="right" gap={24}>
        <CompanionDialogTrigger asChild>
          <Button variant="outline">Edit Settings</Button>
        </CompanionDialogTrigger>
        
        <CompanionDialogContent width="w-[380px]">
          <CompanionDialogHeader>
            <CompanionDialogTitle>Project Settings</CompanionDialogTitle>
            <CompanionDialogDescription>
              Configure your project appearance
            </CompanionDialogDescription>
          </CompanionDialogHeader>
          <div className="py-4 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Project Name</Label>
              <Input 
                id="name" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="color">Brand Color</Label>
              <div className="flex gap-2">
                <Input 
                  id="color" 
                  value={color} 
                  onChange={(e) => setColor(e.target.value)}
                  className="flex-1"
                />
                <input 
                  type="color" 
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="w-10 h-10 rounded border cursor-pointer"
                />
              </div>
            </div>
          </div>
          <CompanionDialogFooter>
            <CompanionDialogTriggerCompanion asChild>
              <Button variant="outline">← Preview</Button>
            </CompanionDialogTriggerCompanion>
            <Button>Save</Button>
          </CompanionDialogFooter>
        </CompanionDialogContent>

        <CompanionDialogCompanion width="w-[350px]" animation="slide-right">
          <CompanionDialogHeader>
            <CompanionDialogTitle>Preview</CompanionDialogTitle>
            <CompanionDialogDescription>
              Live preview of your changes
            </CompanionDialogDescription>
          </CompanionDialogHeader>
          <div className="py-4 flex-1 flex items-center justify-center">
            <div 
              className="w-full p-6 rounded-lg border shadow-sm"
              style={{ borderColor: color }}
            >
              <div 
                className="w-8 h-8 rounded-full mb-3"
                style={{ backgroundColor: color }}
              />
              <h3 className="font-semibold text-lg">{name || "Untitled"}</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Your project description goes here.
              </p>
              <Button 
                size="sm" 
                className="mt-4"
                style={{ backgroundColor: color }}
              >
                Get Started
              </Button>
            </div>
          </div>
        </CompanionDialogCompanion>
      </CompanionDialog>
    )
  },
}

/**
 * Different widths for each dialog
 */
export const DifferentWidths: Story = {
  render: function DifferentWidthsDemo() {
    const [open, setOpen] = React.useState(false)
    return (
      <CompanionDialog open={open} onOpenChange={setOpen} position="right" gap={20}>
        <CompanionDialogTrigger asChild>
          <Button>Open (Different Widths)</Button>
        </CompanionDialogTrigger>
        
        <CompanionDialogContent width="w-[300px]">
          <CompanionDialogHeader>
            <CompanionDialogTitle>Narrow Primary</CompanionDialogTitle>
            <CompanionDialogDescription>
              300px wide
            </CompanionDialogDescription>
          </CompanionDialogHeader>
          <div className="py-4">
            <p className="text-sm text-muted-foreground">
              A narrow primary dialog works great for simple actions.
            </p>
          </div>
          <CompanionDialogFooter>
            <CompanionDialogTriggerCompanion asChild>
              <Button variant="outline" size="sm">← Details</Button>
            </CompanionDialogTriggerCompanion>
          </CompanionDialogFooter>
        </CompanionDialogContent>

        <CompanionDialogCompanion width="w-[500px]" animation="slide-right">
          <CompanionDialogHeader>
            <CompanionDialogTitle>Wide Companion</CompanionDialogTitle>
            <CompanionDialogDescription>
              500px wide - more room for content
            </CompanionDialogDescription>
          </CompanionDialogHeader>
          <div className="py-4 flex-1">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-muted">
                <h4 className="font-medium">Section A</h4>
                <p className="text-sm text-muted-foreground mt-1">Content here</p>
              </div>
              <div className="p-4 rounded-lg bg-muted">
                <h4 className="font-medium">Section B</h4>
                <p className="text-sm text-muted-foreground mt-1">Content here</p>
              </div>
            </div>
          </div>
        </CompanionDialogCompanion>
      </CompanionDialog>
    )
  },
}
