import type { Meta, StoryObj } from "@storybook/react"
import { Chip, XChip } from "../components/chip"

// More on how to set up stories at: https://storybook.js.org/docs/7.0/react/writing-stories/introduction
const meta = {
  title: "Tawasukha UI/Chip",
  component: Chip,
  tags: ["docsPage"],
  argTypes: {},
} satisfies Meta<typeof Chip>

export default meta

export const Basic: StoryObj<typeof Chip> = {
  args: {
    mode: "success",
    children: "Chip",
    className: "hover:shadow-none p-10",
  },
  render(args) {
    return <Chip {...args} />
  },
}

export const Closeable: StoryObj<typeof XChip> = {
  args: {
    mode: "success",
    children: "Chip",
  },
  render(args) {
    return <XChip {...args} />
  },
}
