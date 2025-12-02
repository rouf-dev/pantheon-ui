import type { Meta, StoryObj } from '@storybook/react'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from './accordion'

const meta: Meta = {
  title: 'UI/Accordion',
  component: Accordion,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [(Story) => <div style={{ width: '400px' }}><Story /></div>],
}

export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Is it styled?</AccordionTrigger>
        <AccordionContent>Yes. It comes with default styles that match your design system.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Is it animated?</AccordionTrigger>
        <AccordionContent>Yes. It's animated by default with smooth transitions.</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
}

export const Bordered: Story = {
  render: () => (
    <Accordion type="single" collapsible variant="bordered">
      <AccordionItem value="item-1" variant="bordered">
        <AccordionTrigger>First Section</AccordionTrigger>
        <AccordionContent>Content for the first section.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2" variant="bordered">
        <AccordionTrigger>Second Section</AccordionTrigger>
        <AccordionContent>Content for the second section.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3" variant="bordered">
        <AccordionTrigger>Third Section</AccordionTrigger>
        <AccordionContent>Content for the third section.</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
}

export const Separated: Story = {
  render: () => (
    <Accordion type="single" collapsible variant="separated">
      <AccordionItem value="item-1" variant="separated">
        <AccordionTrigger>First Card</AccordionTrigger>
        <AccordionContent>Each item is its own card.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2" variant="separated">
        <AccordionTrigger>Second Card</AccordionTrigger>
        <AccordionContent>With spacing between them.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3" variant="separated">
        <AccordionTrigger>Third Card</AccordionTrigger>
        <AccordionContent>Great for FAQ sections.</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
}

export const Multiple: Story = {
  render: () => (
    <Accordion type="multiple" defaultValue={["item-1"]}>
      <AccordionItem value="item-1">
        <AccordionTrigger>Multiple items can be open</AccordionTrigger>
        <AccordionContent>This accordion allows multiple items open at once.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Click to open another</AccordionTrigger>
        <AccordionContent>Without closing the first one.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>All three can be open</AccordionTrigger>
        <AccordionContent>At the same time!</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
}

export const FAQ: Story = {
  render: () => (
    <div>
      <h3 className="text-lg font-semibold mb-4">Frequently Asked Questions</h3>
      <Accordion type="single" collapsible variant="separated">
        <AccordionItem value="q1" variant="separated">
          <AccordionTrigger>What is your refund policy?</AccordionTrigger>
          <AccordionContent>
            We offer a 30-day money-back guarantee. If you're not satisfied with our product, 
            contact our support team for a full refund.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="q2" variant="separated">
          <AccordionTrigger>How do I contact support?</AccordionTrigger>
          <AccordionContent>
            You can reach our support team via email at support@example.com or through 
            the live chat on our website. We respond within 24 hours.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="q3" variant="separated">
          <AccordionTrigger>Do you offer team plans?</AccordionTrigger>
          <AccordionContent>
            Yes! We offer team plans starting at 5 users. Contact our sales team for 
            custom pricing and enterprise features.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  ),
}
