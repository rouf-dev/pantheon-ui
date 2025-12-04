import type { Meta, StoryObj } from "@storybook/react"
import * as React from "react"
import { motion } from "motion/react"
import {
  // Core transitions
  springs,
  tweens,
  // Base variants
  fade,
  scale,
  rise,
  drop,
  slideRight,
  slideLeft,
  slideUp,
  slideDown,
  pop,
  // Effects
  shake,
  wiggle,
  pulse,
  bounce,
  flip,
  flipVertical,
  flashAttention,
  hoverLift,
  tapPress,
  hoverGlow,
  // Component adapters
  getButtonMotionProps,
  getCardMotionProps,
  getFormErrorMotionProps,
} from "@/lib/motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const meta: Meta = {
  title: "Motion/Animations",
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj

/**
 * Core transitions overview.
 * Shows different spring physics configurations.
 */
export const Transitions: Story = {
  render: function TransitionsDemo() {
    const [key, setKey] = React.useState(0)

    const springExamples = [
      { name: "snappy", config: springs.snappy },
      { name: "smooth", config: springs.smooth },
      { name: "gentle", config: springs.gentle },
      { name: "bouncy", config: springs.bouncy },
      { name: "soft", config: springs.soft },
    ]

    const tweenExamples = [
      { name: "fast", config: tweens.fast },
      { name: "normal", config: tweens.normal },
      { name: "slow", config: tweens.slow },
      { name: "pantheon", config: tweens.pantheon },
    ]

    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Spring Transitions</CardTitle>
            <CardDescription>
              Physics-based spring configurations for natural animations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => setKey((k) => k + 1)} className="mb-6">
              Replay All Animations
            </Button>
            <div className="grid grid-cols-3 gap-4">
              {springExamples.map(({ name, config }) => (
                <motion.div
                  key={`spring-${name}-${key}`}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={config}
                  className="rounded-lg border bg-card p-4 text-center"
                >
                  <p className="font-semibold">{name}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {JSON.stringify(config).slice(0, 50)}...
                  </p>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tween Transitions</CardTitle>
            <CardDescription>
              Duration-based easing configurations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              {tweenExamples.map(({ name, config }) => (
                <motion.div
                  key={`tween-${name}-${key}`}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={config}
                  className="rounded-lg border bg-card p-4 text-center"
                >
                  <p className="font-semibold">{name}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {JSON.stringify(config).slice(0, 50)}...
                  </p>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  },
}

/**
 * Base animation variants (fade, slide, scale).
 */
export const BaseVariants: Story = {
  render: function BaseVariantsDemo() {
    const [show, setShow] = React.useState(true)

    const variants = [
      { name: "Fade", variant: fade },
      { name: "Scale", variant: scale },
      { name: "Rise", variant: rise },
      { name: "Drop", variant: drop },
      { name: "Slide Right", variant: slideRight },
      { name: "Slide Left", variant: slideLeft },
      { name: "Slide Up", variant: slideUp },
      { name: "Slide Down", variant: slideDown },
      { name: "Pop", variant: pop },
    ]

    return (
      <Card>
        <CardHeader>
          <CardTitle>Base Variants</CardTitle>
          <CardDescription>
            Fundamental animation patterns: fade, slide, scale, rise, drop
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={() => setShow(!show)} className="mb-6">
            Toggle ({show ? "Hide" : "Show"})
          </Button>
          <div className="grid grid-cols-3 gap-4">
            {variants.map(({ name, variant }) => (
              <div key={name} className="h-32 flex items-center justify-center border rounded-lg">
                {show && (
                  <motion.div
                    key={name}
                    {...variant}
                    transition={springs.smooth}
                    className="rounded bg-primary px-4 py-2 text-primary-foreground text-sm font-medium"
                  >
                    {name}
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  },
}

/**
 * Attention-grabbing effects (bounce, flip, flash).
 */
export const AttentionEffects: Story = {
  render: function AttentionEffectsDemo() {
    const [trigger, setTrigger] = React.useState(0)

    const effects = [
      { name: "Bounce", variant: bounce },
      { name: "Flip", variant: flip },
      { name: "Flip Vertical", variant: flipVertical },
      { name: "Flash Attention", variant: flashAttention },
    ]

    return (
      <Card>
        <CardHeader>
          <CardTitle>Attention Effects</CardTitle>
          <CardDescription>
            Eye-catching feedback animations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={() => setTrigger((t) => t + 1)} className="mb-6">
            Replay Animations
          </Button>
          <div className="grid grid-cols-2 gap-6">
            {effects.map(({ name, variant }) => (
              <motion.div
                key={`${name}-${trigger}`}
                {...variant}
                transition={springs.bouncy}
                className="flex h-32 items-center justify-center rounded-lg border bg-gradient-to-br from-primary/20 to-primary/5"
              >
                <p className="text-lg font-semibold">{name}</p>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  },
}

/**
 * Interactive effects (shake, wiggle, pulse, etc.).
 */
export const InteractiveEffects: Story = {
  render: function InteractiveEffectsDemo() {
    const [activeEffect, setActiveEffect] = React.useState<string | null>(null)

    const effects = [
      { name: "Shake", variant: shake },
      { name: "Wiggle", variant: wiggle },
      { name: "Pulse", variant: pulse },
      { name: "Bounce", variant: bounce },
      { name: "Flash Attention", variant: flashAttention },
    ]

    return (
      <Card>
        <CardHeader>
          <CardTitle>Feedback Effects</CardTitle>
          <CardDescription>
            Click buttons to trigger feedback animations (shake, wiggle, pulse)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 mb-6">
            {effects.map(({ name }) => (
              <Button
                key={name}
                variant="outline"
                onClick={() => {
                  setActiveEffect(name)
                  setTimeout(() => setActiveEffect(null), 1000)
                }}
              >
                {name}
              </Button>
            ))}
          </div>
          <div className="flex h-48 items-center justify-center rounded-lg border bg-muted/30">
            <motion.div
              key={activeEffect || "idle"}
              {...(activeEffect ? effects.find(e => e.name === activeEffect)?.variant : {})}
              className="rounded-lg bg-primary px-8 py-4 text-primary-foreground text-xl font-bold"
            >
              {activeEffect || "Click a button"}
            </motion.div>
          </div>
        </CardContent>
      </Card>
    )
  },
}

/**
 * Button animations from component adapters.
 */
export const ButtonAnimations: Story = {
  render: function ButtonAnimationsDemo() {
    const animations: Array<"press" | "bounce" | "squash"> = ["press", "bounce", "squash"]

    return (
      <Card>
        <CardHeader>
          <CardTitle>Button Animations</CardTitle>
          <CardDescription>
            Interactive button animations using getButtonMotionProps
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            {animations.map((animation) => (
              <motion.button
                key={animation}
                {...getButtonMotionProps(animation)}
                className="rounded-md bg-primary px-4 py-2 text-primary-foreground font-medium"
              >
                {animation.charAt(0).toUpperCase() + animation.slice(1)}
              </motion.button>
            ))}
            <motion.button
              {...hoverLift}
              {...tapPress}
              className="rounded-md bg-secondary px-4 py-2 text-secondary-foreground font-medium"
            >
              Hover Lift + Tap
            </motion.button>
            <motion.button
              {...hoverGlow}
              className="rounded-md bg-success px-4 py-2 text-success-foreground font-medium"
            >
              Hover Glow
            </motion.button>
          </div>
        </CardContent>
      </Card>
    )
  },
}

/**
 * Card animations from component adapters.
 */
export const CardAnimations: Story = {
  render: function CardAnimationsDemo() {
    const animations: Array<"lift" | "scale" | "glow"> = ["lift", "scale", "glow"]

    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Card Animations</CardTitle>
            <CardDescription>
              Hover over cards to see different animation styles
            </CardDescription>
          </CardHeader>
        </Card>
        <div className="grid grid-cols-3 gap-4">
          {animations.map((animation) => (
            <motion.div
              key={animation}
              {...getCardMotionProps(animation)}
              className="rounded-lg border bg-card p-6 cursor-pointer"
            >
              <h3 className="font-semibold mb-2">{animation.charAt(0).toUpperCase() + animation.slice(1)}</h3>
              <p className="text-sm text-muted-foreground">
                Hover to see the {animation} effect
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    )
  },
}

/**
 * Input error animations.
 */
export const InputAnimations: Story = {
  render: function InputAnimationsDemo() {
    const [error, setError] = React.useState(false)

    return (
      <Card>
        <CardHeader>
          <CardTitle>Input Error Animations</CardTitle>
          <CardDescription>
            Shake and flash effects for form validation feedback
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button onClick={() => setError(!error)}>
            Toggle Error State
          </Button>
          <div className="space-y-2">
            <label className="text-sm font-medium">Shake Animation</label>
            <motion.div
              key={error ? "error-shake" : "normal-shake"}
              {...getFormErrorMotionProps("shake", error)}
            >
              <Input
                placeholder="Input with shake animation"
                className={error ? "border-destructive" : ""}
              />
            </motion.div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Flash Animation</label>
            <motion.div
              key={error ? "error-flash" : "normal-flash"}
              {...getFormErrorMotionProps("flash", error)}
            >
              <Input
                placeholder="Input with flash animation"
                className={error ? "border-destructive" : ""}
              />
            </motion.div>
          </div>
          {error && (
            <p className="text-sm text-destructive">
              This field is required
            </p>
          )}
        </CardContent>
      </Card>
    )
  },
}

/**
 * Staggered children animations.
 */
export const StaggeredList: Story = {
  render: function StaggeredListDemo() {
    const [show, setShow] = React.useState(true)

    const items = [
      "First Item",
      "Second Item",
      "Third Item",
      "Fourth Item",
      "Fifth Item",
    ]

    const container = {
      hidden: { opacity: 0 },
      show: {
        opacity: 1,
        transition: {
          staggerChildren: 0.1,
        },
      },
    }

    const item = {
      hidden: { opacity: 0, x: -20 },
      show: { opacity: 1, x: 0 },
    }

    return (
      <Card>
        <CardHeader>
          <CardTitle>Staggered Animations</CardTitle>
          <CardDescription>
            List items animate in sequence with stagger delay
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={() => setShow(!show)} className="mb-6">
            Toggle List
          </Button>
          {show && (
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="space-y-3"
            >
              {items.map((text, index) => (
                <motion.div
                  key={index}
                  variants={item}
                  className="rounded-lg border bg-muted/50 p-4"
                >
                  {text}
                </motion.div>
              ))}
            </motion.div>
          )}
        </CardContent>
      </Card>
    )
  },
}

/**
 * Animated presence (enter/exit animations).
 */
export const AnimatedPresence: Story = {
  render: function AnimatedPresenceDemo() {
    const [items, setItems] = React.useState([1, 2, 3, 4, 5])

    const addItem = () => {
      setItems([...items, Math.max(...items) + 1])
    }

    const removeItem = (id: number) => {
      setItems(items.filter((item) => item !== id))
    }

    return (
      <Card>
        <CardHeader>
          <CardTitle>Animated Presence</CardTitle>
          <CardDescription>
            Items animate in when added and out when removed
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 mb-6">
            <Button onClick={addItem}>Add Item</Button>
            <Button variant="outline" onClick={() => setItems([1, 2, 3, 4, 5])}>
              Reset
            </Button>
          </div>
          <div className="grid grid-cols-5 gap-4">
            {items.map((item) => (
              <motion.div
                key={item}
                {...scale}
                transition={springs.bouncy}
                className="aspect-square flex flex-col items-center justify-center rounded-lg border bg-primary/10 cursor-pointer"
                onClick={() => removeItem(item)}
              >
                <span className="text-2xl font-bold">{item}</span>
                <span className="text-xs text-muted-foreground mt-1">Click to remove</span>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  },
}

/**
 * Combined effects showcase.
 */
export const CombinedShowcase: Story = {
  render: function CombinedShowcaseDemo() {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Combined Effects Showcase</CardTitle>
            <CardDescription>
              Multiple animations working together
            </CardDescription>
          </CardHeader>
        </Card>

        <motion.div
          className="grid grid-cols-3 gap-4"
          initial="hidden"
          animate="show"
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: { staggerChildren: 0.15 },
            },
          }}
        >
          {[
            { title: "Hover Lift", effect: hoverLift },
            { title: "Tap Press", effect: tapPress },
            { title: "Hover Glow", effect: hoverGlow },
          ].map((item, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0 },
              }}
              {...item.effect}
              className="cursor-pointer rounded-lg border bg-gradient-to-br from-primary/20 to-secondary/20 p-6 text-center"
            >
              <h3 className="font-semibold">{item.title}</h3>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          {...bounce}
          className="rounded-lg border-2 border-dashed border-primary/50 bg-primary/5 p-8 text-center"
        >
          <h2 className="text-2xl font-bold mb-2">91 Animation Exports</h2>
          <p className="text-muted-foreground">
            Complete animation system ready for production use
          </p>
        </motion.div>
      </div>
    )
  },
}
