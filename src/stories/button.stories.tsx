import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../components/button";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";

const meta = {
  title: "Tawasukha UI/Button",
  component: Button,
  tags: ["docsPage"],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    mode: "base",
    icon: PaperAirplaneIcon,
    iconClassName: "-mt-1.5 -rotate-45",
    size: "md",
    children: "Submit"
  },
};
