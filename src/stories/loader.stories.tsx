import type { Meta, StoryObj } from "@storybook/react";
import { Loader } from "../components/loader";

// More on how to set up stories at: https://storybook.js.org/docs/7.0/react/writing-stories/introduction
const meta = {
  title: "Tawasukha UI/Loader",
  component: Loader,
  tags: ["docsPage"],
  argTypes: {
    title: {
      control: { type: "text" },
    },
    children: {
      control: { type: "text" },
    },
  },
} satisfies Meta<typeof Loader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
  },
};