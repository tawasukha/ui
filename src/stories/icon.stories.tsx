import type { Meta, StoryObj } from "@storybook/react";
import { StyledIcon, Icon } from "../components/icon";

// More on how to set up stories at: https://storybook.js.org/docs/7.0/react/writing-stories/introduction
const meta = {
  title: "Tawasukha UI/Icon",
  component: Icon,
  tags: ["docsPage"],
  argTypes: {
    name: {
      control: { type: "text" },
    },
    outline: {
      control: { type: "boolean" }
    }
  },
} satisfies Meta<typeof Icon>;

export default meta;

type Story = StoryObj<typeof Icon>;
type StyledStory = StoryObj<typeof StyledIcon>

// More on writing stories with args:https://storybook.js.org/docs/7.0/react/writing-stories/args
export const Raw: Story = {
  args: {
    outline: true,
    name: "AcademicCapIcon",
    className: "h-6 w-6"
  },
};

export const Basic: StyledStory = {
  args: {
    mode: "error",
    outline: true,
    name: "XCircleIcon",
    className: "h-6 w-6"
  },
  render: ({ mode, outline, name, className }) => <StyledIcon {...{ mode, outline, name, className }} />,
};
