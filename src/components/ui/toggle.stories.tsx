import type { Meta, StoryObj } from "@storybook/react"
import { Toggle } from "./toggle"
import { Bold, Italic, Underline } from "lucide-react"

const meta: Meta<typeof Toggle> = {
  title: "UI/Toggle",
  component: Toggle,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "outline"],
    },
    size: {
      control: "select",
      options: ["sm", "default", "lg"],
    },
  },
}

export default meta
type Story = StoryObj<typeof Toggle>

export const Default: Story = {
  args: {
    children: <Bold className="h-4 w-4" />,
  },
}

export const Outline: Story = {
  args: {
    variant: "outline",
    children: <Italic className="h-4 w-4" />,
  },
}

export const WithText: Story = {
  args: {
    children: (
      <>
        <Bold className="h-4 w-4" />
        Bold
      </>
    ),
  },
}

export const Small: Story = {
  args: {
    size: "sm",
    children: <Bold className="h-4 w-4" />,
  },
}

export const Large: Story = {
  args: {
    size: "lg",
    children: <Bold className="h-4 w-4" />,
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    children: <Bold className="h-4 w-4" />,
  },
}

export const Pressed: Story = {
  args: {
    defaultPressed: true,
    children: <Bold className="h-4 w-4" />,
  },
}

export const TextFormattingExample: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Toggle aria-label="Toggle bold">
        <Bold className="h-4 w-4" />
      </Toggle>
      <Toggle aria-label="Toggle italic">
        <Italic className="h-4 w-4" />
      </Toggle>
      <Toggle aria-label="Toggle underline">
        <Underline className="h-4 w-4" />
      </Toggle>
    </div>
  ),
}
