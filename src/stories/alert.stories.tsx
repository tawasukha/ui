import type { Meta, StoryObj } from "@storybook/react";
import { Alert } from "../components/alert";

// More on how to set up stories at: https://storybook.js.org/docs/7.0/react/writing-stories/introduction
const meta = {
  title: "Tawasukha UI/Alert",
  component: Alert,
  tags: ["docsPage"],
  argTypes: {
    title: {
      control: { type: "text" },
    },
    children: {
      control: { type: "text" },
    },
  },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    mode: "error",
    title: "Error",
    children: "An error occured",
    onDismiss: undefined,
  },
};
