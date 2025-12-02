import type { Meta, StoryObj } from '@storybook/react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from './tabs'

const meta: Meta<typeof Tabs> = {
  title: 'UI/Tabs',
  component: Tabs,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [(Story) => <div style={{ width: '400px' }}><Story /></div>],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="account">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <p className="text-sm text-muted-foreground">Make changes to your account here.</p>
      </TabsContent>
      <TabsContent value="password">
        <p className="text-sm text-muted-foreground">Change your password here.</p>
      </TabsContent>
      <TabsContent value="settings">
        <p className="text-sm text-muted-foreground">Manage your settings here.</p>
      </TabsContent>
    </Tabs>
  ),
}

export const Outline: Story = {
  render: () => (
    <Tabs defaultValue="tab1">
      <TabsList variant="outline">
        <TabsTrigger variant="outline" value="tab1">Tab 1</TabsTrigger>
        <TabsTrigger variant="outline" value="tab2">Tab 2</TabsTrigger>
        <TabsTrigger variant="outline" value="tab3">Tab 3</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1"><p className="text-sm">Content 1</p></TabsContent>
      <TabsContent value="tab2"><p className="text-sm">Content 2</p></TabsContent>
      <TabsContent value="tab3"><p className="text-sm">Content 3</p></TabsContent>
    </Tabs>
  ),
}

export const Pills: Story = {
  render: () => (
    <Tabs defaultValue="tab1">
      <TabsList variant="pills">
        <TabsTrigger variant="pills" value="tab1">Tab 1</TabsTrigger>
        <TabsTrigger variant="pills" value="tab2">Tab 2</TabsTrigger>
        <TabsTrigger variant="pills" value="tab3">Tab 3</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1"><p className="text-sm">Content 1</p></TabsContent>
      <TabsContent value="tab2"><p className="text-sm">Content 2</p></TabsContent>
      <TabsContent value="tab3"><p className="text-sm">Content 3</p></TabsContent>
    </Tabs>
  ),
}

export const Underline: Story = {
  render: () => (
    <Tabs defaultValue="tab1">
      <TabsList variant="underline">
        <TabsTrigger variant="underline" value="tab1">Overview</TabsTrigger>
        <TabsTrigger variant="underline" value="tab2">Analytics</TabsTrigger>
        <TabsTrigger variant="underline" value="tab3">Reports</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1"><p className="text-sm">Overview content</p></TabsContent>
      <TabsContent value="tab2"><p className="text-sm">Analytics content</p></TabsContent>
      <TabsContent value="tab3"><p className="text-sm">Reports content</p></TabsContent>
    </Tabs>
  ),
}

export const Disabled: Story = {
  render: () => (
    <Tabs defaultValue="tab1">
      <TabsList>
        <TabsTrigger value="tab1">Active</TabsTrigger>
        <TabsTrigger value="tab2" disabled>Disabled</TabsTrigger>
        <TabsTrigger value="tab3">Another</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1"><p className="text-sm">Content 1</p></TabsContent>
      <TabsContent value="tab3"><p className="text-sm">Content 3</p></TabsContent>
    </Tabs>
  ),
}

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <p className="text-sm font-medium mb-2">Default</p>
        <Tabs defaultValue="t1">
          <TabsList variant="default">
            <TabsTrigger variant="default" value="t1">Tab 1</TabsTrigger>
            <TabsTrigger variant="default" value="t2">Tab 2</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <div>
        <p className="text-sm font-medium mb-2">Outline</p>
        <Tabs defaultValue="t1">
          <TabsList variant="outline">
            <TabsTrigger variant="outline" value="t1">Tab 1</TabsTrigger>
            <TabsTrigger variant="outline" value="t2">Tab 2</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <div>
        <p className="text-sm font-medium mb-2">Pills</p>
        <Tabs defaultValue="t1">
          <TabsList variant="pills">
            <TabsTrigger variant="pills" value="t1">Tab 1</TabsTrigger>
            <TabsTrigger variant="pills" value="t2">Tab 2</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <div>
        <p className="text-sm font-medium mb-2">Underline</p>
        <Tabs defaultValue="t1">
          <TabsList variant="underline">
            <TabsTrigger variant="underline" value="t1">Tab 1</TabsTrigger>
            <TabsTrigger variant="underline" value="t2">Tab 2</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  ),
}
