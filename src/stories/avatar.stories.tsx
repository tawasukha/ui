import type { Meta, StoryObj } from "@storybook/react"
import { Avatar } from "../components/avatar"

// More on how to set up stories at: https://storybook.js.org/docs/7.0/react/writing-stories/introduction
const meta = {
  title: "Tawasukha UI/Avatar",
  component: Avatar,
  tags: ["docsPage"],
  argTypes: {
    title: {
      control: { type: "text" },
    },
    children: {
      control: { type: "text" },
    },
  },
} satisfies Meta<typeof Avatar>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  args: {
    mode: "error",
    size: "xl",
    children: "TS",
  },
}

export const Icon: Story = {
  args: {
    size: "xl",
    mode: "error",
    icon: "UsersIcon",
  },
}

export const Image: Story = {
  args: {
    size: "lg",
    mode: "error",
    image:
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&h=764&q=100",
  },
}
