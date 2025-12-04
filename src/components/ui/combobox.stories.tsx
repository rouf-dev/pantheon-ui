import type { Meta, StoryObj } from "@storybook/react"
import * as React from "react"
import { Combobox, type ComboboxOption } from "./combobox"
import { Building2, Tag } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./card"

const meta: Meta<typeof Combobox> = {
  title: "UI/Combobox",
  component: Combobox,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    placeholder: { control: "text" },
    searchPlaceholder: { control: "text" },
    disabled: { control: "boolean" },
    allowDeselect: { control: "boolean" },
    richDisplay: { control: "boolean" },
    grouped: { control: "boolean" },
    allowCreate: { control: "boolean" },
    debounceMs: { control: "number" },
    minSearchLength: { control: "number" },
  },
}

export default meta
type Story = StoryObj<typeof Combobox>

// Mock data
const frameworks: ComboboxOption[] = [
  { value: "next", label: "Next.js" },
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "svelte", label: "Svelte" },
  { value: "angular", label: "Angular" },
  { value: "ember", label: "Ember" },
]

const users: ComboboxOption[] = [
  {
    value: "1",
    label: "John Doe",
    description: "john@example.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
  },
  {
    value: "2",
    label: "Jane Smith",
    description: "jane@example.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane",
  },
  {
    value: "3",
    label: "Bob Johnson",
    description: "bob@example.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Bob",
  },
  {
    value: "4",
    label: "Alice Williams",
    description: "alice@example.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alice",
  },
]

const groupedItems: ComboboxOption[] = [
  { value: "apple", label: "Apple", group: "Fruits" },
  { value: "banana", label: "Banana", group: "Fruits" },
  { value: "orange", label: "Orange", group: "Fruits" },
  { value: "carrot", label: "Carrot", group: "Vegetables" },
  { value: "broccoli", label: "Broccoli", group: "Vegetables" },
  { value: "spinach", label: "Spinach", group: "Vegetables" },
  { value: "chicken", label: "Chicken", group: "Proteins" },
  { value: "beef", label: "Beef", group: "Proteins" },
  { value: "tofu", label: "Tofu", group: "Proteins" },
]

const companies: ComboboxOption[] = [
  {
    value: "vercel",
    label: "Vercel",
    description: "The platform for frontend developers",
    icon: <Building2 className="h-4 w-4" />,
  },
  {
    value: "google",
    label: "Google",
    description: "Search and advertising giant",
    icon: <Building2 className="h-4 w-4" />,
  },
  {
    value: "microsoft",
    label: "Microsoft",
    description: "Technology and software company",
    icon: <Building2 className="h-4 w-4" />,
  },
]

/**
 * Basic static combobox with simple options.
 * Backward compatible with original implementation.
 */
export const Default: Story = {
  render: function DefaultCombobox() {
    const [value, setValue] = React.useState("")
    return (
      <div className="w-[300px]">
        <Combobox
          options={frameworks}
          value={value}
          onValueChange={setValue}
          placeholder="Select framework..."
          searchPlaceholder="Search frameworks..."
        />
        {value && (
          <p className="mt-2 text-sm text-muted-foreground">
            Selected: {frameworks.find((f) => f.value === value)?.label}
          </p>
        )}
      </div>
    )
  },
}

/**
 * Allow deselecting the current selection by clicking it again.
 */
export const WithDeselect: Story = {
  render: function DeselectCombobox() {
    const [value, setValue] = React.useState("react")
    return (
      <div className="w-[300px]">
        <Combobox
          options={frameworks}
          value={value}
          onValueChange={setValue}
          allowDeselect
          placeholder="Select framework..."
        />
        <p className="mt-2 text-sm text-muted-foreground">
          Selected: {value || "None"}
        </p>
      </div>
    )
  },
}

/**
 * Rich display mode with avatars and descriptions.
 * Perfect for user selection, contact lists, etc.
 */
export const RichDisplay: Story = {
  render: function RichDisplayCombobox() {
    const [value, setValue] = React.useState("")
    return (
      <div className="w-[350px]">
        <Combobox
          options={users}
          value={value}
          onValueChange={setValue}
          richDisplay
          placeholder="Select user..."
          searchPlaceholder="Search users..."
        />
        {value && (
          <Card className="mt-4">
            <CardHeader>
              <CardTitle className="text-sm">Selected User</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                <img
                  src={users.find((u) => u.value === value)?.avatar}
                  alt="Avatar"
                  className="h-10 w-10 rounded-full"
                />
                <div>
                  <p className="font-medium">
                    {users.find((u) => u.value === value)?.label}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {users.find((u) => u.value === value)?.description}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    )
  },
}

/**
 * Grouped options by category with visual separators.
 */
export const GroupedOptions: Story = {
  render: function GroupedCombobox() {
    const [value, setValue] = React.useState("")
    return (
      <div className="w-[300px]">
        <Combobox
          options={groupedItems}
          value={value}
          onValueChange={setValue}
          grouped
          placeholder="Select food..."
          searchPlaceholder="Search food items..."
        />
        {value && (
          <p className="mt-2 text-sm text-muted-foreground">
            Selected: {groupedItems.find((i) => i.value === value)?.label} (
            {groupedItems.find((i) => i.value === value)?.group})
          </p>
        )}
      </div>
    )
  },
}

/**
 * Rich display with custom icons instead of avatars.
 */
export const WithIcons: Story = {
  render: function IconCombobox() {
    const [value, setValue] = React.useState("")
    return (
      <div className="w-[350px]">
        <Combobox
          options={companies}
          value={value}
          onValueChange={setValue}
          richDisplay
          placeholder="Select company..."
          searchPlaceholder="Search companies..."
        />
      </div>
    )
  },
}

/**
 * Create new option functionality for tags, categories, etc.
 */
export const CreateNew: Story = {
  render: function CreateNewCombobox() {
    const [tags, setTags] = React.useState<ComboboxOption[]>([
      { value: "bug", label: "Bug", icon: <Tag className="h-3 w-3" /> },
      { value: "feature", label: "Feature", icon: <Tag className="h-3 w-3" /> },
      { value: "docs", label: "Documentation", icon: <Tag className="h-3 w-3" /> },
    ])
    const [value, setValue] = React.useState("")

    const handleCreate = (label: string) => {
      const newTag = {
        value: label.toLowerCase().replace(/\s+/g, "-"),
        label,
        icon: <Tag className="h-3 w-3" />,
      }
      setTags([...tags, newTag])
      setValue(newTag.value)
    }

    return (
      <div className="w-[300px]">
        <Combobox
          options={tags}
          value={value}
          onValueChange={setValue}
          allowCreate
          createText="Create tag"
          onCreate={handleCreate}
          placeholder="Select or create tag..."
          searchPlaceholder="Search tags..."
        />
        <div className="mt-4 space-y-2">
          <p className="text-sm font-medium">Available Tags:</p>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag.value}
                className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-1 text-xs"
              >
                {tag.icon}
                {tag.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    )
  },
}

/**
 * Async API search with debounce and loading states.
 * Simulates API calls with artificial delay.
 */
export const AsyncSearch: Story = {
  render: function AsyncCombobox() {
    const [value, setValue] = React.useState("")

    // Mock API call
    const searchUsers = async (query: string): Promise<ComboboxOption[]> => {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Filter mock data
      const results = users.filter((user) =>
        user.label.toLowerCase().includes(query.toLowerCase())
      )

      // Simulate empty results sometimes
      if (query.toLowerCase() === "error") {
        throw new Error("Failed to fetch users")
      }

      return results
    }

    return (
      <div className="w-[350px]">
        <Card>
          <CardHeader>
            <CardTitle>Async User Search</CardTitle>
            <CardDescription>
              Type to search users. Try "error" to see error state.
              Searches after typing 2+ characters with 500ms debounce.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Combobox
              onSearch={searchUsers}
              value={value}
              onValueChange={setValue}
              richDisplay
              debounceMs={500}
              minSearchLength={2}
              placeholder="Search users..."
              searchPlaceholder="Type to search..."
              loadingText="Searching users..."
              errorText="Failed to load users. Try again."
            />
            {value && (
              <p className="mt-2 text-sm text-muted-foreground">
                Selected: {value}
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    )
  },
}

/**
 * Infinite scroll for large datasets.
 * Loads more options as you scroll.
 */
export const InfiniteScroll: Story = {
  render: function InfiniteScrollCombobox() {
    const [value, setValue] = React.useState("")
    const [items, setItems] = React.useState<ComboboxOption[]>(
      Array.from({ length: 20 }, (_, i) => ({
        value: `item-${i}`,
        label: `Item ${i + 1}`,
        description: `Description for item ${i + 1}`,
      }))
    )
    const [hasMore, setHasMore] = React.useState(true)
    const [loadingMore, setLoadingMore] = React.useState(false)

    const loadMore = async () => {
      setLoadingMore(true)
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const currentLength = items.length
      const newItems = Array.from({ length: 20 }, (_, i) => ({
        value: `item-${currentLength + i}`,
        label: `Item ${currentLength + i + 1}`,
        description: `Description for item ${currentLength + i + 1}`,
      }))

      setItems([...items, ...newItems])
      setLoadingMore(false)

      // Stop loading after 100 items
      if (items.length + 20 >= 100) {
        setHasMore(false)
      }
    }

    return (
      <div className="w-[350px]">
        <Card>
          <CardHeader>
            <CardTitle>Infinite Scroll</CardTitle>
            <CardDescription>
              Scroll to bottom to load more items. Currently showing {items.length} items.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Combobox
              options={items}
              value={value}
              onValueChange={setValue}
              infiniteScroll
              onLoadMore={loadMore}
              hasMore={hasMore}
              loadingMore={loadingMore}
              richDisplay
              placeholder="Select item..."
              searchPlaceholder="Search items..."
            />
          </CardContent>
        </Card>
      </div>
    )
  },
}

/**
 * Combined features: async search + grouped + rich display.
 * Real-world example showing multiple features together.
 */
export const AdvancedCombined: Story = {
  render: function AdvancedCombobox() {
    const [value, setValue] = React.useState("")

    const mockData: ComboboxOption[] = [
      {
        value: "john",
        label: "John Doe",
        description: "john@company.com · Engineering",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
        group: "Engineering",
      },
      {
        value: "jane",
        label: "Jane Smith",
        description: "jane@company.com · Engineering",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane",
        group: "Engineering",
      },
      {
        value: "bob",
        label: "Bob Johnson",
        description: "bob@company.com · Design",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Bob",
        group: "Design",
      },
      {
        value: "alice",
        label: "Alice Williams",
        description: "alice@company.com · Product",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alice",
        group: "Product",
      },
      {
        value: "charlie",
        label: "Charlie Brown",
        description: "charlie@company.com · Marketing",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Charlie",
        group: "Marketing",
      },
    ]

    const searchEmployees = async (query: string): Promise<ComboboxOption[]> => {
      await new Promise((resolve) => setTimeout(resolve, 800))
      return mockData.filter(
        (emp) =>
          emp.label.toLowerCase().includes(query.toLowerCase()) ||
          emp.description?.toLowerCase().includes(query.toLowerCase())
      )
    }

    return (
      <div className="w-[400px]">
        <Card>
          <CardHeader>
            <CardTitle>Employee Directory</CardTitle>
            <CardDescription>
              Search employees with async API, grouped by department, rich display with avatars
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Combobox
              onSearch={searchEmployees}
              value={value}
              onValueChange={setValue}
              richDisplay
              grouped
              debounceMs={300}
              minSearchLength={1}
              placeholder="Search employees..."
              searchPlaceholder="Type name or email..."
              loadingText="Searching directory..."
            />
          </CardContent>
        </Card>
      </div>
    )
  },
}

/**
 * Disabled state
 */
export const Disabled: Story = {
  render: function DisabledCombobox() {
    return (
      <div className="w-[300px]">
        <Combobox
          options={frameworks}
          disabled
          placeholder="Cannot select..."
        />
      </div>
    )
  },
}

/**
 * Text highlighting in search results.
 * Shows how matched text is highlighted.
 */
export const TextHighlighting: Story = {
  render: function HighlightCombobox() {
    const [value, setValue] = React.useState("")
    return (
      <div className="w-[350px]">
        <Card>
          <CardHeader>
            <CardTitle>Text Highlighting</CardTitle>
            <CardDescription>
              Type "Doe" or "John" to see matched text highlighted in results
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Combobox
              options={users}
              value={value}
              onValueChange={setValue}
              richDisplay
              placeholder="Search users..."
              searchPlaceholder="Type to see highlighting..."
            />
          </CardContent>
        </Card>
      </div>
    )
  },
}
